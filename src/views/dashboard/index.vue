<template>
  <div>
    <div class="page-label flex">
      <span style="padding-left: 6px">
        尊敬的用户，您本次登录时间为 <span style="color: #F57676"> {{ loginData.time }} </span>，
        本次已登陆 <span style="color: #F57676">{{ loginData.duration }}</span> 小时，
        24小时内共为您监测信息 <span style="color: #F57676"> {{ loginData.total }} </span>条。
      </span>
      <div class="ml-auto mr-5 setting-icon">
        <span class="iconfont icon-icon-test5 cursor-pointer" @click="handleSetting" />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div class="grid-div">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            账号详情
          </p>
          <UserInfo />
        </Card>
      </div>
      <div class="grid-div">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
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
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
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
      <div class="grid-div row-span-2">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            预警详情
            <Poptip trigger="hover" content="已选方案，已发预警列表。" placement="right-end">
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="showNoMessage">
            <no-message />
          </template>
          <template v-else>
            <warning-list />
          </template>
        </Card>
      </div>

      <div class="grid-div row-span-2">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            方案
            <Poptip trigger="hover" content="已选方案中，24小时内信息量。" placement="right-end">
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <!-- 方案未完成 -->
          <template v-if="showNoMessage">
            <no-message />
          </template>
          <template v-else>
            <project-list />
          </template>
        </Card>
      </div>
      <div class="grid-div col-span-2">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            信息趋势走势图
            <Poptip trigger="hover" content="已选方案，敏感信息和非敏感信息分时间段的信息参与变化走势。" placement="right-end">
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
      <div class="grid-div col-span-2">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            实时数据
            <Poptip trigger="hover" content="已选方案，按相似文章合并，降序显示最热门的信息。" placement="right-end">
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="false">
            <project-list />
          </template>
          <template v-else>
            <no-message />
          </template>
        </Card>
      </div>

      <div class="grid-div">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            敏感信息
            <Poptip trigger="hover" content="汇总已选方案下的24小时敏感信息列表。" placement="right-end">
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="false">
            <project-list />
          </template>
          <template v-else>
            <no-message />
          </template>
        </Card>
      </div>
    </div>

    <Modal v-model="projectSelected" title="方案选择">
      <div>
        <span>选择显示监测方案，当前有5个监测方案，您最多选择10个监测方案显示</span>
      </div>
      这里是个穿梭框
    </Modal>
  </div>
</template>

<script>
import UserInfo from '@/views/dashboard/components/UserInfo';
import Sensitive from '@/components/Sensitive';
import PieChart from '@/components/PieChart.vue';
import ProjectList from '@/views/dashboard/components/ProjectList';
import WarningList from '@/views/dashboard/components/WarningList';
import NoMessage from '@/components/NoMessage';
import { getLoginInfo } from './api';
import { getPieData } from '@/api/getChartData';
import { changeKeyNames } from '@/utils/changeKeyName';

export default {
  name: 'Dashboard',
  components: {
    UserInfo,
    Sensitive,
    PieChart,
    ProjectList,
    WarningList,
    NoMessage
  },
  data() {
    return {
      projectSelected: false,
      showNoMessage: false,
      attributesSpinShow: true,
      loginData: {},
      expectedAttributes: undefined,
      sourceWeb: undefined,
      lineChartData: undefined
    };
  },
  mounted() {
    this.getLoginInfo();
    this.getPieData();
  },
  methods: {
    async getLoginInfo() {
      getLoginInfo().then(res => {
        if (res.state === 1) {
          const {
            loginTime: time,
            LoginDuration: duration,
            articleTotal: total } = res.data;

          this.loginData = {
            time,
            duration,
            total
          };
        }
      });
    },
    async getPieData() {
      await getPieData({}).then(res => {
        this.attributesSpinShow = true;
        if (!_.isEmpty(res.data)) {
          this.$nextTick(() => {
            this.getSourceData(res.data);
            this.attributesSpinShow = false;
          });
        } else {
          this.showNoMessage = true;
        }
      });
    },
    handleSetting() {
      this.projectSelected = true;
    },
    getSourceData({ attributes, sources, attributeCharts } = {}) {
      this.getAttributes(attributes);
      this.getSources(sources);
      this.getAttributeCharts(attributeCharts);
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
.page-label {
  margin-bottom: 10px;
  height: 32px;
  line-height: 32px;
  background: #dcf8f8;
  color: #04cb94;
}
.widget-container {
  padding: 10px 0;
}
.grid-div {
  position: relative;
  overflow: hidden;
  .ivu-card {
    height: 100%;
  }
}
.setting-icon {
  background-color: #3fc3e3;
  color: #fff;
  padding: 2px;
  border-radius: 2px;
  transition: all .2s;
}
</style>
