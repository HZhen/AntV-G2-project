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
          type: '收纳',
          value: 340,
          cat: '办公用品'
        }, {
          type: '笔',
          value: 20760,
          cat: '办公用品'
        }, {
          type: '纸张',
          value: 28750,
          cat: '办公用品'
        }, {
          type: '配件',
          value: 4090,
          cat: '技术'
        }, {
          type: '电话',
          value: 9880,
          cat: '技术'
        }, {
          type: '复印机',
          value: 40988,
          cat: '技术'
        }, {
          type: '桌子',
          value: 14870,
          cat: '家具'
        }, {
          type: '椅子',
          value: 37098,
          cat: '家具'
        }, {
          type: '书架',
          value: 49099,
          cat: '家具'
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
        padding: [20, 0, 50, 80]
      });
     
      chart.source(this.chartData, {
        value: {
          max: 55000,
          min: 0,
          nice: false,
          alias: '金额（元）'
        }
      });
      chart.axis('type', {
        label: {
          textStyle: {
            fill: '#8d8d8d',
            fontSize: 12
          }
        },
        tickLine: {
          alignWithLabel: false,
          length: 0
        },
        line: {
          lineWidth: 0
        }
      });
      chart.axis('value', {
        label: null,
        title: {
          offset: 30,
          textStyle: {
            fontSize: 12,
            fontWeight: 300
          }
        },
        grid: {
          lineStyle: {
            lineWidth: 0
          }
        }
      });
      chart.legend(false);
      chart.coord().transpose();
      chart.interval().position('type*value').color('cat', ['#face1d', '#37c461', '#2194ff']).size(26).opacity(1).label('value', {
        textStyle: {
          fill: '#8d8d8d'
        },
        offset: 10,
        formatter: function formatter(text) {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
      });
      //guide
      chart.guide().text({
        top: true,
        position: ['椅子', 'min'],
        content: '家具',
        style: {
          fill: '#c0c0c0', // 文本颜色
          fontSize: 12, // 文本大小
          fontWeight: '300',
          textAlign: 'center',
          rotate: -90
        },
        offsetX: -70
      });
      chart.guide().text({
        top: true,
        position: ['电话', 'min'],
        content: '技术',
        style: {
          fill: '#c0c0c0', // 文本颜色
          fontSize: 12, // 文本大小
          fontWeight: '300',
          textAlign: 'center',
          rotate: -90
        },
        offsetX: -70
      });
      chart.guide().text({
        top: true,
        position: ['笔', 'min'],
        content: '办公用品',
        style: {
          fill: '#c0c0c0', // 文本颜色
          fontSize: 12, // 文本大小
          fontWeight: '300',
          textAlign: 'center',
          rotate: -90
        },
        offsetX: -70
      });
      chart.guide().line({
        start: ['-20%', '33.2%'],
        end: ['100%', '33.2%'],
        lineStyle: {
          stroke: '#c0c0c0',
          lineDash: [2, 2]
        }
      });
      chart.guide().line({
        start: ['-20%', '66.8%'],
        end: ['100%', '66.8%'],
        lineStyle: {
          stroke: '#c0c0c0',
          lineDash: [2, 2]
        }
      });
      chart.render();
    }
  }
}
</script>
