import Vue from 'vue'
import App from './App.vue'

//bootstrap
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

// import flag component
import LangFlag from 'vue-lang-code-flags';

Vue.component('lang-flag', LangFlag);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
