# AI Sales Agent

A very simple AI voice agent that makes and takes sales calls for a business.
Callers hear a real-sounding rep who pitches the product, handles common
objections, and books a follow-up — no human needed. Every call ends with a
text message to the business owner summarizing what happened.

Pitch to sell it: **"Never miss a sales call again — a 24/7 AI rep answers
your phone, pitches your product, and texts you the lead."**

## How it works

```
Caller  <--phone-->  Twilio number  <--media stream-->  server.js  <--audio-->  OpenAI Realtime API
```

- **Twilio** owns the phone number and the phone call.
- **OpenAI's Realtime API** does the actual talking/listening (speech-to-speech,
  no separate transcription/TTS steps).
- **server.js** is the small bridge between the two, plus a `capture_lead`
  tool the model calls at the end of every conversation to log the outcome.
- Every deployment is configured for **one business** via environment
  variables — that's what makes reselling this easy: clone the repo, change
  the pitch, deploy, point a new Twilio number at it.

## Setup

1. **Get accounts**: a [Twilio](https://www.twilio.com) account with a phone
   number, and an [OpenAI](https://platform.openai.com) API key with access to
   the Realtime API.
2. **Install deps**: `npm install`
3. **Configure**: `cp .env.example .env` and fill it in — see the two sections
   in that file: core service credentials, and the per-client sales pitch
   (business name, what you're selling, pricing, objection handling, a
   calendar booking link, and the owner's phone number for lead texts).
4. **Expose your server publicly.**
   - Local testing: `ngrok http 3000`, then set `PUBLIC_HOSTNAME` in `.env` to
     the ngrok host (e.g. `abcd1234.ngrok.app`).
   - Real deployment: deploy to Render/Railway/Fly/etc., then set
     `PUBLIC_HOSTNAME` to that host.
5. **Point Twilio at it**: in the Twilio console, set your phone number's
   "A call comes in" webhook to `https://<PUBLIC_HOSTNAME>/voice` (HTTP POST).
6. **Run it**: `npm start`
7. **Call the number.** The agent answers and starts pitching.

## Outbound calls

To have the agent call a lead instead of waiting for them to call in:

```bash
curl -X POST https://<PUBLIC_HOSTNAME>/call \
  -H "Content-Type: application/json" \
  -d '{"to": "+15551234567"}'
```

## Viewing captured leads

Every call ends with the model recording the outcome. Leads are appended to
`leads.json` and available at `GET /leads`. If `OWNER_PHONE` is set, the
business owner also gets a text summary immediately after each call. If
`LEADS_WEBHOOK_URL` is set, each lead is also POSTed there as JSON (e.g. to
feed a CRM via Zapier).

## Reselling this to multiple businesses

Each client gets their own copy of the `.env` "per-client" section and their
own Twilio number:

1. Copy `.env.example` to a new `.env` for the client, filling in their pitch,
   pricing, objection handling, calendar link, and phone number.
2. Deploy a new instance (or a new environment/service on the same host).
3. Buy or port a Twilio number for that client, and point its voice webhook
   at the new deployment.

That's the whole "multi-tenant" story for a v1 — simple to reason about, and
each client's usage/billing is cleanly separated by Twilio account or
sub-account.

## Notes / limitations

- This is intentionally minimal: one active call per media-stream connection,
  a single lead-capture tool, and file-based lead storage. Good enough for a
  first sellable version; swap `leads.json` for a real database and add
  call-recording/analytics as you grow.
- Costs: you pay Twilio per phone-call-minute and OpenAI for Realtime API
  usage. Price your service per business accordingly (e.g. flat monthly fee
  covering a call volume, or a per-minute markup).
