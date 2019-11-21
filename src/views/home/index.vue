<template>
  <div class="home">
    <el-header>
      <header class="header">AntV-G2
        <a class="path" href="https://github.com/HZhen/AntV-G2-project" target="_blank"><img src="@images/home/github.png" alt=""></a>
      </header>
      
    </el-header>
    <el-main>
        <el-scrollbar style="height:100%">
        <section class="main" >
          <div class="features_item" 
            v-for="(item,index) of featureList" 
            :key="index"
            :style="{backgroundImage:'url('+ item.imgURL+')'}"
            @click="handlePush(item.path)"
          >
            <div class="title">{{item.title}}</div>
          </div>
        </section>
      </el-scrollbar>
    </el-main>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      featureList: [
        { 
          title: "折线图", 
          path: "/main/line-chart",
          imgURL: require('@images/home/icon-line.png')
        },
        { 
          title: "柱状图", 
          path: "/main/column-chart",
          imgURL: require('@images/home/icon-column.png')
        },
        { 
          title: "条形图", 
          path: "/main/strip-chart",
          imgURL: require('@images/home/icon-strip.png')
        },
        { 
          title: "饼图", 
          path: "/main/pie-chart",
          imgURL: require('@images/home/icon-pie.png')
        },
        { 
          title: "点图", 
          path: "/main/point-chart",
          imgURL: require('@images/home/icon-point.png')
        },
        { 
          title: "面积图", 
          path: "/main/area-chart",
          imgURL: require('@images/home/icon-area.png')
        },
        { 
          title: "箱形图", 
          path: "/main/box-chart",
          imgURL: require('@images/home/icon-box.png')
        },
        { 
          title: "烛形图", 
          path: "/main/candle-chart",
          imgURL: require('@images/home/icon-candle.png')
        },
        { 
          title: "热力图", 
          path: "/main/thermal-map",
          imgURL: require('@images/home/icon-thermal.png')
        },
        { 
          title: "仪表图", 
          path: "/main/dash-board",
          imgURL: require('@images/home/icon-dash.png')
        },
        { 
          title: "漏斗图", 
          path: "/main/funnel-chart",
          imgURL: require('@images/home/icon-funnel.png')
        },
        { 
          title: "地图", 
          path: "/main/map",
          imgURL: require('@images/home/icon-map.png')
        },
        { 
          title: "雷达图", 
          path: "/main/radar-chart",
          imgURL: require('@images/home/icon-radar.png')
        },
        { 
          title: "关系图", 
          path: "/main/relation-chart",
          imgURL: require('@images/home/icon-relation.png')
        },
      ]
    }
  },
  computed: {
    containerHeight() {
      const size = this.getViewportSize();
        return size.height - 100 + "px";
    },
  },
  methods: {
    handlePush (path) {
      this.$router.push({path: path});
    }
  }
}
</script>
<style lang="less">
 .el-header {
    height: 100px!important;
  }
   .el-main {
     height: 650px;
     overflow:hidden;
   }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
<style lang="less" scoped>
@import './index.less';
</style>