const WebSocket = require('ws');
const { config, buildSystemPrompt } = require('../config');
const { saveLead } = require('./leads');

const CAPTURE_LEAD_TOOL = {
  type: 'function',
  name: 'capture_lead',
  description: 'Record the outcome of this sales call. Call this once near the end of every call.',
  parameters: {
    type: 'object',
    properties: {
      name: { type: 'string', description: "Caller's name, if given" },
      contact: { type: 'string', description: 'Best phone number or email to reach them' },
      interestLevel: {
        type: 'string',
        enum: ['hot', 'warm', 'not_interested'],
        description: 'How interested the caller seemed',
      },
      nextStep: {
        type: 'string',
        description: 'What happens next, e.g. "booked demo for Thursday 2pm" or "call back next week"',
      },
      notes: { type: 'string', description: 'Anything else useful for a human to follow up' },
    },
    required: ['interestLevel'],
  },
};

// Bridges a Twilio Media Stream WebSocket to the OpenAI Realtime API so the
// model can hear and speak over the phone call in real time.
function attachRealtimeBridge(twilioWs) {
  let streamSid = null;
  let callerNumber = null;
  let openaiWs = null;
  let openaiReady = false;
  const pendingAudio = [];

  function connectToOpenAI() {
    openaiWs = new WebSocket(
      `wss://api.openai.com/v1/realtime?model=${encodeURIComponent(config.realtimeModel)}`,
      {
        headers: {
          Authorization: `Bearer ${config.openaiApiKey}`,
          'OpenAI-Beta': 'realtime=v1',
        },
      }
    );

    openaiWs.on('open', () => {
      openaiWs.send(
        JSON.stringify({
          type: 'session.update',
          session: {
            modalities: ['audio', 'text'],
            instructions: buildSystemPrompt(),
            voice: config.voice,
            input_audio_format: 'g711_ulaw',
            output_audio_format: 'g711_ulaw',
            turn_detection: { type: 'server_vad' },
            tools: [CAPTURE_LEAD_TOOL],
            tool_choice: 'auto',
          },
        })
      );

      // The agent placed/answered the call, so it should speak first.
      openaiWs.send(
        JSON.stringify({
          type: 'response.create',
          response: {
            instructions: `Greet the caller warmly as ${config.business.agentName} from ${config.business.name} and open the conversation.`,
          },
        })
      );

      openaiReady = true;
      while (pendingAudio.length) {
        openaiWs.send(pendingAudio.shift());
      }
    });

    openaiWs.on('message', (raw) => {
      const event = JSON.parse(raw.toString());

      if (event.type === 'response.audio.delta' && streamSid) {
        twilioWs.send(
          JSON.stringify({
            event: 'media',
            streamSid,
            media: { payload: event.delta },
          })
        );
      }

      if (event.type === 'response.function_call_arguments.done') {
        handleFunctionCall(event);
      }

      if (event.type === 'error') {
        console.error('[openai realtime error]', JSON.stringify(event));
      }
    });

    openaiWs.on('close', () => {
      openaiReady = false;
    });

    openaiWs.on('error', (err) => {
      console.error('[openai realtime ws error]', err.message);
    });
  }

  function handleFunctionCall(event) {
    if (event.name !== 'capture_lead') return;

    let args = {};
    try {
      args = JSON.parse(event.arguments);
    } catch {
      // ignore malformed args
    }
    saveLead({ ...args, callerNumber });

    openaiWs.send(
      JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: event.call_id,
          output: JSON.stringify({ status: 'recorded' }),
        },
      })
    );
    openaiWs.send(JSON.stringify({ type: 'response.create' }));
  }

  connectToOpenAI();

  twilioWs.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());

    switch (msg.event) {
      case 'start':
        streamSid = msg.start.streamSid;
        callerNumber = msg.start.customParameters?.callerNumber || null;
        break;
      case 'media': {
        const appendEvent = JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: msg.media.payload,
        });
        if (openaiReady) {
          openaiWs.send(appendEvent);
        } else {
          pendingAudio.push(appendEvent);
        }
        break;
      }
      case 'stop':
        if (openaiWs && openaiWs.readyState === WebSocket.OPEN) openaiWs.close();
        break;
      default:
        break;
    }
  });

  twilioWs.on('close', () => {
    if (openaiWs && openaiWs.readyState === WebSocket.OPEN) openaiWs.close();
  });
}

module.exports = { attachRealtimeBridge };
