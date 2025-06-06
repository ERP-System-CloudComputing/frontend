import Vue from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

Vue.prototype.$dayjs = dayjs
