import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueScrollReveal from 'vue-scroll-reveal';
import DatetimePicker from 'vuetify-datetime-picker'

Vue.use(DatetimePicker);
Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  delay: 250, 
  duration: 3000,
  scale: 1,
  distance: '10px',
  mobile: true
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
