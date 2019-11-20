<template>
  <div>
    <el-row class="div-row"  :gutter="20">
      <el-col :span="12">
        <el-card>
          <column-chart></column-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <column-chart1></column-chart1>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <column-chart2></column-chart2>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <column-chart3></column-chart3>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <column-chart4></column-chart4>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <column-chart5></column-chart5>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <column-chart6></column-chart6>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <column-chart7></column-chart7>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import columnChart from './components/column-chart/index'
import columnChart1 from './components/column-chart1/index'
import columnChart2 from './components/column-chart2/index'
import columnChart3 from './components/column-chart3/index'
import columnChart4 from './components/column-chart4/index'
import columnChart5 from './components/column-chart5/index'
import columnChart6 from './components/column-chart6/index'
import columnChart7 from './components/column-chart7/index'
export default {
  name:'',
  components: {
    columnChart,
    columnChart1,
    columnChart2,
    columnChart3,
    columnChart4,
    columnChart5,
    columnChart6,
    columnChart7
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