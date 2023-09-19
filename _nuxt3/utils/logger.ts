/**
 * [Consola](https://github.com/unjs/consola) logger with minimal log level
 * from SessionStorage.
 */

import { createConsola, LogLevels } from "consola";
import { useStorage } from '@vueuse/core'

// https://github.com/unjs/consola#log-level
const defaultLogLevel = LogLevels.info
const level = useStorage("snippets.loglevel", defaultLogLevel);

export const logger = createConsola({
    level: level.value,
    formatOptions: {
        date: true
    }
})