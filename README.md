# snippets-web

Vue 3 web app for snippets-api. Hosted as static website on DigitalOcean Apps.

## Developer notes

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Logging

Uses [Consola](https://github.com/unjs/consola).

Nepoužívat nižší level, než info(). Nižší nejsou vidět v browser consoli.

### Vue SFC style

Follow the order template - script - style.

```
<template>
</template>

<script setup lang="ts">
</script>

<style scroped>
</style>
```

## Deployment

### Creating

Configured using environment variables described bellow.

### Continous deployment

Při commitu do dev větve, se automaticky spustí `npm run generate` a vystaví jako https://snippets-dev.documatt.com.

Při commitu do master, totéž a vystaví jako https://snippets.documatt.com.

### Releasing a version

In package.json, update the version

## Local development

### Requirements

* Node 18 LTS.

### First time setup

1. Clone Git to your computer.
2. `cd snippets-web` and `npm init`.
3. Open `.env.local.sample` and save as `.env.local`. Customize settings bellow, mainly `VITE_SENTRY_ENV`.

### Tasks

#### Disable Sentry

In `.env.local` set `VITE_SENTRY_ENABLED=false`.

## Testing

### Unit tests

- `npm run test:unit` will run all tests and stay in foreground watching for changes.- Test of `foo.js` or `foo.vue` are in the `__tests__` subfolder in the `foo.test.ts` file.
- Use `test()`, not `it()` alias.
- Tag elements to test with `data-testid="error-message"` attribute (the `data-testid` is the same attributed expected also by Playwright)

#### Run single test file

(case sensitive)

```
npm run test:unit PreviewStore
```

### E2E tests with Playwright

For better testability the markup is often augmented with [test id `data-testid` attribute](https://playwright.dev/docs/locators#locate-by-test-id) that is expected by the test.

## Settings

* VITE_SENTRY_ENV - Sentry environment (`local-yourname`, `dev` or `prod`)


### Build-time settings

např. NUXT_PUBLIC_API_BASE_URL = "https://snippets-dev.documatt.com"

### Runtime settings

#### Log level

Controlled by `snippets.loglevel` key in Local Storage. By default `3` = info and above. Set to `4` for debug, `5` for trace, or `999` to everything. See [Consola log levels](https://github.com/unjs/consola#log-level).

