import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入公共样式和字体图标
import './styles/base.css'
import './styles/iconfont.css'
// 导入 rem 的 js, 动态的设置了, 不同屏幕的html根元素的 font-size
import 'lib-flexible'

// 引入vant-ui
import Vant from 'vant'

import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
