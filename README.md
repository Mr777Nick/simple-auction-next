<p align="center">
  <a href="http://nextjs.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="320" alt="Next Logo" /></a>
</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Simple Auction Frontend

## Summary

The frontend that is being used for the Simple Auction System. Made using [Next JS](https://nextjs.org) framework.

- Prod: https://simple-auction-next.vercel.app/

For more settings, configurations and complete setup, go here: [Next JS Documentation](https://nextjs.org/docs/pages)

## Tech Stacks and Features

- [Vercel](https://vercel.com/), for hosting and deployment
- [Material UI](https://mui.com/), for UI components
- [React Hook Form](https://react-hook-form.com/) and [Yup](https://github.com/jquense/yup) for form validation
- [Next JS Progressbar](https://github.com/apal21/nextjs-progressbar), for progressbar between pages
- [Notistack](https://notistack.com/), for managing snackbar usign provider and hooks
- [Dayjs](https://day.js.org/), for date utils functions and MUI date picker adapter
- [Cookies Next](https://github.com/andreizanik/cookies-next), for managing authentication cookies
- [SWR](https://swr.vercel.app/), for data fetching, infinite load, and mutation
- [Sentry](https://sentry.io/), for error reporting
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/), for code standarization
- [Husky](https://typicode.github.io/husky/), for git hooks
- [Commitizen](https://github.com/commitizen/cz-cli), for commit messages standarization
- [Jest](https://jestjs.io/docs/) and [React Test Library](https://testing-library.com/), for unit testing
- [Next JS](https://nextjs.org/docs) features used:
  - [Pages Router](https://nextjs.org/docs/pages), for managing routes
  - [Testing](https://nextjs.org/docs/pages/building-your-application/optimizing/testing), for setup testing configurations
  - [ESLint](https://nextjs.org/docs/pages/building-your-application/configuring/eslint), for setup ESLint
  - [Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables), for managing environment variables
  - [Static Exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports), for exporting web as static HTML/JS files

## Installation

1. Go to [Sentry dashboard](https://sentry.io/), create a project on it, then take note of the project's client key (DSN).
2. Set up the .env with all the required information of the project prerequisites (Sentry DSN, app name, and backend server url).
3. Run one of these commands:

- `npm run dev` to start local development.
- `npm run start` to start in production mode.

## Usage

### To Run Locally

1. Create `.env.local` file, then set up the .env with all the required information of the project prerequisites (Sentry DSN, app name, and backend server url).
2. Run `npm run dev` to start local development.
3. Server will be running on `localhost:4000`.

### To Deploy to Prod Environment

1. Create a project on Vercel, link the project to this repository, authorize Github account with Vercel.
2. Config environment variables on the vercel dashboard with all the required information of the project prerequisites (Sentry DSN, app name, and backend server url).
3. Deploy the project on vercel, take note of the url generated for the web.
4. Any newer commits to the main branch of the repository will automatically trigger the deployment.

## Depending Services

- [Backend](https://github.com/Mr777Nick/simple-auction-nest)

## Dependent Services

None

## Technical Debt

None

## Known Issues

- Users may occasionally gets signed out automatically when there's an error with the backend connection to Supabase Auth

## Tests

Run one of these commands:

- `npm run test` to start unit tests.
- `npm run test:watch` to start unit tests in watch mode.
