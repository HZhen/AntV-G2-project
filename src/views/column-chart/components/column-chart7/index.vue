<template>
  <div id="mountNode7"></div>
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
        var ds = new DataSet();
        var dv = ds.createView().source(data);
        dv.transform({
          type: 'bin.histogram',
          field: 'depth',
          binWidth: 1,
          groupBy: ['cut'],
          as: ['depth', 'count']
        });
        var chart = new G2.Chart({
          container: 'mountNode7',
          height: height,
          width: width,
        });
        chart.source(dv);
        chart.tooltip({
          crosshairs: false,
          position: 'top'
        });
        chart.intervalStack().position('depth*count').color('cut');
        chart.render();
      });
    }
  }
}
</script>
