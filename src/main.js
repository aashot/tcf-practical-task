import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMeta from 'vue-meta';
import store from './store';
import firebase from "firebase/app";
import firebaseConfig from '@/firebase/firebaseConfig.js';
import titlePlugin from '@/utils/title.plugin.js';
import '@babel/polyfill';
import 'mutationobserver-shim';
import './plugins/bootstrap-vue';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Gloabl components
Vue.component(
  'BaseButton', () => import('@/components/elements/BaseButton.vue')
);
Vue.component(
  'BasePageLoader', () => import('@/components/elements/BasePageLoader.vue')
);


// Custom plugins 
Vue.use(titlePlugin);

Vue.use(VueMeta);

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    Vue.config.productionTip = false
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
})



