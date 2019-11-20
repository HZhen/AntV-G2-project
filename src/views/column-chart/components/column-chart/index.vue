<template>
  <div id="mountNode"></div>
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
          type: '家具家电',
          value: 34000
        }, {
          type: '粮油副食',
          value: 25000
        }, {
          type: '生鲜水果',
          value: 11000
        }, {
          type: '美容洗护',
          value: 9000
        }, {
          type: '母婴用品',
          value: 7000
        }, {
          type: '进口食品',
          value: 6000
        }, {
          type: '食品饮料',
          value: 4800
        }, {
          type: '家庭清洁',
          value: 500
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
        container: 'mountNode',
        height: height,
        width: width,
        padding: [20, 20, 30, 90]
      });
      chart.source(this.chartData, {
        value: {
          tickCount: 5
        }
      });
      chart.scale('value', {
        alias: '销售额(万)'
      });
      chart.axis('type', {
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
        label: {
          textStyle: {
            fill: '#aaaaaa'
          },
          formatter: function formatter(text) {
            return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
          }
        },
        title: {
          offset: 70
        }
      });
      chart.tooltip({
        share: true
      });
      chart.guide().dataMarker({
        top: true,
        content: '因政策调整导致销量下滑',
        position: ['2014-01', 1750],
        style: {
          text: {
            fontSize: 13
          }
        },
        lineLength: 30
      });
      chart.interval().position('type*value').opacity(1);
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
