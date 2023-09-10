# snippets-web README

Nuxt 3 and Vue 3-based web app for snippets-api. Hosted as static website on DigitalOcean Apps.

## Deployment

### Creating

Configured using environment variables described bellow.

### Continous deployment

Při commitu do dev větve, se automaticky spustí `npm run generate` a vystaví jako https://snippets-dev.documatt.com.

Při commitu do master, totéž a vystaví jako https://snippets.documatt.com.

## Local development

Requires Node 18 LTS.

1. Clone Git to your computer.
2. `cd snippets-web` and `npm init`.
3. If needed, create `.env` file with the settings bellow. But the defaults expect local running snippets-api.
4. `npm run dev` for hot deploy or `npm run generate` to build static app into `.output/public/` folder.

## Settings

### Build-time settings

např. NUXT_PUBLIC_API_BASE_URL = "https://snippets-dev.documatt.com"

### Runtime settings

#### Log level

Controlled by `snippets.loglevel` key in Local Storage. By default `3` = info and above. Set to `4` for debug or `999` to everything. See [Consola log levels](https://github.com/unjs/consola#log-level).

## Developer notes

### package.json

A few notes because they can't be in package.json (it doesn't support comments).

### Logging

Uses [Consola](https://github.com/unjs/consola).

Nepoužívat nižší level, než info(). Nižší nejsou vidět v browser consoli.

### Vue SFC style

Follow the order script - template - style.

```
<script setup lang="ts">
</script>

<template>
</template>

<style scroped>
</style>
```

#### Pinia

NPM could cause `ERESOLVE could not resolve` error when installing Pinia. [Pinia docs](https://pinia.vuejs.org/ssr/nuxt.html#Installation) recommends adding the following to package.json:

```
"overrides": {
    "vue": "latest"
}
```

