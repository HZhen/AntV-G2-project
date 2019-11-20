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
          name: '绝云',
          value: 2254
        }, {
          name: '米法',
          value: 2108
        }, {
          name: '再飞',
          value: 1780
        }, {
          name: '青湳',
          value: 1463
        }, {
          name: '有田',
          value: 1233
        }, {
          name: '十吾',
          value: 1180
        }, {
          name: '象数',
          value: 798
        }, {
          name: '顾倾',
          value: 372
        }, {
          name: '画康',
          value: 243
        }, {
          name: '完白',
          value: 176
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
      let sortType = 'positive'
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
        padding: [20, 40, 50, 40]
      });
      chart.source(this.chartData);
      chart.scale('value', {
        alias: '行数(万)'
      });
      chart.axis('name', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        },
        tickLine: {
          alignWithLabel: false,
          length: 0
        }
      });
      chart.axis('value', {
        label: null,
        title: {
          offset: 30
        }
      });
      chart.legend(false);
      chart.interval().position('name*value').opacity(1).label('value', {
        textStyle: function textStyle(val) {
          var value = parseInt(val);
          var style = {
            fill: '#595959',
            fontWeight: 'normal',
            fontSize: 12
          };
          if (value > 1440) {
            style.fontWeight = 'bold';
          }
          return style;
        },
        offset: 2
      });
      chart.guide().regionFilter({
        top: true,
        start: ['start', 'max'],
        end: ['end', 1440],
        color: '#FF4D4F'
      });
      chart.guide().line({
        top: true,
        start: ['start', 1440],
        end: ['end', 1440],
        lineStyle: {
          stroke: '#595959',
          lineWidth: 1,
          lineDash: [3, 3]
        },
        text: {
          position: 'start',
          style: {
            fill: '#595959',
            fontSize: 12,
            fontWeight: 300
          },
          content: '公司平均 14,40',
          offsetY: -5
        }
      });
      chart.render();
      $('.sort-button').click(function() {
        sortType = sortType === 'positive' ? 'negative' : 'positive';
        this.sortData(sortType);
        chart.repaint();
      });
    },
    sortData(sortType) {
      if (sortType === 'positive') {
        this.chartData.sort(function(a, b) {
          return b.value - a.value;
        });
      } else {
        this.chartData.sort(function(a, b) {
          return a.value - b.value;
        });
      }
    }
  }
}
</script>
