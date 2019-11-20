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
          city: '石家庄',
          type: '水果',
          value: 14500
        }, {
          city: '石家庄',
          type: '米面',
          value: 8500
        }, {
          city: '石家庄',
          type: '特产零食',
          value: 10000
        }, {
          city: '石家庄',
          type: '茶叶',
          value: 7000
        }, {
          city: '深圳',
          type: '水果',
          value: 9000
        }, {
          city: '深圳',
          type: '米面',
          value: 8500
        }, {
          city: '深圳',
          type: '特产零食',
          value: 11000
        }, {
          city: '深圳',
          type: '茶叶',
          value: 6000
        }, {
          city: '温州',
          type: '水果',
          value: 16000
        }, {
          city: '温州',
          type: '米面',
          value: 5000
        }, {
          city: '温州',
          type: '特产零食',
          value: 6000
        }, {
          city: '温州',
          type: '茶叶',
          value: 10000
        }, {
          city: '宁波',
          type: '水果',
          value: 14000
        }, {
          city: '宁波',
          type: '米面',
          value: 9000
        }, {
          city: '宁波',
          type: '特产零食',
          value: 10000
        }, {
          city: '宁波',
          type: '茶叶',
          value: 9000
        }, {
          city: '无锡',
          type: '水果',
          value: 14000
        }, {
          city: '无锡',
          type: '米面',
          value: 9000
        }, {
          city: '无锡',
          type: '特产零食',
          value: 10000
        }, {
          city: '无锡',
          type: '茶叶',
          value: 6000
        }, {
          city: '杭州',
          type: '水果',
          value: 9000
        }, {
          city: '杭州',
          type: '米面',
          value: 8500
        }, {
          city: '杭州',
          type: '特产零食',
          value: 10000
        }, {
          city: '杭州',
          type: '茶叶',
          value: 6000
        }, {
          city: '北京',
          type: '水果',
          value: 17000
        }, {
          city: '北京',
          type: '米面',
          value: 6000
        }, {
          city: '北京',
          type: '特产零食',
          value: 7000
        }, {
          city: '北京',
          type: '茶叶',
          value: 10000
        }, {
          city: '上海',
          type: '水果',
          value: 18000
        }, {
          city: '上海',
          type: '米面',
          value: 11000
        }, {
          city: '上海',
          type: '特产零食',
          value: 15000
        }, {
          city: '上海',
          type: '茶叶',
          value: 14000
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
        padding: [0, 120, 20, 52]
      });
      chart.source(this.chartData, {
        value: {
          max: 20000,
          min: 0.0,
          nice: false,
          alias: '销售额（万）'
        }
      });
      chart.axis('city', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
            fontSize: 12
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
            fill: '#aaaaaa',
            fontSize: 12
          }
        },
        title: {
          offset: 30,
          textStyle: {
            fontSize: 14,
            fontWeight: 300
          }
        }
      });
      chart.legend({
        position: 'right-bottom'
      });
      chart.coord().transpose();
      chart.interval().position('city*value').color('type').opacity(1).adjust([{
        type: 'dodge',
        marginRatio: 0.3
      }]);
      chart.render();
    }
  }
}
</script>
