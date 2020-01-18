import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入公共样式和字体图标
import './styles/base.css'
import './styles/iconfont.css'

// 导入 rem 的 js, 动态的设置了, 不同屏幕的html根元素的 font-size
import 'lib-flexible'
import moment from 'moment'

import axios from 'axios'
import HmInput from './components/HmInput'
import HmButton from './components/HmButton'
import HmNav from './components/HmNav.vue'

// 引入vant-ui
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.component('HmInput', HmInput)
Vue.component('HmButton', HmButton)
Vue.component('HmNav', HmNav)

// 使用过滤器处理时间
Vue.filter('time', input => moment(input).format('YYYY-MM-DD'))

// .............................axios的优化...................................
Vue.prototype.$axios = axios
// 给axios设置默认的baseURL (基准路径)  会自动拼接url参数
axios.defaults.baseURL = 'http://localhost:3000'
// 导航守卫控制未登录的用户
/*
  给路由对象注册前置导航守卫
  to: 到哪去
  from: 从哪来
  next: 函数
  next(): 代表放行  next('/login')
*/
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/profile') {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
// 拦截器拦截token过期的用户
// 添加响应拦截器
axios.interceptors.response.use((res) => {
  if (res.data.statusCode === 401 && res.data.message === '用户信息验证失败') {
    router.push('/login')
    // 把过期的信息删除
    localStorage.removeItem('token')
    localStorage.removeItem('id')

    // 给一个提示消息
    Vant.toast.fail('用户信息验证失败')
  }
  return res
}, (err) => {
  return Promise.reject(err)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
