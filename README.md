# FinSight Dashboard

This project is a small finance dashboard built with React and Vite. I made it as part of a frontend screening assignment for an internship role in a fintech startup.

The idea behind the app is simple: show a clean overview of transactions, balances, spending patterns, and a few useful insights without making the interface feel too heavy.

## What the app does

- Dashboard page with balance, income, expenses, and saving score
- Period-based filtering for `1M`, `3M`, and `6M`
- Transaction table with filter and sorting
- Insights page with spending breakdown and trend-based summaries
- Admin mode for adding, editing, and deleting transactions
- CSV export on the transactions page
- Dark mode toggle
- Responsive sidebar / bottom navigation setup

## Tech used

- React
- Vite
- Tailwind CSS
- Lucide React
- Recharts
- Firebase Hosting config for deployment

## Project structure

```bash
src/
  components/
  config/
  context/
  data/
  pages/
  utils/
```

Main parts of the app:

- `src/pages/Dashboard.jsx` for the overview screen
- `src/pages/Transactions.jsx` for full transaction management
- `src/pages/Insights.jsx` for patterns and summaries
- `src/context/AppProvider.jsx` for shared app state
- `src/components/AddTransactionModel.jsx` for add/edit transaction modal

## Running locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Admin mode

There are two modes in the app:

- `Viewer` mode for normal browsing
- `Admin` mode for managing transactions

In admin mode, the user can:

- add a new transaction
- edit an existing transaction
- delete a transaction

## Notes

- The app currently uses mock transaction data stored locally.
- Category names are mapped using MCC codes.
- Firebase hosting is configured with `dist` as the public build folder.

## What I focused on

For this assignment, I mainly focused on:

- clean UI
- readable component structure
- practical state handling with context
- simple transaction CRUD flow
- useful financial summaries and charts

## Possible improvements

If I continue this project further, the next things I would improve are:

- persist transactions in a backend or database
- add authentication for admin actions
- improve form validation
- add tests
- optimize the larger production bundle

## Deployment

The project includes a basic `firebase.json`, so it can be deployed on Firebase Hosting after building the app.

Typical flow:

```bash
npm run build
firebase deploy
```
