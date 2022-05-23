import Vue from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-regular-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faStar, faStarHalfStroke, fasStar)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)


// import flag component
import LangFlag from 'vue-lang-code-flags';

Vue.component('lang-flag', LangFlag);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
