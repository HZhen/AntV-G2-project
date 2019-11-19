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
      chart: null
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
        var chart = new G2.Chart({
          container: 'mountNode3',
          height: height,
          width: width,
          padding: [120]
        });

        chart.source(data);
        chart.scale({
          carat: {
            alias: '克拉数',
            min: 0,
            max: 4,
            sync: true
          },
          price: {
            alias: '价格',
            sync: true
          }
        });
        chart.point().position('carat*price');

      ['boxcar', 'cosine', 'epanechnikov', 'gaussian', 'quartic', 'triangular', 'tricube', 'triweight', 'uniform'].forEach(function(method, i) {
          var dv = new DataSet.View().source(data);
          dv.transform({
            type: 'kernel-smooth.regression',
            method: method,
            fields: ['carat', 'price'],
            as: ['carat', 'price'],
            bandwidth: 0.5,
            extent: [0, 4]
          });

          var view = chart.view();
          view.axis(false);
          view.source(dv);
          view.line().position('carat*price').color(G2.Global.colors_16[i]);
        });

        chart.render();
      });
    }
  }
}
</script>
