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
      chartData: [
        {
          year: '2002',
          value: 10
        }, {
          year: '2003',
          value: 20
        }, {
          year: '2004',
          value: 50
        }, {
          year: '2005',
          value: 40
        }, {
          year: '2006',
          value: 50
        }, {
          year: '2007',
          value: 20
        }, {
          year: '2008',
          value: 25
        }, {
          year: '2009',
          value: 70
        }, {
          year: '2010',
          value: 120
        }, {
          year: '2011',
          value: 140
        }, {
          year: '2012',
          value: 80
        }, {
          year: '2013',
          value: 250
        }, {
          year: '2014',
          value: 280
        }, {
          year: '2015',
          value: 400
        }, {
          year: '2016',
          value: 400
        }, {
          year: '2017',
          value: 800
        }, {
          year: '2018',
          value: 1000
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
        container: 'mountNode2',
        height: height,
        width: width,
        padding: [30,40,50,60]
      });
      var ds = new DataSet();
      var dv = ds.createView().source(this.chartData);
      dv.transform({
        type: 'map',
        callback: function callback(row) {
          row.year = parseInt(row.year);
          return row;
        }
      }).transform({
        type: 'regression',
        method: 'polynomial',
        fields: ['year', 'value'],
        bandwidth: 0.1,
        as: ['Year', 'Value']
      });
      chart.scale('value', {
        alias: '市值 (亿美元)'
      });
      chart.scale('year', {
        type: 'cat'
      });
      chart.scale('Year', {
        range: [0, 1],
        type: 'timeCat'
      });
      chart.axis('year', {
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
      chart.tooltip({
        share: true
      });

      var view1 = chart.view();
      view1.source(this.chartData);
      view1.interval().position('year*value').opacity(1);

      var view2 = chart.view();
      view2.axis(false);
      view2.source(dv);
      view2.line().position('Year*Value').style({
        stroke: '#969696',
        lineDash: [3, 3]
      }).tooltip(false);
      view2.guide().text({
        content: '趋势线',
        position: ['min', 'min'],
        style: {
          fill: '#8c8c8c',
          fontSize: 14,
          fontWeight: 300
        },
        offsetY: -140
      });

      chart.render();
    }
  }
}
</script>
