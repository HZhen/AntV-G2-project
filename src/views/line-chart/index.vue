<template>
  <div>
    <el-row class="div-row"  :gutter="20">
      <el-col :span="12">
        <el-card>
          <line-chart></line-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <line-chart1></line-chart1>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <line-chart2></line-chart2>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <line-chart3></line-chart3>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <line-chart4></line-chart4>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <line-chart5></line-chart5>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <line-chart6></line-chart6>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import lineChart from './components/line-chart/index'
import lineChart1 from './components/line-chart1/index'
import lineChart2 from './components/line-chart2/index'
import lineChart3 from './components/line-chart3/index'
import lineChart4 from './components/line-chart4/index'
import lineChart5 from './components/line-chart5/index'
import lineChart6 from './components/line-chart6/index'
export default {
  name:'',
  components: {
    lineChart,
    lineChart1,
    lineChart2,
    lineChart3,
    lineChart4,
    lineChart5,
    lineChart6
  },
  data () {
    return {
     
    }
  },
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>