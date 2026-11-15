# Didier Website

This is my open source website: https://didierlopes.com/

<p float="left">
  <img src="https://github.com/user-attachments/assets/e612733d-ce97-447c-80cf-8287a6203142" width="500" />
  <img src="https://github.com/user-attachments/assets/03325f5b-a6d7-4270-8b95-6aa574534957" width="460" />
</p>

---

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

Both `yarn start` and `yarn build` first run `scripts/generate-thumbnails.mjs`, which writes small WebP thumbnails for book and blog covers into `generated-static/` (gitignored, served as an extra static directory).

### Checks

```
$ yarn typecheck
```

CI (`.github/workflows/github-pages.yml`) runs the typecheck, rejects images over 2MB in `static/`, and builds the site on every pull request and push.

### Deployment

Pushing to `main` builds and deploys the site to GitHub Pages through the workflow above.
