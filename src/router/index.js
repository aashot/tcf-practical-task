import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: { layout: 'empty' },
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: Login
  },
  {
    path: '/',
    name: 'dashboard',
    meta: { layout: 'main', auth: true },
    component: Dashboard
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }
})

export default router;
