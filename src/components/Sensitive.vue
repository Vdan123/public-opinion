<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '190px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData);
    },
    setOptions({ neutral, notSensitive, sensitive, hour } = {}) {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: hour,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['敏感', '中性', '非敏感']
        },
        series: [{
          name: '敏感', itemStyle: {
            normal: {
              color: '#f57676',
              lineStyle: {
                color: '#f57676',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: sensitive,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '中性',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#f6da76',
              lineStyle: {
                color: '#f6da76',
                width: 2
              }
            }
          },
          data: neutral,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '非敏感',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#70c4f5',
              lineStyle: {
                color: '#70c4f5',
                width: 2
              }
            }
          },
          data: notSensitive,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      });
    }
  }
};
</script>
