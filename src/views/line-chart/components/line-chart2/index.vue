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
      $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json', function(data) {
        var chart = new G2.Chart({
          container: 'mountNode2',
          height: height,
          width: width,
          padding: [120]
        });

        chart.axis('date', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            }
          }
        });
        chart.axis('blockchain', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            }
          }
        });
        chart.axis('nlp', false);
        chart.tooltip({
          crosshairs: false
        });
        chart.legend({
          position: 'top-center'
        });

        chart.source(data, {
          nlp: {
            min: 0,
            max: 100
          },
          blockchain: {
            min: 0,
            max: 100
          }
        });
        chart.line().position('date*blockchain').color('#1890ff');
        chart.line().position('date*nlp').color('#2fc25b');
        chart.guide().dataMarker({
          top: true,
          position: ['2016-02-28', 9],
          lineLength: 30,
          content: 'Blockchain 首超 NLP',
          style: {
            text: {
              textAlign: 'left',
              fontSize: 12,
              stroke: 'white',
              lineWidth: 2,
              fontWeight: 10
            },
            point: {
              stroke: '#2fc25b',
              r: 4
            }
          }
        });
        chart.guide().dataMarker({
          top: true,
          position: ['2017-12-17', 100],
          lineLength: 30,
          content: '2017-12-17, 受比特币影响，\n blockchain搜索热度达到顶峰\n峰值：100',
          style: {
            text: {
              textAlign: 'right',
              fontSize: 12,
              stroke: 'white',
              lineWidth: 2,
              fontWeight: 10
            },
            point: {
              r: 4
            },
            line: {
              stroke: '#A3B1BF',
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
