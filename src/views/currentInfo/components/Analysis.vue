<template>
  <div>
    <div class="flex items-center p-2 mb-5 navbar">
      <span>监测时间： </span>
      <template
        v-for="(item, index) in buttons"
      >
        <Button
          :key="index"
          size="small"
          class="mr-2"
        >
          {{ item.label }}
        </Button>
      </template>

      <div class="ml-auto">
        <span>数据总量：{{ total }} </span>
        <Button class="ml-5">查看明细</Button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="grid-div col-span-2">
        <Card>
          <p slot="title">
            信息趋势走势图
            <Poptip
              trigger="hover"
              content="已选方案，敏感信息和非敏感信息分时间段的信息参与变化走势。"
              placement="right-end"
            >
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="showNoMessage">
            <no-message />
          </template>
          <template v-else>
            <Spin v-if="attributesSpinShow" size="large" fix />
            <sensitive :chart-data="lineChartData" />
          </template>
        </Card>
      </div>

      <div class="grid-div">
        <Card>
          <p slot="title">
            敏感信息占比
            <Poptip
              trigger="hover"
              content="已选方案所有汇总信息中，敏感信息跟全部信息的所占比例。"
              placement="right-end"
            >
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="showNoMessage">
            <no-message />
          </template>
          <template v-else>
            <Spin v-if="attributesSpinShow" size="large" fix />
            <pie-chart :pie-data="expectedAttributes" />
          </template>
        </Card>
      </div>

      <div class="grid-div">
        <Card>
          <p slot="title">
            信息来源占比
            <Poptip
              trigger="hover"
              content="已选方案所有汇总信息中，信息11个来源占比情况。"
              placement="right-end"
            >
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="showNoMessage">
            <no-message />
          </template>
          <template v-else>
            <Spin v-if="attributesSpinShow" size="large" fix />
            <pie-chart :pie-data="sourceWeb" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Sensitive from '@/components/Sensitive';
import NoMessage from '@/components/NoMessage';
import PieChart from '@/components/PieChart.vue';
import { getPieData } from '@/api/getChartData';

const buttons = [
  { label: '今天', value: 1, isActive: false },
  { label: '24小时', value: 2, isActive: true },
  { label: '2天', value: 1, isActive: false },
  { label: '3天', value: 2, isActive: true },
  { label: '7天', value: 1, isActive: false },
  { label: '自定义', value: 2, isActive: true }
];
export default {
  name: 'Analysis',
  components: {
    Sensitive,
    NoMessage,
    PieChart
  },
  data() {
    return {
      buttons,
      showNoMessage: false,
      attributesSpinShow: false,
      lineChartData: undefined,
      expectedAttributes: undefined,
      sourceWeb: undefined,
      total: 0
    };
  },
  mounted() {
    this.getPieData();
  },
  methods: {
    getPieData() {
      this.attributesSpinShow = true;
      return new Promise((resolve, reject) => {
        const { group_id, id } = this.$route.query;
        getPieData({
          groupId: group_id,
          keywordId: id
        }).then(res => {
          if (!_.isEmpty(res.data)) {
            this.getSourceData(res.data);
            this.$nextTick(() => {
              this.attributesSpinShow = false;
            });
          } else {
            this.showNoMessage = true;
          }
          resolve();
        }).catch(error => {
          this.attributesSpinShow = false;
          this.showNoMessage = true;
          reject(error);
        });
      });
    },
    getAttributes(attributes) {
      const attr = { 1: '非敏感', 2: '中性', 3: '敏感' };
      this.expectedAttributes = {
        title: '敏感信息占比',
        label: attributes.reduce((result, value) => {
          result[attr[value['name']]] = value['value'];
          return result;
        }, {}),
        expectData: attributes.map(el => {
          return Object.assign({}, el, { name: attr[el.name] });
        })
      };
    },
    getSources(source) {
      const web = { 1: '新浪微博' };
      this.sourceWeb = {
        title: '信息来源占比',
        label: source.reduce((result, value) => {
          result[web[value['name']]] = value['value'];
          return result;
        }, {}),
        expectData: source.map(el => {
          return Object.assign({}, el, { name: web[el.name] });
        })
      };

      this.total = _.reduce(source, (result, el) => {
        return result + el['value'];
      }, 0);
    },
    getSourceData({ attributes, sources, attributeCharts } = {}) {
      this.getAttributes(attributes);
      this.getSources(sources);
      this.getAttributeCharts(attributeCharts);
    },
    getAttributeCharts({ neutral, notSensitive, sensitive, hour }) {
      this.lineChartData = {
        neutral,
        notSensitive,
        sensitive,
        hour
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background: #fff;
  height: 44px;
  line-height: 44px;
}
</style>
