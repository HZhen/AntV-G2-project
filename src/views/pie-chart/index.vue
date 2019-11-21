<template>
  <div>
     <el-row class="div-row"  :gutter="20">
      <el-col :span="12">
        <el-card>
          <pie-chart></pie-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <pie-chart1></pie-chart1>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <pie-chart2></pie-chart2>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <pie-chart3></pie-chart3>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <pie-chart4></pie-chart4>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <pie-chart5></pie-chart5>
        </el-card>
      </el-col>
     </el-row>
  </div>
</template>
<script>
import pieChart from './components/pie-chart/index'
import pieChart1 from './components/pie-chart1/index'
import pieChart2 from './components/pie-chart2/index'
import pieChart3 from './components/pie-chart3/index'
import pieChart4 from './components/pie-chart4/index'
import pieChart5 from './components/pie-chart5/index'
export default {
  name:'',
  components: {
    pieChart,
    pieChart1,
    pieChart2,
    pieChart3,
    pieChart4,
    pieChart5
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