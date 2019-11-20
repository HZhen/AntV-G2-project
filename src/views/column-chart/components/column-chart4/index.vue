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
          company: 'Apple',
          type: '整体',
          value: 30
        }, {
          company: 'Facebook',
          type: '整体',
          value: 35
        }, {
          company: 'Google',
          type: '整体',
          value: 28
        }, {
          company: 'Apple',
          type: '非技术岗',
          value: 40
        }, {
          company: 'Facebook',
          type: '非技术岗',
          value: 65
        }, {
          company: 'Google',
          type: '非技术岗',
          value: 47
        }, {
          company: 'Apple',
          type: '技术岗',
          value: 23
        }, {
          company: 'Facebook',
          type: '技术岗',
          value: 18
        }, {
          company: 'Google',
          type: '技术岗',
          value: 20
        }, {
          company: 'Apple',
          type: '技术岗',
          value: 35
        }, {
          company: 'Facebook',
          type: '技术岗',
          value: 30
        }, {
          company: 'Google',
          type: '技术岗',
          value: 25
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
      chart.scale('value', {
        alias: '占比（%）',
        max: 75,
        min: 0,
        tickCount: 4
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
          }
        },
        title: {
          offset: 50
        }
      });
      chart.legend({
        position: 'top-center'
      });
      chart.interval().position('type*value').color('company').opacity(1).adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
      chart.render();
    }
  }
}
</script>
