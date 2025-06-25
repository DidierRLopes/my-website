# Didier Website

This my open source website: https://didierlopes.com/

<p float="left">
  <img src="https://github.com/user-attachments/assets/e612733d-ce97-447c-80cf-8287a6203142" width="500" />
  <img src="https://github.com/user-attachments/assets/03325f5b-a6d7-4270-8b95-6aa574534957" width="460" />
</p>

---

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

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

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
