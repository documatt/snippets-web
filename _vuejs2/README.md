# snippets-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Client-side logging

Uses [loglevel](https://www.npmjs.com/package/loglevel) library.

* By default filtered to warn. To log specify a level append query parametr, e.g. `?log=trace`.
* Methods and severities are trace, debug, info, warn and error. E.g., `log.debug('a message')`.

## Say version

If log level is at least INFO, on each page reload, the webapp will log its name and Git revision.

If you pass query parameter `say=ver`, this information will be `alert()`ed too.