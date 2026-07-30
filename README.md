# Async Race

> **Score: ___ / 400**
> **Deployed UI:** [async-race-madinajumalys-projects.vercel.app](https://async-race-madinajumalys-projects.vercel.app)

A single-page application to manage a collection of cars, operate their engines,
and show race statistics. Built with **React 18 + TypeScript (strict) + Redux
Toolkit / RTK Query**, bundled with Vite.

## Prerequisites: run the mock server

This UI needs the mock backend running locally on port 3000:

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start   # -> http://127.0.0.1:3000
```

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run lint      # ESLint (Airbnb)
npm run format    # Prettier: auto-format
npm run ci:format # Prettier: check only (CI)
```

## Project structure

```
src/
  api/         RTK Query base slice + injected endpoints (garage / engine / winners)
  app/         store configuration + typed hooks
  features/    garage, winners, race — each owns its slice + view
  components/  shared UI (Header, Pagination, CarIcon)
  constants/   pinned values (page sizes, base url, name parts) — no magic numbers
  types/       shared TypeScript domain models
  utils/       helpers (random car generation)
  (global CSS lives in src/index.css)
```

## Checklist ___ / 400 pts

### Basic Structure (80)

- [X] Two Views: Garage + Winners (10)
- [X] Garage View content: name, create/edit panel, race panel, garage section (30)
- [X] Winners View content: name, table, pagination (10)
- [X] Persistent state across view switches (page + inputs) (30)

### Garage View (90)

- [X] Car CRUD; delete also removes from winners; empty/long names handled (20)
- [X] Color selection from RGB palette, shown on car + name (10)
- [X] Generate 100 random cars (name = 2 parts, random color) (20)
- [X] Update / delete buttons per car (10)
- [X] Pagination, 7 per page (10)
- [ ] Extra: "No Cars" empty state; go to prev page when last car on page removed (20)

### Winners View (50)

- [ ] Winner appears in table after winning (15)
- [ ] Pagination, 10 per page (10)
- [ ] Table: №, image, name, wins, best time; increment wins, keep best time (15)
- [ ] Sort by wins and by time, asc/desc (10)

### Race (170)

- [ ] Start engine animation; stop on 500 (20)
- [ ] Stop engine animation; car returns to start (20)
- [ ] Responsive animation down to 500px (30)
- [ ] Start race for all cars on page (10)
- [ ] Reset race to start positions (15)
- [ ] Winner announcement banner with car name (5)
- [ ] Button states (start disabled while driving; stop disabled at start) (20)
- [ ] Correct handling of actions during a race (50)

### Prettier & ESLint (10)

- [ ] Prettier: `format` + `ci:format` scripts (5)
- [ ] ESLint: Airbnb config + `lint` script, strict TS (5)

_Overall Code Quality (100) is scored by the reviewer — skip during self-check._
