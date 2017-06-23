# WARP Javascript developer testing

## Requirements

1. [Docker](https://docs.docker.com/)
1. [Nodejs](https://nodejs.org/en/) > 7.6.0

## Commands

### Testing
- `npm run lint` – lint files
- `npm run test:unit` – run unit tests
- `npm run test:integration` – run integration tests
- `npm run test:coverage` – run all tests and get coverage report
- `npm test` – run lint and **all** the test with coverage report

### Start
- `npm start` – setup the database and start the server
- `npm run dev` – start the server with automatic restart if changes been made
- `npm run pm2` – start the server with pm2 and optimized conditions

### Setup
- `npm run db:migrate` – execute all database migrations
- `npm run db:seed` – execute all database seeds
- `npm run db:start` – start the database
- `npm run db` – start the database and executes migrations/seeds
