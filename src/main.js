/* 解决IE兼容性问题 */
import 'babel-polyfill'
/*引入框架Vue*/
import Vue from 'vue'
import router from './router'
import App from './App'
/*引入全局样式*/
import 'normalize.css' //样式reset，处理浏览器起始样式兼容
import Element from 'element-ui'

Vue.use(Element)
/*引入全局注册的组件*/
import './components/global/index.js'/*src/components/global/index.js*/

// 获取屏幕宽高
Vue.prototype.getViewportSize = function(){
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
};
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
