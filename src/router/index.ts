import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/dailyImages',
    name: 'dailyImages',
    component: () => import(/* webpackChunkName: "image" */ '../views/ImageGuesserView.vue'),
  },
  {
    path: '/dailyGuess',
    name: 'dailyGuess',
    component: () => import(/* webpackChunkName: "guess" */ '../views/PropertyGuesserView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
