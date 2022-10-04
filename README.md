# @roma-js/site

## Description

The new RomaJS website built with [astro](https://astro.build/).

## Features

- Seo Support | automatic sitemap generation, robots.txt, `link[rel="alternate"]` etc...
- Localized routes `/it/**` italian and `/en/**` english.
- Blog section.
- Blog category pages.
- [feed rss](https://rss.com/blog/how-do-rss-feeds-work/) available at `<SITE>/blog/rss.xml`.
- opengraph and twitter social cards.
- headless blog posts available at `/api/blog/post.json`.
- headless blog posts categories available at `/api/blog/category.json`.
- About page

## Todo

- [ ] homepage
- [x] script that generates blog post files from a template
- [x] github action pipeline that deploys to github pages
- [x] blog post categories pages
- [ ] blog post authors pages
- [x] blog post comments powered by [giscus](https://giscus.app/)
- [ ] copy facebook posts
- [ ] generate blog homepage
- [x] build about page
- [x] setup PR pipeline
- [x] setup deploy to GH pages pipeline
- [ ] more...

## Development

### Requirements

This project requires [node 16](https://nodejs.org/en/) and uses [`pnpm`](https://pnpm.io/) as package manager.

If you have [`nvm`](https://github.com/nvm-sh/nvm) installed run

```bash
nvm use
```

#### pnpm & corepack

You do not need to install `pnpm`, you just need have `node 16` installed and then enable [`corepack`](https://nodejs.org/api/corepack.html):

```bash
corepack enable
```

You should then be able to run pnpm normally in this project, e.g. `pnpm run fmt`.

### How To

#### Create a new post

Run `pnpm run create-post` and follow the instructions.

### Common scripts

- `pnpm run dev` starts dev server at `127.0.0.1:3000`.
- `pnpm run build` builds project and emits site at `dist/` folder.
- `pnpm run fmt` format code using prettier
- `pnpm run create-post` prompts to generate new posts
- `pnpm run preview` starts a server that serves the content of `dist/`
- `pnpm run pre-commit` runs automatically on pre-commit; there's no need to call it directly

### Acknowledgements

The previous version of [romajs.org](https://romajs.org/) has been developed by [Luca Lanziani](https://github.com/LucaLanziani) and its source code is available at https://github.com/Roma-JS/romajs-on-metalsmith.
