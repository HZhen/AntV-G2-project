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
       $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json', function(data) {
        const chart = new G2.Chart({
          container: 'mountNode3',
          height: height,
          width: width,
          padding: 'auto'
        });
        chart.source(data, {
          type: {
            range: [ 0, 1 ]
          }
        });
        chart.coord('polar');
        chart.legend(false);
        chart.axis('clarity', {
          grid: {
            align: 'center',
            lineStyle: {
              lineDash: [ 0, 0 ]
            }
          }
        });
        chart.pointJitter()
          .position('clarity*type')
          .color('clarity')
          .shape('circle')
          .opacity(0.65);
        chart.render();
      });
    }
  }
}
</script>
