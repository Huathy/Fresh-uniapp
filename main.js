import Vue from 'vue'
import App from './App'
import {myReq} from "./utils/utils.js"

Vue.prototype.$myReq = myReq

Vue.config.productionTip = false

// 直接声明常量基址路径
Vue.prototype.BASE_PATH = "http://119.23.187.147:8080/fresh/"

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
