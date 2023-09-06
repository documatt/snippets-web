# snippets-web README

## Settings

Axios base URL. No trailing slash!

## Developer

### package.json

A few notes because they can't be in package.json (it doesn't support comments).

#### Pinia

NPM could cause `ERESOLVE could not resolve` error when installing Pinia. [Pinia docs](https://pinia.vuejs.org/ssr/nuxt.html#Installation) recommends adding the following to package.json:

```
"overrides": {
    "vue": "latest"
}
```

