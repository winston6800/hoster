const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const twilio = require('twilio');
const { config } = require('./config');
const { attachRealtimeBridge } = require('./lib/realtimeBridge');
const { readLeads } = require('./lib/leads');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true, business: config.business.name }));

app.get('/leads', (req, res) => res.json(readLeads()));

// Twilio hits this when a call comes in, or when an outbound call we placed
// is answered. It just tells Twilio to open a media stream back to us.
app.post('/voice', (req, res) => {
  const host = config.publicHostname || req.headers.host;
  const twiml = new twilio.twiml.VoiceResponse();
  const connect = twiml.connect();
  const stream = connect.stream({ url: `wss://${host}/media-stream` });
  stream.parameter({ name: 'callerNumber', value: req.body.From || '' });
  res.type('text/xml').send(twiml.toString());
});

// Trigger an outbound sales call: POST /call { "to": "+15551234567" }
app.post('/call', async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(400).json({ error: 'Missing "to" phone number' });

  const { accountSid, authToken, fromNumber } = config.twilio;
  if (!accountSid || !authToken || !fromNumber) {
    return res.status(500).json({ error: 'Twilio credentials are not configured' });
  }

  const host = config.publicHostname || req.headers.host;
  const client = twilio(accountSid, authToken);

  try {
    const call = await client.calls.create({
      to,
      from: fromNumber,
      url: `https://${host}/voice`,
    });
    res.json({ status: 'calling', sid: call.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/media-stream' });

wss.on('connection', (ws, req) => {
  console.log('[media-stream] Twilio connected');
  attachRealtimeBridge(ws);
});

server.listen(config.port, () => {
  console.log(`AI sales agent for "${config.business.name}" listening on port ${config.port}`);
});
