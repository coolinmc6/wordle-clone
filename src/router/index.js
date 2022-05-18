import Vue from 'vue';
import VueRouter from 'vue-router';

import Quordle from '../views/Quordle.vue';
import Trainer from '../views/Trainer.vue';
import Wordle from '../views/Wordle.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Wordle',
    component: Wordle,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/quordle',
    name: 'Quordle',
    component: Quordle,
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: Trainer,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
