################
Developer guides
################

Logging
=======

Writing log messages
--------------------

Use only the following levels (constants from ``consts.js``):

* error - ``this.$ulog(ERROR_LEVEL, "<msg>")`` (severity as ``console.error()``)
* warn - ``this.$ulog(WARN_LEVEL, "<msg>")`` (severity as ``console.warn()``)
* info - ``this.$ulog(INFO_LEVEL, "<msg>")`` or ``this.$ulog("<msg>")`` (less recommended) (severity as ``console.info()`` and ``console.log()``)
* debug - ``this.$ulog(DEBUG_LEVEL, "<msg>")`` (severity as ``console.debug()``)

Changing log level
------------------

By default, only WARN and ERROR messages will be found in browser console. To change log level either

a) `append querystring <https://www.npmjs.com/package/ulog#querystring-parameter>`_ like ``https://snippets.documatt.com/?log=debug``, or
b) `set localStorage key <https://www.npmjs.com/package/ulog#localstorage-key>`_ like ``localStorage.setItem('log', 'debug')``.