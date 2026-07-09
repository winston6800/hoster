const fs = require('fs');
const path = require('path');
const twilio = require('twilio');
const { config } = require('../config');

const LEADS_FILE = path.join(__dirname, '..', 'leads.json');

function readLeads() {
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveLead(lead) {
  const leads = readLeads();
  const entry = { ...lead, capturedAt: new Date().toISOString() };
  leads.push(entry);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  console.log('[lead captured]', entry);

  notifyOwner(entry).catch((err) => console.error('[leads] notifyOwner failed:', err.message));
  forwardToWebhook(entry).catch((err) =>
    console.error('[leads] webhook forward failed:', err.message)
  );

  return entry;
}

async function notifyOwner(lead) {
  const { accountSid, authToken, fromNumber } = config.twilio;
  const ownerPhone = config.business.ownerPhone;
  if (!accountSid || !authToken || !fromNumber || !ownerPhone) return;

  const client = twilio(accountSid, authToken);
  const summary = [
    `New sales call for ${config.business.name}:`,
    lead.callerNumber ? `From: ${lead.callerNumber}` : null,
    lead.name ? `Name: ${lead.name}` : null,
    lead.contact ? `Contact: ${lead.contact}` : null,
    lead.interestLevel ? `Interest: ${lead.interestLevel}` : null,
    lead.nextStep ? `Next step: ${lead.nextStep}` : null,
    lead.notes ? `Notes: ${lead.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  await client.messages.create({
    to: ownerPhone,
    from: fromNumber,
    body: summary,
  });
}

async function forwardToWebhook(lead) {
  if (!config.leadsWebhookUrl) return;
  await fetch(config.leadsWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
}

module.exports = { readLeads, saveLead };
