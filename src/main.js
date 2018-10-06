import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyBh32wmT7qNUx5NgqLv5FtRVReqFDChz7c',
      authDomain: 'onlinestore-857aa.firebaseapp.com',
      databaseURL: 'https://onlinestore-857aa.firebaseio.com',
      projectId: 'onlinestore-857aa',
      storageBucket: 'onlinestore-857aa.appspot.com',
      messagingSenderId: '715395881047'
    }
    fb.initializeApp(config)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
})
