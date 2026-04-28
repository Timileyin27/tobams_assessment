# Card Number Validation API

A simple Express.js API that validates credit card numbers using the Luhn algorithm.

## Technology Stack

- Node.js 20
- TypeScript (strict mode enabled)
- Express.js
- Jest + Supertest for testing

## Setup


```bash

git clone https://github.com/Timileyin27/tobams_assessment.git
cd tobams_assessment
npm install
# Development (no build needed)
npm run dev

# Production build
npm run build

# Start compiled server
npm start

# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

*Base URL:** https://tobamsassessment-production.up.railway.app/health

## Validate Card
curl -X POST https://your-app.up.railway.app/api/validate \
  -H "Content-Type: application/json" \
  -d '{"cardNumber": "4532 0151 1283 0366"}'

