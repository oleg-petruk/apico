import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from "firebase/app";
import 'firebase/auth';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faSearch, faBars, faThLarge, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

library.add(farHeart, faHeart, faEye, faEyeSlash, faSearch, faBars, faThLarge, faPlus, faTimes);

const configOptions = {
  apiKey: "AIzaSyC2KlRJpdpg6VPQuadXCACQcdgqMt9eVmw",
  authDomain: "vue-amedia.firebaseapp.com",
  databaseURL: "https://vue-amedia-default-rtdb.firebaseio.com",
  projectId: "vue-amedia",
  storageBucket: "vue-amedia.appspot.com",
  messagingSenderId: "254806919380",
  appId: "1:254806919380:web:cef0644200cccbf8559341"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount('#app');