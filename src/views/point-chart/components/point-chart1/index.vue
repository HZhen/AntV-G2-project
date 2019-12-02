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
       $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json', function(data) {
        const chart = new G2.Chart({
          container: 'mountNode1',
          height: height,
          width: width,
          padding: ['40']
        });
        // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
        chart.source(data);
        chart.tooltip({
          showTitle: false,
          crosshairs: {
            type: 'cross'
          },
          itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
            + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
            + '{name}<br/>'
            + '{value}'
            + '</li>'
        });
        chart.point().position('height*weight')
          .color('gender')
          .size(4)
          .opacity(0.65)
          .shape('circle')
          .tooltip('gender*height*weight', (gender, height, weight) => {
            return {
              name: gender,
              value: height + '(cm), ' + weight + '(kg)'
            };
          });
        chart.render();
      });
    }
  }
}
</script>
