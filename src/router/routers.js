import Main from '@/components/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置e) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/',
    name: 'webHome',
    meta: {},
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      title: 'Main',
    },
    component: Main,
    children: [
      {
        path: 'line-chart',
        name: 'line-chart',
        meta: {
          title: '折线图'
        },
        component: () => import('@/views/line-chart/index.vue')
      },
      {
        path: 'column-chart',
        name: 'column-chart',
        meta: {
          title: '柱状图'
        },
        component: () => import('@/views/column-chart/index.vue')
      },
      {
        path: 'strip-chart',
        name: 'strip-chart',
        meta: {
          title: '条形图'
        },
        component: () => import('@/views/strip-chart/index.vue')
      },
      {
        path: 'pie-chart',
        name: 'pie-chart',
        meta: {
          title: '饼图'
        },
        component: () => import('@/views/pie-chart/index.vue')
      },
      {
        path: 'point-chart',
        name: 'point-chart',
        meta: {
          title: '点图'
        },
        component: () => import('@/views/point-chart/index.vue')
      },
      {
        path: 'area-chart',
        name: 'area-chart',
        meta: {
          title: '面积图'
        },
        component: () => import('@/views/area-chart/index.vue')
      },
      {
        path: 'box-chart',
        name: 'box-chart',
        meta: {
          title: '箱形图'
        },
        component: () => import('@/views/box-chart/index.vue')
      },
      {
        path: 'candle-chart',
        name: 'candle-chart',
        meta: {
          title: '烛形图'
        },
        component: () => import('@/views/candle-chart/index.vue')
      },
      {
        path: 'thermal-map',
        name: 'thermal-map',
        meta: {
          title: '热力图'
        },
        component: () => import('@/views/thermal-map/index.vue')
      },
      {
        path: 'dash-board',
        name: 'dash-board',
        meta: {
          title: '仪表图'
        },
        component: () => import('@/views/dash-board/index.vue')
      },
      {
        path: 'funnel-chart',
        name: 'funnel-chart',
        meta: {
          title: '漏斗图'
        },
        component: () => import('@/views/funnel-chart/index.vue')
      },
      {
        path: 'map',
        name: 'map',
        meta: {
          title: '地图'
        },
        component: () => import('@/views/map/index.vue')
      },
      {
        path: 'radar-chart',
        name: 'radar-chart',
        meta: {
          title: '雷达图'
        },
        component: () => import('@/views/radar-chart/index.vue')
      },
      {
        path: 'relation-chart',
        name: 'relation-chart',
        meta: {
          title: '关系图'
        },
        component: () => import('@/views/relation-chart/index.vue')
      },
    ]
  }
]
