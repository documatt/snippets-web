import log from 'loglevel'

/**
 * Sleep for N ms.
 *
 * @param {number} ms
 * @return {Promise<unknown>}
 */
// Turns setTimeout into async function
// https://codingwithspike.wordpress.com/2018/03/10/making-settimeout-an-async-await-function/
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Compute CRC32.
 *
 * @param {string} r
 * @return {number}
 */
// copied from https://stackoverflow.com/a/50579690/915931
// eslint-disable-next-line
export function crc32 (r) {for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r.charCodeAt(t))];return(-1^n)>>>0}

/**
 * Async function that does actual work (an operation).
 *
 * @callback attemptTo~workFn
 * @return {Promise<*>} any value that will be passed to {@link attemptTo~testFn} to evaluate if another attempt should be made
 */

/**
 * Async function to test whether return value from {@link attemptTo~workFn} indicate successful attempt
 *
 * @callback attemptTo~testFn
 * @param {*} value returned by {@link attemptTo~workFn}
 * @return {Promise<boolean>} true - success, false - try again
 */

/**
 * Try out an operation, and test if it was successful till the limit. Call <tt>workFn</tt> function, check <tt>testFn</tt> whether is done, repeat <tt>maxAttempts</tt> at the max.
 *
 * @param {String} what (verb) used in log messages, e.g. "get a document preview"
 * @param {Number} maxAttempts
 * @param {attemptTo~workFn} workFn async function to be called at least once, maxAttempts at max. Must return a value that is passed to testFn.
 * @param {attemptTo~testFn} testFn async function accepting 1 argument returned by workFn and telling true if attempt was successful, or false to repeat the attempt until reaching maxAttempts
 * @param {Number} interval in ms. First attempt is made immediately. Second, after sleep period (e.g. 1 second), third after sleep * 2 (e.g. 2 seconds), fourth after sleep * 3 (e.g. four seconds), etc.
 * @return return value from <tt>workFn</tt> from successful attempt, or undefined is only non successful attempts were made
 */
export async function attemptTo (what, workFn, testFn, maxAttempts = 3, interval = 1000) {
  let attemptNo = 1
  await sleep(interval)
  log.trace(`Attempt ${attemptNo} to ${what}`)
  let testValue = await workFn()
  const isNotFound = async testValue => !await testFn(testValue) === true

  while ((attemptNo < maxAttempts) && (await isNotFound(testValue))) {
    attemptNo++
    await sleep(interval * attemptNo)
    log.trace(`Attempt ${attemptNo} to ${what}`)
    testValue = await workFn()
  }

  if (await isNotFound(testValue)) {
    log.error(`Made ${attemptNo} unsuccessful attempts to ${what}`)
    return
  }

  log.info(`Attempt ${attemptNo} to ${what} was successful`)
  return testValue
}

/**
 * Says package name, package version, and Git revision to console. If URL
 * contains QS `say=ver`, also to `alert()`.
 */
export function sayVer () {
  const packageJson = require('./../package.json')
  const gitRev = process.env.VUE_APP_GIT_REV
  const ver = `I'm ${packageJson.name} ${packageJson.version} #${gitRev}`

  // Alert it?
  if ((new URL(document.location)).searchParams.get('say') === 'ver') {
    alert(ver)
  }

  // In all cases, log it
  log.info(ver)
}

/**
 * Set logging severity level from query string 'log'. Values are trace, debug, info, warn or error.
 */
export function setLogLevelFromQR() {
  let level = (new URL(document.location)).searchParams.get('log')
  if (level) {
    log.setLevel(level)
  }

  log.info('Default log level set from query string to', level)
}