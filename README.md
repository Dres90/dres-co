# dres.co

Personal site for **Andres Cardenas** — portfolio, CV, labs, and small secured
APIs (for example a weight log webhook backed by Supabase).

## Requirements

- **Node:** use [nvm](https://github.com/nvm-sh/nvm) and run **`nvm use stable`**
  (or `nvm use` to read [`.nvmrc`](.nvmrc)) before installing dependencies.
- **npm:** ships with Node.

## Scripts

| Script           | Purpose                           |
| ---------------- | --------------------------------- |
| `npm run dev`    | Next.js dev server (Turbopack)    |
| `npm run build`  | Production build                  |
| `npm run start`  | Run production build locally      |
| `npm run lint`   | ESLint                            |
| `npm run format` | Prettier write                    |
| `npm run check`  | Typecheck + lint + Prettier check |

## Environment

Copy [`.env.example`](.env.example) to `.env.local` and fill values for Supabase
and webhook secrets when you use `/api/weight`.

## Content

- Copy and portfolio stubs live under [`content/`](content/).
- CV is rendered at `/cv` from the app (no separate public PDF download).

## Database

SQL for the weight log table is in
[`supabase/migrations/001_weight_entries.sql`](supabase/migrations/001_weight_entries.sql).

## License

The code in this repository is licensed under the MIT License.

Unless otherwise noted, all written content, images, branding, and other non-code assets are copyright Andres Cardenas and are not licensed for reuse.
