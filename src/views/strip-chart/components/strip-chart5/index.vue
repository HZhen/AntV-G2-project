<template>
  <div id="mountNode5"></div>
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
          "question": "问题 1",
          "percent": 0.21
        }, {
          "question": "问题 2",
          "percent": 0.40
        }, {
          "question": "问题 3",
          "percent": 0.49
        }, {
          "question": "问题 4",
          "percent": 0.52
        }, {
          "question": "问题 5",
          "percent": 0.53
        }, {
          "question": "问题 6",
          "percent": 0.84
        }, {
          "question": "问题 7",
          "percent": 1.0
        }, {
          "question": "问题 8",
          "percent": 1.2
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
        container: 'mountNode5',
        height: height,
        width: width,
      });
     
      chart.source(this.chartData, {
        'percent': {
          min: 0,
          max: 2
        }
      });
      chart.tooltip({
        title: 'question'
      });
      chart.legend(false);
      chart.coord('polar', {
        innerRadius: 0.1
      }).transpose();
      chart.interval().position('question*percent').color('percent', '#BAE7FF-#1890FF-#0050B3').tooltip('percent', function(val) {
        return {
          name: '占比',
          value: val * 100 + '%'
        };
      }).label('percent', {
        offset: -5
      });
      this.chartData.map(function(obj) {
        chart.guide().text({
          position: [obj.question, 0],
          content: obj.question + ' ',
          style: {
            textAlign: 'right'
          }
        });
      });
      chart.render();
    }
  }
}
</script>
