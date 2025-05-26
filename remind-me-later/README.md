# Remind-me-later API

## Description

Simple REST API to create reminders with a message, date/time, and delivery method (SMS or Email).

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)

## Setup

1. Clone the repo
2. Install dependencies

```
npm install
```

3. Create a `.env` file from `.env.example` and configure MongoDB URI

4. Run the server

```
npm run dev
```

## API Endpoint

### POST /api/reminders/create

**Body:**
```json
{
  "date": "2025-05-26",
  "time": "14:00:00",
  "message": "Meeting reminder",
  "reminder_type": "Email"
}
```

**Response:**
- 201 Created with reminder data
