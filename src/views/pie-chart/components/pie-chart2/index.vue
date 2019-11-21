<template>
  <div id="mountNode2"></div>
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
          year: '2001',
          population: 41.8
        }, {
          year: '2002',
          population: 38
        }, {
          year: '2003',
          population: 33.7
        }, {
          year: '2004',
          population: 30.7
        }, {
          year: '2005',
          population: 25.8
        }, {
          year: '2006',
          population: 31.7
        }, {
          year: '2007',
          population: 33
        }, {
          year: '2008',
          population: 46
        }, {
          year: '2009',
          population: 38.3
        }, {
          year: '2010',
          population: 28
        }, {
          year: '2011',
          population: 42.5
        }, {
          year: '2012',
          population: 30.3
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
        container: 'mountNode2',
        height: height,
        width: width,
      });
      chart.source(this.chartData);
      chart.coord('polar', {
        innerRadius: 0.2
      });
      chart.legend({
        position: 'right',
        offsetY: -window.innerHeight / 2 + 180,
        offsetX: -140
      });
      chart.axis(false);
      chart.interval().position('year*population').color('year', G2.Global.colors_pie_16).style({
        lineWidth: 1,
        stroke: '#fff'
      });
      chart.render();
    }
  }
}
</script>
