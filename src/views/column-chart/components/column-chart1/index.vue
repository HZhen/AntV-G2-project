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
      chart: null,
      chartData: [
        {
          type: '书架',
          value: 48000,
          cat: '家具'
        }, {
          type: '椅子',
          value: 36000,
          cat: '家具'
        }, {
          type: '桌子',
          value: 9000,
          cat: '家具'
        }, {
          type: '复印机',
          value: 30500,
          cat: '技术'
        }, {
          type: '电话',
          value: 22000,
          cat: '技术'
        }, {
          type: '配件',
          value: 12000,
          cat: '技术'
        }, {
          type: '纸张',
          value: 25000,
          cat: '办公用品'
        }, {
          type: '笔',
          value: 17000,
          cat: '办公用品'
        }, {
          type: '美术',
          value: 8000,
          cat: '办公用品'
        }, {
          type: '收纳',
          value: 2000,
          cat: '办公用品'
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
        container: 'mountNode1',
        height: height,
        width: width,
        padding: 'auto'
      });
      chart.source(this.chartData);
      chart.scale('value', {
        alias: '占比（%）'
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
      chart.legend(false);
      chart.interval().position('type*value').color('cat').opacity(1);
      //guide
      chart.guide().text({
        top: true,
        position: ['椅子', 'min'],
        content: '家具',
        style: {
          fill: '#c0c0c0', // 文本颜色
          fontSize: 12, // 文本大小
          fontWeight: '300',
          textAlign: 'center'
        },
        offsetY: 40
      });
      chart.guide().text({
        top: true,
        position: ['电话', 'min'],
        content: '技术',
        style: {
          fill: '#c0c0c0', // 文本颜色
          fontSize: 12, // 文本大小
          fontWeight: '300',
          textAlign: 'center'
        },
        offsetY: 40
      });
      chart.guide().text({
        top: true,
        position: ['笔', 'min'],
        content: '办公用品',
        style: {
          fill: '#c0c0c0', // 文本颜色
          fontSize: 12, // 文本大小
          fontWeight: '300'
        },
        offsetY: 40,
        offsetX: 20
      });
      chart.guide().line({
        start: ['30%', '100%'],
        end: ['30%', '120%'],
        lineStyle: {
          stroke: '#d9d9d9',
          lineDash: [0, 0]
        }
      });
      chart.guide().line({
        start: ['60%', '100%'],
        end: ['60%', '120%'],
        lineStyle: {
          stroke: '#d9d9d9',
          lineDash: [0, 0]
        }
      });
      chart.render();
    }
  }
}
</script>
