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

Schema changes live as SQL files in [`supabase/migrations/`](supabase/migrations/).
The production database is **hosted Supabase**; apply migrations from this repo with the
[Supabase CLI](https://supabase.com/docs/guides/cli) (installed as a dev dependency).

**One-time setup**

1. Log in: `npx supabase login`
2. Link this directory to your Supabase project (project ref is in the dashboard under
   **Project Settings → General**):

   ```bash
   npx supabase link --project-ref <project-ref>
   ```

**Apply migrations** (pushes any new files under `supabase/migrations/` to the linked project):

```bash
npx supabase db push
```

Use this after adding or changing migration SQL locally and before relying on those changes
in production.

## License

The code in this repository is licensed under the MIT License.

Unless otherwise noted, all written content, images, branding, and other non-code assets are copyright Andres Cardenas and are not licensed for reuse.
