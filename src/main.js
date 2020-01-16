import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入公共样式和字体图标
import './styles/base.css'
import './styles/iconfont.css'
// 导入 rem 的 js, 动态的设置了, 不同屏幕的html根元素的 font-size
import 'lib-flexible'
import axios from 'axios'
import HmInput from './components/HmInput'
import HmButton from './components/HmButton'

// 引入vant-ui
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.component('HmInput', HmInput)
Vue.component('HmButton', HmButton)
Vue.use(Vant)

// axios的优化
Vue.prototype.$axios = axios
// 给axios设置默认的baseURL (基准路径)  会自动拼接url参数
axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
