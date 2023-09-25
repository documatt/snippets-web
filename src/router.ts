import { createRouter, createWebHistory } from 'vue-router'
import { ERROR, HELP, HOME, NOT_FOUND, SHARE, WRITER } from './utils/routeNames'

const routes = [
  // catch-all route
  { path: "/:pathMatch(.*)*", name: NOT_FOUND, component: () => import("@/views/TheError.vue")},
  { path: "/sorry", name: ERROR, component: () => import("@/views/TheError.vue")},

  { path: '/', name: HOME, redirect: { name: WRITER } },
  { path: '/write', name: WRITER, component: () => import('@/views/TheWriter.vue') },
  { path: '/share', name: SHARE, component: () => import('@/views/TheShare.vue') },
  { path: '/help', name: HELP, component: () => import('@/views/TheHelp.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// Will it work?
// // Handle router errors
// router.onError((err) => {
//   // Handle the router error here
//   console.error("Router error:", err);
//   // Add code for reporting or other error handling logic
// });
