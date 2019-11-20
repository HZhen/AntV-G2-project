<template>
  <div id="mountNode"></div>
</template>
<script>
import G2 from '@antv/g2'
export default {
  name:'',
  data () {
    return {
      chart: null,
      width: '',
      height: ''
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
      let width = size.width/2 -40;
      let height = size.height/2;
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();
      var TICKS = ["2012-09", "2013-05", "2014-01", "2014-09", "2015-05", "2016-01", "2016-09", "2017-05", "2018-02"];
      $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/salesTrend.json', function(data) {
        var chart = new G2.Chart({
          container: 'mountNode',
          width: width,
          height: height,
          padding: [40]
        });
        chart.source(data, {
          date: {
            ticks: TICKS
          }
        });
        chart.legend(false);
        chart.axis('buyin', false);
        chart.axis('date', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            }
          }
        });
        chart.line().position('date*buyin');
        chart.point().position('date*buyin').size('date', function(val) {
          if (TICKS.indexOf(val) >= 0) {
            return 3;
          }
          return 0;
        }).label('date*buyin', function(date, buyin) {
          if (TICKS.indexOf(date) >= 0) {
            return buyin + '万';
          }
          return '';
        }, {
          textStyle: {
            fill: '#7a7a7a',
            fontSize: 12,
            stroke: 'white',
            lineWidth: 2,
            fontWeight: 300
          }
        }).style({
          lineWidth: 2
        });

        chart.guide().line({
          top: true,
          start: ['2012-09', 5396],
          end: ['2018-02', 5396],
          lineStyle: {
            stroke: '#595959',
            lineWidth: 1,
            lineDash: [3, 3]
          },
          text: {
            position: 'start',
            style: {
              fill: '#8c8c8c',
              fontSize: 12,
              fontWeight: 300
            },
            content: '均值线 5,396万',
            offsetY: -5
          }
        });
        chart.render();
      });
    },
  }
}
</script>
