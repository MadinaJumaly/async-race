# Async Race

> **Self-checklist: 400 / 400** — _Overall Code Quality (100) is scored by the reviewer._
> **Deployed:** https://async-race-madinajumalys-projects.vercel.app

A single-page application to manage a collection of cars, operate their engines, and view race statistics. Built with **React 18 + TypeScript (strict) + Redux Toolkit / RTK Query**, bundled with Vite.

## Prerequisites: run the mock server

This UI talks to a local mock backend on port 3000. Start it first:

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

## Getting started

```bash
npm install
npm run dev     
npm run build  
npm run lint  
npm run format  
npm run ci:format
```

## Tech stack

- **React 18** + **TypeScript** (strict mode, `noImplicitAny`)
- **Redux Toolkit** for UI state, **RTK Query** for server communication and caching
- **React Router** for the two views
- **Vite** for bundling
- **ESLint (Airbnb)** + **Prettier**
- Heading font: [Orbitron](https://fonts.google.com/specimen/Orbitron) via Google Fonts

## Project structure

```
src/
  api/         RTK Query base slice + injected endpoints (garage / engine / winners)
  app/         store configuration + typed hooks
  features/
    garage/    garage view, car row/track, create & update forms, garage slice
    race/      race orchestration (useRace), engine actions, race slice
    winners/   winners table, winner row, save-winner logic, winners slice
  components/  shared UI (Header, Pagination, CarIcon)
  constants/   pinned values (page sizes, base url, name parts) - no magic numbers
  types/       shared TypeScript domain models
  utils/       helpers (random car generation)
  index.css    global styles (dark neon theme)
```

## Architecture notes

A few decisions worth highlighting:

- **Two state systems, kept separate.** RTK Query owns *server data* (cars, winners) and keeps it fresh via tag invalidation. Redux slices own *UI state* (current page, form inputs, sort order, race animation). Mixing these is the most common source of bugs in this task, so they are deliberately isolated.
- **CSS-transition animation.** Each car's animation duration is computed from the engine's `distance / velocity`, so the finish position is known up front and the browser handles the motion. This keeps the animation responsive down to 500px for free.
- **Winner = smallest duration.** The winner is the car with the shortest animation time (first to physically reach the finish), not the first network response to resolve — those differ, and using request-resolution order picks the wrong car.
- **Broken-car freeze by time.** When the engine returns 500 mid-race, the car's progress fraction is computed from elapsed time inside the reducer (not by reading the DOM), so it freezes exactly where it broke down with no timing race.
- **Race cancellation via a generation token.** Each race captures a generation number; resetting or starting a new race bumps it. In-flight engine calls check the live generation after every await and abort if it changed, preventing phantom winners when the user resets mid-race.

## Checklist — 400 / 400 (self-checkable items)

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
- [X] Extra: "No Cars" empty state; go to prev page when last car on page removed (20)

### Winners View (50)

- [X] Winner appears in table after winning (15)
- [X] Pagination, 10 per page (10)
- [X] Table: №, image, name, wins, best time; increment wins, keep best time (15)
- [X] Sort by wins and by time, asc/desc (10)

### Race (170)

- [X] Start engine animation; stop on 500 (20)
- [X] Stop engine animation; car returns to start (20)
- [X] Responsive animation down to 500px (30)
- [X] Start race for all cars on page (10)
- [X] Reset race to start positions (15)
- [X] Winner announcement banner with car name (5)
- [X] Button states (start disabled while driving; stop disabled at start) (20)
- [X] Correct handling of actions during a race (50)

### Prettier & ESLint (10)

- [X] Prettier: `format` + `ci:format` scripts (5)
- [X] ESLint: Airbnb config + `lint` script, strict TS (5)

_Overall Code Quality (100) is scored by the reviewer — excluded from this self-check._

## Credits

- Mock server: [mikhama/async-race-api](https://github.com/mikhama/async-race-api)
- Font: [Orbitron](https://fonts.google.com/specimen/Orbitron) (Google Fonts, Open Font License)
