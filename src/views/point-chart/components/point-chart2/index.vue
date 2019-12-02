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
      chart: null,
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
      const { Global } = G2;
      const colorMap = {
        Asia: Global.colors[0],
        Americas: Global.colors[1],
        Europe: Global.colors[2],
        Oceania: Global.colors[3]
      };
       $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json', function(data) {
        const chart = new G2.Chart({
          container: 'mountNode2',
          height: height,
          width: width,
          padding: ['40']
        });
       chart.source(data);
      // 为各个字段设置别名
        chart.scale({
          LifeExpectancy: {
            alias: '人均寿命（年）'
          },
          Population: {
            type: 'pow',
            alias: '人口总数'
          },
          GDP: {
            alias: '人均国内生产总值($)'
          },
          Country: {
            alias: '国家/地区'
          }
        });
        chart.axis('GDP', {
          label: {
            formatter(value) {
              return (value / 1000).toFixed(0) + 'k';
            } // 格式化坐标轴的显示
          }
        });
        chart.tooltip({
          showTitle: false // 不显示默认标题
        });
        chart.legend('Population', false); // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
        chart.point().position('GDP*LifeExpectancy')
        .size('Population', [ 4, 65 ])
        .color('continent', val => {
          return colorMap[val];
        })
        .shape('circle')
        .tooltip('Country*Population*GDP*LifeExpectancy')
        .style('continent', {
          lineWidth: 1,
          strokeOpacity: 1,
          fillOpacity: 0.3,
          opacity: 0.65,
          stroke: val => {
            return colorMap[val];
          }
        });
        chart.render();
      });
    }
  }
}
</script>
