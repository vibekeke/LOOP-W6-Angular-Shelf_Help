# ShelfHelp

A book organizer built with Angular. Log in with a username, browse a catalogue of
books, and save them to a personal reading list.

**Deployment:**
Deployed on Vercel. 
https://w6-shelf-help-two.vercel.app/

## Stack

- Angular 22 (standalone components, signals, functional route guards)
- Tailwind CSS 4
- A hosted JSON Server instance for books and users

## Getting started

Requires Node.js (LTS) and the Angular CLI.

```bash
npm install
```

The API needs a key, which is not committed. Create your local environment files
from the examples and paste the key in:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.development.example.ts src/environments/environment.development.ts
```

Then start the dev server:

```bash
npm start
```

The app runs at `http://localhost:4200/` and reloads on save.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Dev server on port 4200 |
| `npm run build` | Production build into `dist/shelf-help/browser` |
| `npm test` | Unit tests |

## The API key

`src/environments/environment*.ts` are gitignored, so the key stays out of the
repository. Locally you create them by hand (see above). On Vercel, `API_KEY` is
set as an environment variable and `scripts/set-env.mjs` writes
`environment.ts` from it. It runs automatically via the `prebuild` npm hook.


## Component tree

Two versions are committed, as PDFs and as their mermaid sources:

| PDF | Source | What it shows |
| --- | --- | --- |
| `component-tree-planned.pdf` | `diagram-before_code.md` | The design drawn before any code was written |
| `component-tree.pdf` | `diagram.md` | The components as actually built |
