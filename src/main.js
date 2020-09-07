import Vue from 'vue'
import App from './App'
import request from './util/request'
Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.filter('formaDate', (date)=>{
  console.log(date);
    const nDate = new Date(date);
    const year = nDate.getFullYear();
    const month = (nDate.getMonth() + 1).toString().padStart(2, 0);
    const day = nDate.getDay().toString().padStart(2, 0);
    return year + '-' + month + '-' + day
})
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
