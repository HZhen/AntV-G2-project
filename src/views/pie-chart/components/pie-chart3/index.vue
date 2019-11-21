<template>
  <div id="mountNode3"></div>
</template>
<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set';
export default {
  name:'',
  data () {
    return {
      chart: null,
      chartData: [
        {
          type: '分类一',
          value: 27
        }, {
          type: '分类二',
          value: 25
        }, {
          type: '分类三',
          value: 18
        }, {
          type: '分类四',
          value: 15
        }, {
          type: '分类五',
          value: 10
        }, {
          type: 'Other',
          value: 5
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm =>{
      vm.drawChart();
    })
  },
  mounted () {
    this.drawChart();
  },
  methods: {
    drawChart () {
      let size = this.getViewportSize();
      let width = size.width/2 - 40;
      let height = size.height/2;
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();
      var chart = new G2.Chart({
        container: 'mountNode3',
        height: height,
        width: width,
        padding: [40, 0]
      });
      
      chart.source(this.chartData);
      chart.coord('theta', {
        startAngle: Math.PI, // 起始角度
        endAngle: Math.PI * (3 / 2) // 结束角度
      });
      chart.intervalStack().position('value').color('type').label('type');

      chart.render();
    }
  }
}
</script>
