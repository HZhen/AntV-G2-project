/*所有的自定义全局组件在此注册*/
import Vue from 'vue'

function registerEachComponent(item) {
  Vue.component(item.name,item.component);
}
function registerComponents(components) {
  components.map((item)=>{
    registerEachComponent(item)
  })
}

let components = [
  // {
  //   name: 'ScreenControls',
  //   component: resolve => require(['./screenControls/index.vue'], resolve)
  // },
  
];

registerComponents(components);
