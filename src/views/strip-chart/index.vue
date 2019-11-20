<template>
  <div>
    <el-row class="div-row"  :gutter="20">
      <el-col :span="12">
        <el-card>
          <strip-chart></strip-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <strip-chart1></strip-chart1>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <strip-chart2></strip-chart2>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <strip-chart3></strip-chart3>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <strip-chart4></strip-chart4>
        </el-card>
      </el-col>
       <el-col :span="12">
        <el-card>
          <strip-chart5></strip-chart5>
        </el-card>
      </el-col>
      
    </el-row>
  </div>
</template>
<script>
import stripChart from './components/strip-chart/index'
import stripChart1 from './components/strip-chart1/index'
import stripChart2 from './components/strip-chart2/index'
import stripChart3 from './components/strip-chart3/index'
import stripChart4 from './components/strip-chart4/index'
import stripChart5 from './components/strip-chart5/index'
export default {
  name:'',
  components: {
    stripChart,
    stripChart1,
    stripChart2,
    stripChart3,
    stripChart4,
    stripChart5,
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