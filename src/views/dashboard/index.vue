<template>
  <div>
    <div class="page-label flex">
      <span style="padding-left: 6px">
        尊敬的用户，您本次登录时间为 <span style="color: #F57676"> {{ loginData.time }} </span>，
        本次已登陆 <span style="color: #F57676">{{ loginData.duration }}</span> 小时，
        24小时内共为您监测信息 <span style="color: #F57676"> {{ loginData.total }} </span>条。
        <span style="color: #F57676"> {{ totalTime }}s </span>后此列表将自动刷新。
      </span>
      <div class="ml-auto mr-5 setting-icon">
        <span class="iconfont icon-icon-test5 cursor-pointer" @click="handleSetting" />
      </div>
    </div>
    <div class="grid grid-cols-5 gap-2">
      <div class="grid-div">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            账号详情
          </p>
          <UserInfo />
        </Card>
      </div>

      <div class="grid-div col-span-3">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            预警详情
            <Poptip trigger="hover" content="已选方案，已发预警列表。" placement="right-end">
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="warningMessage.length === 0">
            <no-message />
          </template>
          <template v-else>
            <swiper :swiper-list="warningMessage" :warning="true" />
          </template>
        </Card>
      </div>

      <div class="grid-div">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            方案
            <Poptip trigger="hover" content="已选方案中，24小时内信息量。" placement="right-end">
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="showNoMessageProject">
            <no-message />
          </template>
          <template v-else>
            <Spin v-if="projectSpinShow" size="large" fix />
            <project-list
              :project-list="projectCount"
              :total-count="totalCount"
            />
          </template>
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

      <div class="grid-div col-span-3">
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
            敏感信息
            <Poptip trigger="hover" content="汇总已选方案下的24小时敏感信息列表。" placement="right-end">
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <Spin v-if="sensitiveSpinShow" size="large" fix />
          <template v-if="sensitiveState">
            <no-message />
          </template>
          <template>
            <swiper :swiper-list="sensitiveMessage" :sensitive="true" />
          </template>
        </Card>
      </div>

      <div class="grid-div col-span-3">
        <Card class="hover:border-teal-400 border-2 shadow-widget border-opacity-100">
          <p slot="title">
            实时数据
            <Poptip trigger="hover" content="已选方案，按相似文章合并，降序显示最热门的信息。" placement="right-end">
              <span class="iconfont icon-icon-test11" />
            </Poptip>
          </p>
          <template v-if="realTimeState">
            <no-message />
          </template>
          <template v-else>
            <Spin v-if="currentSpinShow" size="large" fix />
            <swiper :swiper-list="currentMessage" />
          </template>
        </Card>
      </div>
    </div>

    <Modal v-model="projectSelected" title="方案选择">
      <div>
        <span>选择显示监测方案，当前有5个监测方案，您最多选择10个监测方案显示</span>
      </div>
    </Modal>
  </div>
</template>

<script>
import UserInfo from '@/views/dashboard/components/UserInfo';
import Sensitive from '@/components/Sensitive';
import NoMessage from '@/components/NoMessage';
import PieChart from '@/components/PieChart.vue';
import Swiper from '@/components/Swiper';

import ProjectList from './components/ProjectList';

import { getLoginInfo,
  getPlanTotal,
  getZXMinGanInfoList,
  getRealTimeDataList
} from './api';
import { getPieData } from '@/api/getChartData';

export default {
  name: 'Dashboard',
  components: {
    UserInfo,
    Sensitive,
    PieChart,
    ProjectList,
    NoMessage,
    Swiper
  },
  data() {
    return {
      projectSelected: false,
      showNoMessage: false,
      showNoMessageProject: false,
      attributesSpinShow: false,
      projectSpinShow: false,
      currentSpinShow: false,
      sensitiveSpinShow: false,

      realTimeState: false,
      sensitiveState: false,

      loginData: {},
      expectedAttributes: undefined,
      sourceWeb: undefined,
      lineChartData: undefined,
      projectCount: undefined,
      totalCount: undefined,
      currentMessage: undefined,
      sensitiveMessage: undefined,
      startVal: 0,
      endVal: 2020,
      totalTime: 60
    };
  },
  computed: {
    warningMessage() {
      return this.$store.state.notice.warningList;
    }
  },
  mounted() {
    this.getLoginInfo();

    Promise.race([
      this.getPieData(),
      this.getPlanTotal(),
      this.getZXMinGanInfoList(),
      this.getRealTimeDataList(),
      this.getWarningInfo()
    ]);
    this.timer = window.setInterval(() => {
      this.totalTime--;
      if (this.totalTime < 0) {
        this.totalTime = 60;
      }
    }, 1000);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
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

    getPieData() {
      this.attributesSpinShow = true;
      return new Promise((resolve, reject) => {
        getPieData({}).then(res => {
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

    getPlanTotal() {
      this.projectSpinShow = true;
      return new Promise((resolve, reject) => {
        getPlanTotal({}).then(res => {
          this.$nextTick(() => {
            this.projectSpinShow = false;
          });
          if (_.isEmpty(res.data)) {
            this.showNoMessageProject = true;
            return;
          }
          this.projectCount = res.data;
          this.totalCount = _.reduce(res.data, (result, value) => {
            return result + value['total'];
          }, 0);

          resolve();
        }).catch(error => {
          this.projectSpinShow = false;
          reject(error);
        });
      });
    },

    getZXMinGanInfoList() {
      this.sensitiveSpinShow = true;
      return new Promise((resolve, reject) => {
        getZXMinGanInfoList({}).then(res => {
          this.sensitiveSpinShow = false;

          if (_.isEmpty(res.data)) {
            this.sensitiveState = true;
            return;
          }
          this.sensitiveMessage = res.data;
          resolve();
        }).catch(error => {
          this.sensitiveSpinShow = false;
          reject(error);
        });
      });
    },

    getRealTimeDataList() {
      this.currentSpinShow = true;
      return new Promise((resolve, reject) => {
        getRealTimeDataList({}).then(res => {
          this.realTimeState = res.data.length === 0;
          this.currentMessage = res.data;
          this.currentSpinShow = false;
          resolve();
        }).catch(error => {
          this.currentSpinShow = false;
          reject(error);
        });
      });
    },

    async getWarningInfo() {
      await this.$store.dispatch('notice/getWarningInfo');
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
      const web = { 1: '新浪微博', 2: '今日头条' };
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
