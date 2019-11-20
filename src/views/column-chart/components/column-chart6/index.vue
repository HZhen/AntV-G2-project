<template>
  <div id="mountNode6"></div>
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
          year: '2000',
          '类型 A': 21.0,
          '类型 B': 16,
          '类型 C': 8
        }, {
          year: '2001',
          '类型 A': 25.0,
          '类型 B': 16,
          '类型 C': 8
        }, {
          year: '2002',
          '类型 A': 25.0,
          '类型 B': 15,
          '类型 C': 8
        }, {
          year: '2003',
          '类型 A': 25.0,
          '类型 B': 14,
          '类型 C': 7
        }, {
          year: '2004',
          '类型 A': 25.0,
          '类型 B': 14,
          '类型 C': 7
        }, {
          year: '2005',
          '类型 A': 24.0,
          '类型 B': 13,
          '类型 C': 8
        }, {
          year: '2006',
          '类型 A': 24.0,
          '类型 B': 14,
          '类型 C': 7
        }, {
          year: '2007',
          '类型 A': 26.0,
          '类型 B': 16,
          '类型 C': 7
        }, {
          year: '2008',
          '类型 A': 26.0,
          '类型 B': 15.2,
          '类型 C': 8
        }, {
          year: '2009',
          '类型 A': 27.1,
          '类型 B': 15.2,
          '类型 C': 10
        }, {
          year: '2010',
          '类型 A': 27.5,
          '类型 B': 15.4,
          '类型 C': 8
        }, {
          year: '2011',
          '类型 A': 26.4,
          '类型 B': 15.2,
          '类型 C': 9
        }, {
          year: '2012',
          '类型 A': 28.8,
          '类型 B': 15.4,
          '类型 C': 9
        }, {
          year: '2013',
          '类型 A': 33.3,
          '类型 B': 16.7,
          '类型 C': 12
        }, {
          year: '2014',
          '类型 A': 38.2,
          '类型 B': 19.5,
          '类型 C': 18
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
      var _DataSet = DataSet,
      DataView = _DataSet.DataView;

      var dv = new DataView();
      dv.source(this.chartData).transform({
        type: 'fold',
        fields: ['类型 A', '类型 B', '类型 C'],
        key: '难民类型',
        value: 'count',
        remains: 'year'
      });

      var chart = new G2.Chart({
        container: 'mountNode6',
        height: height,
        width: width,
        padding: [30, 70, 70, 50]
      });
      chart.source(dv);
      chart.coord('polar', {
        inner: 0.1
      });
      chart.legend('难民类型', {
        position: 'bottom'
      });
      chart.intervalStack().position('year*count').color('难民类型').style({
        lineWidth: 1,
        stroke: '#fff'
      });
      chart.render();
    }
  }
}
</script>
