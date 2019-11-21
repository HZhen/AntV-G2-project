<template>
  <div id="mountNode4"></div>
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
          location: '三亚',
          value: 44.9
        }, {
          location: '千岛湖',
          value: 19.7
        }, {
          location: '柬埔寨',
          value: 17.3
        }, {
          location: '呼伦贝尔',
          value: 14.4
        }, {
          location: '苏梅岛',
          value: 2.5
        }, {
          location: '塞班岛',
          value: 2.5
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
        container: 'mountNode4',
        height: height,
        width: width,
        padding: 'auto'
      });
      chart.source(this.chartData);
      chart.legend({
        position: 'right-center',
        offsetX: -100
      });
      chart.coord('theta', {
        radius: 0.75
      });
      chart.intervalStack().position('value').color('location', ['#1890ff', '#37c661', '#fbce1e', '#2b3b79', '#8a4be2', '#1dc5c5']).style({
        stroke: 'white',
        lineWidth: 1
      }).label('value', function(val) {
        if (val < 3) {
          return null;
        } else {
          return {
            offset: -30,
            textStyle: {
              fill: 'white',
              fontSize: 14,
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)'
            },
            formatter: function formatter(text) {
              return text + '%';
            }
          };
        }
      });
      chart.render();
    }
  }
}
</script>
