require('dotenv').config();

// Everything about the pitch lives here. To resell this to a new business,
// deploy a new copy of this app and change only these environment variables
// (plus the Twilio number and OpenAI key).
const config = {
  port: process.env.PORT || 3000,
  publicHostname: process.env.PUBLIC_HOSTNAME || '', // e.g. my-agent.onrender.com (no protocol)

  openaiApiKey: process.env.OPENAI_API_KEY,
  realtimeModel: process.env.OPENAI_REALTIME_MODEL || 'gpt-realtime',
  voice: process.env.AGENT_VOICE || 'alloy',

  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_FROM_NUMBER,
  },

  business: {
    name: process.env.BUSINESS_NAME || 'Acme Co',
    agentName: process.env.AGENT_NAME || 'Alex',
    productPitch:
      process.env.PRODUCT_PITCH ||
      'a service that helps small businesses save time and win more customers',
    pricing: process.env.PRICING || 'starting at $99/month, no long-term contract',
    targetCustomer: process.env.TARGET_CUSTOMER || 'small business owners',
    objectionNotes:
      process.env.OBJECTION_NOTES ||
      'If they say it is too expensive, mention the free trial. If they say they need to think about it, offer to send info by text and schedule a follow-up.',
    calendarLink: process.env.CALENDAR_LINK || '',
    ownerPhone: process.env.OWNER_PHONE || '', // gets a text summary after each call
  },

  leadsWebhookUrl: process.env.LEADS_WEBHOOK_URL || '',
};

function buildSystemPrompt() {
  const b = config.business;
  return `You are ${b.agentName}, a friendly, upbeat sales representative calling on behalf of ${b.name}.

GOAL: In a natural phone conversation, pitch ${b.productPitch} to ${b.targetCustomer}, answer their questions, handle objections, and try to get either (a) a booked meeting/demo, or (b) clear permission to follow up, or (c) a polite "not interested" so you can end the call quickly.

PRICING: ${b.pricing}

OBJECTION HANDLING: ${b.objectionNotes}

STYLE:
- Sound like a real person on the phone: short sentences, casual, warm, no corporate jargon.
- Never speak for more than a few sentences before pausing to let them respond.
- Ask one question at a time.
- If they're not interested, don't push — thank them and wrap up politely.
- If they want to book a meeting, tell them you'll text them a link to pick a time.
${b.calendarLink ? `- Booking link to send by text: ${b.calendarLink}` : ''}

Always call the capture_lead function once, near the end of the call, to record the outcome — do this even if they said no.`;
}

module.exports = { config, buildSystemPrompt };
