<template>
  <div>
    <el-row class="div-row"  :gutter="20">
      <el-col :span="12">
        <el-card>
          <point-chart></point-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <point-chart1></point-chart1>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <point-chart2></point-chart2>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <point-chart3></point-chart3>
        </el-card>
      </el-col>
     </el-row>
  </div>
</template>
<script>
import pointChart from './components/point-chart/index'
import pointChart1 from './components/point-chart1/index'
import pointChart2 from './components/point-chart2/index'
import pointChart3 from './components/point-chart3/index'
export default {
  name:'',
  components: {
    pointChart,
    pointChart1,
    pointChart2,
    pointChart3
  },
  data () {
    return {
      
    }
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>