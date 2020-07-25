import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from "firebase/app";
import firebaseConfig from '@/firebase/firebaseConfig.js';
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



