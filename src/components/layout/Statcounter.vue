<script setup lang="ts">
import { useHead } from '@unhead/vue'
import conf from '@/utils/conf'
import { logger } from '@/utils/logger'

// Example of Statcounter code
// (HTML angle brackets replaced with square to prevent parsing error):

// [script]
// var sc_project=12934799;
// var sc_invisible=1;
// var sc_security="815945ee";
// [/script]
// [script src="https://www.statcounter.com/counter/counter.js" async][/script]

// to be placed just before [/body]

// Runnin `npm run build`ed version
if (import.meta.env.PROD) {
  if (!conf.STATCOUNTER_PROJECT || !conf.STATCOUNTER_SECURITY)
    throw new Error(`Missing env variable VITE_STATCOUNTER_PROJECT and/or VITE_STATCOUNTER_SECURITY`)

  useHead({
    script: [
      {
        textContent: `var sc_project=${conf.STATCOUNTER_PROJECT}; var sc_invisible=1; var sc_security="${conf.STATCOUNTER_SECURITY}";`,
        tagPosition: 'bodyClose'
      },
      {
        src: 'https://www.statcounter.com/counter/counter.js',
        tagPosition: 'bodyClose',
        async: true
      }
    ]
  })
} else {
  // Running `npm run dev`
  logger.debug('Skipping installing Statcounter on non-PROD environment')
}
</script>
