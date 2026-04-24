# docs.getbram.com

Public documentation for [BRAM](https://getbram.com) — the AI trust platform. Built with [Mintlify](https://mintlify.com).

## Local development

```bash
# one-time
npm i -g mintlify

# run the dev server at http://localhost:3000
mintlify dev
```

`mintlify dev` watches [mint.json](./mint.json) + every `.mdx` file and hot-reloads.

## Structure

```
.
├─ mint.json                 # navigation, theme, nav tabs
├─ introduction.mdx          # landing page
├─ quickstart.mdx
├─ mcp/                      # BRAM MCP gateway
├─ governance/               # policy model + approvals + audit
├─ evals/                    # runtime API + datasets + webhooks
├─ api-reference/            # REST endpoint reference
│  └─ evals/
├─ images/                   # logo + OG + inline screenshots
└─ snippets/                 # MDX fragments used with <Snippet>
```

## Authoring

- Content is **MDX** (Markdown + JSX). Standard markdown works; Mintlify's custom components (`<Card>`, `<CardGroup>`, `<Tabs>`, `<Steps>`, `<Accordion>`, `<CodeGroup>`, `<Note>`, `<Warning>`) render without imports.
- Component reference: https://mintlify.com/docs/components/cards
- Frontmatter at the top of each page sets `title` and `description`.
- Add new pages by creating an `.mdx` file and registering it in the `navigation` array in `mint.json`.

### Conventions

- One idea per page. Long docs are split into a navigation group instead of becoming a single scroll.
- Every reference page links to the next logical step via a trailing `<Card>` (see `quickstart.mdx`).
- Code samples are real — not pseudocode. If it's in a `<CodeGroup>`, all tabs produce the same outcome.
- Screenshots go in `/images/` and are referenced with a leading `/` (absolute path).

## Deploy

Mintlify auto-deploys from GitHub:

```bash
# push to main — docs rebuild + deploy in ~60s
git push origin main
```

Configure the integration once at https://dashboard.mintlify.com → **Settings → Git Integration**. Point it at this repo; the default branch is the deployed site.

Preview URLs are generated for every PR.

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
      - run: npm i -g mintlify
      - run: cd docs.getbram.com && mintlify broken-links
```

## OpenAPI reference

The `POST /v1/evals/check` doc uses Mintlify's `openapi` frontmatter pointing at a spec. To auto-generate every endpoint, add:

```json
// in mint.json
"openapi": "https://api.getbram.com/openapi.json"
```

We don't ship that yet — the API reference pages are hand-written so they can cover patterns that the raw spec wouldn't (rotation pattern for keys, the confidence band for evals, etc.). Leave hand-written for now; generate the raw endpoint list as a fallback later.

## Contact

Ping `#docs` in the workspace Slack or mail [docs@getbram.com](mailto:docs@getbram.com).
