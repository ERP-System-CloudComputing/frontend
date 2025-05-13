import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faS, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(faS, faEye, faEyeSlash)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
