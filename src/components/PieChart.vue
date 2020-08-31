<template>
  <div :class="className" :style="{ height:height,width:width }" />
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
      default: '210px'
    },
    pieData: {
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
    pieData: {
      handler(val) {
        this.setOptions(val);
      },
      deep: true
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
      this.setOptions(this.pieData);
    },
    setOptions({ label, expectData, title } = { }) {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '5',
          formatter: function(name) {
            return name + label[name] + '条';
          }
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold',
                align: 'center',
                formatter: '{b}: {d}%'
              }
            },
            data: expectData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
