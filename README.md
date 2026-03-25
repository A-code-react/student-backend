# Student Backend

Express + MongoDB backend for student management.

## Setup

1. Copy `.env.example` to `.env` and set your values:
   - `PORT`
   - `MONGO_URI`
   - `CLIENT_URL`

2. Install deps:
   - `npm install`

3. Start in development:
   - `npm run dev`

4. Start in production:
   - `npm run start`

## Production readiness changes

- Used `server.js` as main entrypoint
- Added `helmet` and CORS settings
- Added 404 and global error middleware
- Added graceful shutdown for SIGINT/SIGTERM
- Added `Dockerfile` + `.dockerignore`
- Added `.gitignore`

## Docker

Build: `docker build -t student-backend .`
Run: `docker run -p 5000:5000 --env-file .env student-backend`

## Deployment

- Ensure app runs with `NODE_ENV=production` and correct `MONGO_URI`
- Use managed MongoDB (Atlas or provider)
- Set `CLIENT_URL` to your frontend origin
- Deploy on Heroku/Fly/Vercel Cloud Run etc.
