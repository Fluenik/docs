# docs.getbram.com

Public documentation for [BRAM](https://getbram.com) — the AI trust platform. Built with Fumadocs and Next.js.

## Local development

```bash
# run the dev server at http://localhost:3000
npm install
npm run dev
```

`npm run dev` watches the app and every `.mdx` file and hot-reloads.

## Structure

```
.
├─ app/                      # Next.js routes, layout, and search API
├─ content/docs/meta.json    # sidebar order and group labels
├─ content/docs/index.mdx    # landing page
├─ content/docs/quickstart.mdx
├─ content/docs/mcp/         # BRAM MCP gateway
├─ content/docs/governance/  # policy model + approvals + audit
├─ content/docs/evals/       # runtime API + datasets + webhooks
├─ content/docs/api-reference/
│  └─ evals/
└─ public/images/            # logo + favicon + inline screenshots
```

## Authoring

- Content is **MDX** (Markdown + JSX). Standard markdown works; local compatibility components (`<Card>`, `<CardGroup>`, `<Tabs>`, `<Steps>`, `<Accordion>`, `<CodeGroup>`, `<Note>`, `<Warning>`) render without imports.
- Frontmatter at the top of each page sets `title` and `description`.
- Add new pages by creating an `.mdx` file and registering it in the nearest `meta.json`.

### Conventions

- One idea per page. Long docs are split into a navigation group instead of becoming a single scroll.
- Every reference page links to the next logical step via a trailing `<Card>` (see `quickstart.mdx`).
- Code samples are real — not pseudocode. If it's in a `<CodeGroup>`, all tabs produce the same outcome.
- Screenshots go in `/images/` and are referenced with a leading `/` (absolute path).

## Deploy

Deploy this Next.js app to the self-hosted target for <https://docs.getbram.com>:

```bash
npm run build
npm run start
```

## CI

Add this to `.github/workflows/docs.yml` to validate links on every PR:

```yaml
name: Docs CI

on:
  pull_request:
    paths: ['docs.getbram.com/**']

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd docs.getbram.com && npm ci
      - run: cd docs.getbram.com && npm run build
```

## OpenAPI reference

The `POST /v1/evals/check` doc uses Mintlify's `openapi` frontmatter pointing at a spec. To auto-generate every endpoint, add:

The API reference pages are hand-written so they can cover patterns that the raw spec would not, such as the rotation pattern for keys and the confidence band for evals.

## Contact

Ping `#docs` in the workspace Slack or mail [docs@getbram.com](mailto:docs@getbram.com).
