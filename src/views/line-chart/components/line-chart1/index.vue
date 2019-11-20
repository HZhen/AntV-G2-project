<template>
  <div id="mountNode1"></div>
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
      let width = size.width/2 -40;
      let height = size.height/2;
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();
      $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/siteUV.json', function(data) {
        var chart = new G2.Chart({
          container: 'mountNode1',
          height: height,
          width: width,
          padding: [60,120,60,60]
        });
        var ds = new DataSet();
        var dv = ds.createView().source(data);
        dv.transform({
          type: 'map',
          callback: function callback(row) {
            var times = row.Time.split(' ');
            row.date = times[0];
            row.time = times[1];
            return row;
          }
        });
        chart.axis('time', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            }
          }
        });
        chart.axis('Count', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            },
            formatter: function formatter(text) {
              return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            }
          }
        });
        chart.tooltip({
          crosshairs: false
        });
        chart.legend({
          attachLast: true
        });
        chart.source(dv, {
          time: {
            tickCount: 12
          },
          date: {
            type: 'cat'
          }
        });
        chart.line().position('time*Count').color('date', ['#d9d9d9', '#1890ff']);
        chart.guide().dataMarker({
          position: ['13:00', 0],
          lineLength: 30,
          content: '服务器宕机\n低值：0',
          style: {
            text: {
              textAlign: 'left',
              fontSize: 12,
              stroke: 'white',
              lineWidth: 2
            }
          }
        });
        chart.guide().dataMarker({
          position: ['14:00', 4180],
          lineLength: 20,
          content: '宕机导致服务积压，恢复后达峰值\n高值：4108',
          style: {
            text: {
              textAlign: 'left',
              fontSize: 12,
              stroke: 'white',
              lineWidth: 2
            }
          }
        });
        chart.render();
      });
    }
  }
}
</script>
