<template>
  <div id="mountNode5"></div>
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
          value: 251,
          type: '大事例一',
          name: '子事例一'
        }, {
          value: 1048,
          type: '大事例一',
          name: '子事例二'
        }, {
          value: 610,
          type: '大事例二',
          name: '子事例三'
        }, {
          value: 434,
          type: '大事例二',
          name: '子事例四'
        }, {
          value: 335,
          type: '大事例三',
          name: '子事例五'
        }, {
          value: 250,
          type: '大事例三',
          name: '子事例六'
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
      let _DataSet = DataSet,
      DataView = _DataSet.DataView;
      let size = this.getViewportSize();
      let width = size.width/2 - 40;
      let height = size.height/2;
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();
      // 通过 DataSet 计算百分比
      var dv = new DataView();
      dv.source(this.chartData).transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent'
      });
      var chart = new G2.Chart({
        container: 'mountNode5',
        height: height,
        width: width,
        padding: 'auto'
      });
      chart.source(dv, {
        percent: {
          formatter: function formatter(val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      chart.coord('theta', {
        radius: 0.5
      });
      chart.tooltip({
        showTitle: false
      });
      chart.legend(false);
      chart.intervalStack().position('percent').color('type').label('type', {
        offset: -10
      }).tooltip('name*percent', function(item, percent) {
        percent = (percent * 100).toFixed(2) + '%';
        return {
          name: item,
          value: percent
        };
      }).select(false).style({
        lineWidth: 1,
        stroke: '#fff'
      });

      var outterView = chart.view();
      var dv1 = new DataView();
      dv1.source(this.chartData).transform({
        type: 'percent',
        field: 'value',
        dimension: 'name',
        as: 'percent'
      });
      outterView.source(dv1, {
        percent: {
          formatter: function formatter(val) {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      outterView.coord('theta', {
        innerRadius: 0.5 / 0.75,
        radius: 0.75
      });
      outterView.intervalStack().position('percent').color('name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4']).label('name').tooltip('name*percent', function(item, percent) {
        percent = (percent * 100).toFixed(2) + '%';
        return {
          name: item,
          value: percent
        };
      }).select(false).style({
        lineWidth: 1,
        stroke: '#fff'
      });

      chart.render();
    }
  }
}
</script>
