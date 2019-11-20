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
          city: '中国（北京）',
          type: '首都人口',
          value: 0.01
        }, {
          city: '中国（北京）',
          type: '城市人口',
          value: 0.53
        }, {
          city: '中国（北京）',
          type: '农村人口',
          value: 0.46
        }, {
          city: '美国（华盛顿）',
          type: '首都人口',
          value: 0.01
        }, {
          city: '美国（华盛顿）',
          type: '城市人口',
          value: 0.8
        }, {
          city: '美国（华盛顿）',
          type: '农村人口',
          value: 0.19
        }, {
          city: '印度（德里）',
          type: '首都人口',
          value: 0.02
        }, {
          city: '印度（德里）',
          type: '城市人口',
          value: 0.3
        }, {
          city: '印度（德里）',
          type: '农村人口',
          value: 0.68
        }, {
          city: '俄罗斯（莫斯科）',
          type: '首都人口',
          value: 0.08
        }, {
          city: '俄罗斯（莫斯科）',
          type: '城市人口',
          value: 0.66
        }, {
          city: '俄罗斯（莫斯科）',
          type: '农村人口',
          value: 0.26
        }, {
          city: '法国（巴黎）',
          type: '首都人口',
          value: 0.16
        }, {
          city: '法国（巴黎）',
          type: '城市人口',
          value: 0.63
        }, {
          city: '法国（巴黎）',
          type: '农村人口',
          value: 0.21
        }, {
          city: '韩国（首尔）',
          type: '首都人口',
          value: 0.19
        }, {
          city: '韩国（首尔）',
          type: '城市人口',
          value: 0.63
        }, {
          city: '韩国（首尔）',
          type: '农村人口',
          value: 0.18
        }, {
          city: '丹麦（哥本哈根）',
          type: '首都人口',
          value: 0.22
        }, {
          city: '丹麦（哥本哈根）',
          type: '城市人口',
          value: 0.65
        }, {
          city: '丹麦（哥本哈根）',
          type: '农村人口',
          value: 0.13
        }, {
          city: '冰岛（雷克雅未克）',
          type: '首都人口',
          value: 0.56
        }, {
          city: '冰岛（雷克雅未克）',
          type: '城市人口',
          value: 0.38
        }, {
          city: '冰岛（雷克雅未克）',
          type: '农村人口',
          value: 0.06
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
        container: 'mountNode3',
        height: height,
        width: width,
        padding: [20, 20, 50, 140]
      });
     
      chart.source(this.chartData, {
        value: {
          max: 1.0,
          min: 0.0,
          nice: false,
          alias: '占比（%）'
        }
      });
      chart.axis('city', {
        label: {
          textStyle: {
            fill: '#595959',
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
            fontSize: 14,
            fontWeight: 300
          }
        },
        grid: {
          lineStyle: {
            lineWidth: 0
          }
        }
      });
      chart.legend({
        position: 'top-center'
      });
      chart.coord().transpose();
      chart.intervalStack().position('city*value').color('type*city', function(type, city) {
        var color = void 0;
        if (type === '首都人口') color = '#1890ff';
        if (type === '城市人口') color = '#ced4d9';
        if (type === '农村人口') color = '#f0f2f3';
        if (type === '首都人口' && city === '中国（北京）') color = '#f5222d';
        return color;
      }).size(26).opacity(1).label('value*type', function(val, t) {
        var color = t === "首都人口" ? 'white' : '#47494b';
        if (val < 0.05) {
          return false;
        }
        return {
          position: 'middle',
          offset: 0,
          textStyle: {
            fontSize: 12,
            fill: color,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          }
        };
      });
      chart.render();
    }
  }
}
</script>
