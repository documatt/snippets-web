# Configuration

During the build (npm run build), there must exist `VUE_APP_API_BASE_URL` evn var that points to Api URL.

`RUNNING_ENV` with values `dev` or `prod` is crutial for disniguish errors in Sentry or visually distinguish in Web "you are on non-PROD".

NOTE: `VUE_APP_ prefix for env var is requirements by Vue CLI that [expose only env vars with `VUE_APP_` prefix](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables) to JS as `process.env.VUE_APP_something`.