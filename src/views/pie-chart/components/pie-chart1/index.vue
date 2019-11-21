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
          type: '居住',
          value: 7140
        }, {
          type: '食品烟酒',
          value: 3875
        }, {
          type: '交通通信',
          value: 2267
        }, {
          type: '教育、文化、娱乐',
          value: 1853
        }, {
          type: '医疗保健',
          value: 1685
        }, {
          type: '衣着',
          value: 1179
        }, {
          type: '生活用品及服务',
          value: 1088
        }, {
          type: '其他用品及服务',
          value: 583
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
      let startAngle = -Math.PI / 2 - Math.PI / 4;
      let size = this.getViewportSize();
      let width = size.width/2 - 40;
      let height = size.height/2;
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();

      var ds = new DataSet();
      var dv = ds.createView().source(this.chartData);
      dv.transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent'
      });
      var chart = new G2.Chart({
        container: 'mountNode1',
        height: height,
        width: width,
        padding: 'auto'
      });
      chart.source(dv);
      chart.legend(false);
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.5,
        startAngle: startAngle,
        endAngle: startAngle + Math.PI * 2
      });
      chart.intervalStack().position('value').color('type', ['#0a4291', '#0a57b6', '#1373db', '#2295ff', '#48adff', '#6fc3ff', '#96d7ff', '#bde8ff']).opacity(1).label('percent', {
        offset: -20,
        textStyle: {
          fill: 'white',
          fontSize: 12,
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        },
        formatter: function formatter(val) {
          return parseInt(val * 100) + '%';
        }
      });
      chart.guide().html({
        position: ['50%', '50%'],
        html: '<div class="g2-guide-html"><p class="title">总计</p><p class="value">19670</p></div>'
      });
      chart.render();

      //draw label
      var OFFSET = 20;
      var APPEND_OFFSET = 50;
      var LINEHEIGHT = 60;
      var coord = chart.get('coord'); // 获取坐标系对象
      var center = coord.center; // 极坐标圆心坐标
      var r = coord.radius; // 极坐标半径
      var canvas = chart.get('canvas');
      var canvasWidth = chart.get('width');
      var canvasHeight = chart.get('height');
      var labelGroup = canvas.addGroup();
      var labels = [];
      addPieLabel(chart);
      canvas.draw();
      chart.on('afterpaint', function() {
        addPieLabel(chart);
      });
      //main
      function addPieLabel() {
        var halves = [[], []];
        var data = dv.rows;
        var angle = startAngle;

        for (var i = 0; i < data.length; i++) {
          var percent = data[i].percent;
          var targetAngle = angle + Math.PI * 2 * percent;
          var middleAngle = angle + (targetAngle - angle) / 2;
          angle = targetAngle;
          var edgePoint = getEndPoint(center, middleAngle, r);
          var routerPoint = getEndPoint(center, middleAngle, r + OFFSET);
          //label
          var label = {
            _anchor: edgePoint,
            _router: routerPoint,
            _data: data[i],
            x: routerPoint.x,
            y: routerPoint.y,
            r: r + OFFSET,
            fill: '#bfbfbf'
          };
          // 判断文本的方向
          if (edgePoint.x < center.x) {
            label._side = 'left';
            halves[0].push(label);
          } else {
            label._side = 'right';
            halves[1].push(label);
          }
        } // end of for

        var maxCountForOneSide = parseInt(canvasHeight / LINEHEIGHT, 10);
        halves.forEach(function(half, index) {
          // step 2: reduce labels
          if (half.length > maxCountForOneSide) {
            half.sort(function(a, b) {
              return b._percent - a._percent;
            });
            half.splice(maxCountForOneSide, half.length - maxCountForOneSide);
          }

          // step 3: distribute position (x and y)
          half.sort(function(a, b) {
            return a.y - b.y;
          });
          antiCollision(half, index);
        });
      }

      function getEndPoint(center, angle, r) {
        return {
          x: center.x + r * Math.cos(angle),
          y: center.y + r * Math.sin(angle)
        };
      }

      function drawLabel(label) {
        var _anchor = label._anchor,
          _router = label._router,
          fill = label.fill,
          y = label.y;

        var labelAttrs = {
          y: y,
          fontSize: 12, // 字体大小
          fill: '#808080',
          text: label._data.type + '\n' + label._data.value,
          textBaseline: 'bottom'
        };
        var lastPoint = {
          y: y
        };

        if (label._side === 'left') {
          // 具体文本的位置
          lastPoint.x = APPEND_OFFSET;
          labelAttrs.x = APPEND_OFFSET; // 左侧文本左对齐并贴着画布最左侧边缘
          labelAttrs.textAlign = 'left';
        } else {
          lastPoint.x = canvasWidth - APPEND_OFFSET;
          labelAttrs.x = canvasWidth - APPEND_OFFSET; // 右侧文本右对齐并贴着画布最右侧边缘
          labelAttrs.textAlign = 'right';
        }

        // 绘制文本
        var text = labelGroup.addShape('Text', {
          attrs: labelAttrs
        });
        labels.push(text);
        // 绘制连接线
        var points = void 0;
        if (_router.y !== y) {
          // 文本位置做过调整
          points = [[_anchor.x, _anchor.y], [_router.x, y], [lastPoint.x, lastPoint.y]];
        } else {
          points = [[_anchor.x, _anchor.y], [_router.x, _router.y], [lastPoint.x, lastPoint.y]];
        }

        labelGroup.addShape('polyline', {
          attrs: {
            points: points,
            lineWidth: 1,
            stroke: fill
          }
        });
      }

      function antiCollision(half, isRight) {
        var startY = center.y - r - OFFSET - LINEHEIGHT;
        var overlapping = true;
        var totalH = canvasHeight;
        var i = void 0;

        var maxY = 0;
        var minY = Number.MIN_VALUE;
        var boxes = half.map(function(label) {
          var labelY = label.y;
          if (labelY > maxY) {
            maxY = labelY;
          }
          if (labelY < minY) {
            minY = labelY;
          }
          return {
            size: LINEHEIGHT,
            targets: [labelY - startY]
          };
        });
        if (maxY - startY > totalH) {
          totalH = maxY - startY;
        }

        while (overlapping) {
          boxes.forEach(function(box) {
            var target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
            box.pos = Math.min(Math.max(minY, target - box.size / 2), totalH - box.size);
          });

          // detect overlapping and join boxes
          overlapping = false;
          i = boxes.length;
          while (i--) {
            if (i > 0) {
              var previousBox = boxes[i - 1];
              var box = boxes[i];
              if (previousBox.pos + previousBox.size > box.pos) {
                // overlapping
                previousBox.size += box.size;
                previousBox.targets = previousBox.targets.concat(box.targets);

                // overflow, shift up
                if (previousBox.pos + previousBox.size > totalH) {
                  previousBox.pos = totalH - previousBox.size;
                }
                boxes.splice(i, 1); // removing box
                overlapping = true;
              }
            }
          }
        }

        // step 4: normalize y and adjust x
        i = 0;
        boxes.forEach(function(b) {
          var posInCompositeBox = startY; // middle of the label
          b.targets.forEach(function() {
            half[i].y = b.pos + posInCompositeBox + LINEHEIGHT / 2;
            posInCompositeBox += LINEHEIGHT;
            i++;
          });
        });

        // (x - cx)^2 + (y - cy)^2 = totalR^2
        half.forEach(function(label) {
          var rPow2 = label.r * label.r;
          var dyPow2 = Math.pow(Math.abs(label.y - center.y), 2);
          if (rPow2 < dyPow2) {
            label.x = center.x;
          } else {
            var dx = Math.sqrt(rPow2 - dyPow2);
            if (!isRight) {
              // left
              label.x = center.x - dx;
            } else {
              // right
              label.x = center.x + dx;
            }
          }
          drawLabel(label);
        });
      }
    }
  }
}
</script>
<style>
.g2-guide-html {
  width: 100px;
  height: 80px;
  vertical-align: middle;
  text-align: center;
  line-height: 0.4
}

.g2-guide-html .title {
  font-size: 12px;
  color: #8c8c8c;
  font-weight: 300;
}

.g2-guide-html .value {
  font-size: 30px;
  color: #000;
  font-weight: bold;
}
</style>
