<template>
  <view class="dashboard" @touchstart="hideTooltip">
    <canvas canvas-id="chart" id="chart" class="chart" @touchstart="touchLineA"></canvas>
  </view>
</template>

<script>
  import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js'
  import request from '../../src/plugins/request.js'
  var _self;
  var canvaLineA = null;
  export default {
    data() {
      return {
        cWidth: '',
        cHeight: '',
        pixelRatio: 1,
      }
    },
    methods: {
      init() {
        _self = this;
        this.cWidth = uni.upx2px(750)
        this.cHeight = uni.upx2px(400)
        this.getServerData();
      },
      getServerData() {
        request({
          url: '/tool/dashboard',
          method: 'post'
        }).then(({
          data: {
            data,
            platforms
          }
        }) => {
          let chartData = {
            categories: [], //横坐标
            series: []
          }
          //生成线
          platforms.forEach(platform => {
            chartData.series.push({
              name: platform.text,
              data: [],
              color: platform.color
            })
          })
          chartData.categories = Array.from(new Set(
              data.map(n => n.date.substring(n.date.indexOf('.') + 1))
            ))
            .filter((n, i) => i < 10)
          data.forEach(item => {
            let platform = platforms.find(n => n.value == item.platform)
            if (platform) {
              let serie = chartData.series.find(n => n.name == platform.text)
              if (serie) {
                serie.data.push(item.count || null)
              }
            }
          })
          canvaLineA = new uCharts({
            $this: _self,
            canvasId: 'chart',
            type: 'area',
            fontSize: 11,
            legend: {
              show: true
            },
            dataLabel: false,
            dataPointShape: true,
            background: '#FFFFFF',
            pixelRatio: 1,
            categories: chartData.categories,
            series: chartData.series,
            animation: true,
            duration: 300,
            dataPointShapeType: 'hollow',
            xAxis: {
              type: 'grid',
              gridColor: '#CCCCCC',
              gridType: 'dash',
              dashLength: 8
            },
            yAxis: {
              gridType: 'dash',
              gridColor: '#CCCCCC',
              dashLength: 8,
              splitNumber: 5,
              min: 10,
              max: 180,
              format: (val) => {
                return val.toFixed(0)
              }
            },
            width: this.cWidth,
            height: this.cHeight,
            extra: {
              area: {
                type: 'curve',
                opacity: 0.8,
                addLine: true,
                width: 1
              }
            }
          });
        })
      },
      touchLineA(e) {
        canvaLineA.showToolTip(e, {
          format: function(item, category) {
            return item.name + ':' + item.data
          }
        })
      },
      hideTooltip(e) {
        if (e.target.id != 'chart') {
          canvaLineA.showToolTip(e, {
            format: function(item, category) {
              return null
            }
          })
        }
      }
    },
    mounted() {
      uni.setNavigationBarTitle({
        title: '终端访问量曲线图'
      })
      this.init()
    }
  }
</script>

<style lang="scss">
  .dashboard {
    height: 100vh;

    .chart {
      width: 100%;
      height: 400rpx;
    }
  }
</style>
