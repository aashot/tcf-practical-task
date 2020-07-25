import Vue from 'vue';
import VueRouter from 'vue-router';
import VueBodyClass from 'vue-body-class';
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
    meta: { layout: 'auth', bodyClass: "theme-blue" },
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'auth', bodyClass: "theme-blue" },
    props: true,
    component: Login
  },
  {
    path: '/',
    name: 'dashboard',
    meta: { layout: 'main', auth: true, bodyClass: "theme-white" },
    component: Dashboard,
  },
  {
    path: '/add-campaign',
    name: 'add-campaign',
    meta: { layout: 'compose-campaign', auth: true, bodyClass: "theme-blue" },
    component: () => import('@/views/AddCampaign.vue'),
  },
  {
    path: '/edit-campaign',
    name: 'edit-campaign',
    meta: { layout: 'compose-campaign', auth: true, bodyClass: "theme-blue" },
    component: () => import('@/views/EditCampaign.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const vueBodyClass = new VueBodyClass(routes);
router.beforeEach((to, from, next) => { vueBodyClass.guard(to, next) });


router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }

  if (to.meta.layout === 'auth' && currentUser && currentUser.emailVerified) {
    next({ name: 'dashboard' });
  }
})

export default router;
