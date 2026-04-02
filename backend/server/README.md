# EnerLuma Backend

## Stack
- Node.js (ESM)
- Express
- MongoDB + Mongoose
- JWT auth
- Passport (Google/Apple OAuth)
- Zod validation
- Helmet + CORS + rate limiting

## Architecture

```
backend/server/
  app.js
  index.js
  config/
    db.js
    env.js
    passport.js
  controllers/
    aiController.js
    alertController.js
    authController.js
    dashboardController.js
    deviceController.js
    energyController.js
    waterController.js
    webhookController.js
  data/
    mockData.js
  jobs/
    maintenanceJob.js
  middleware/
    asyncHandler.js
    auth.js
    errorHandler.js
    rateLimit.js
    validate.js
  models/
    Alert.js
    Device.js
    UsageSnapshot.js
    User.js
  routes/
    ai.js
    alerts.js
    auth.js
    dashboard.js
    devices.js
    energy.js
    index.js
    water.js
    webhooks.js
  scripts/
    seed.js
  services/
    aiService.js
    alertService.js
    authService.js
    dashboardService.js
    deviceService.js
    energyService.js
    waterService.js
  utils/
    apiError.js
    cache.js
    logger.js
```

## Environment

Copy `.env.example` to `.env`.

Required for local:
- `MONGO_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `SERVER_URL`

OAuth variables are optional.

## API Summary

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/apple`
- `POST /api/auth/apple/callback`
- `GET /api/dashboard/overview`
- `GET /api/energy/analytics`
- `GET /api/water/analytics`
- `GET /api/devices`
- `GET /api/devices/:deviceId/analytics`
- `GET /api/ai/insights`
- `GET /api/alerts`
- `POST /api/webhooks/events`

All non-auth feature endpoints require `Authorization: Bearer <token>`.

## Run

```bash
npm install
npm run seed
npm run dev
```

Production run:

```bash
npm start
```
