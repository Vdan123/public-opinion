<template>
  <div>
    <div class="page-label">
      <span style="padding-left: 6px">尊敬的用户，您本次登录时间为xxx，24小时内共为您监测信息27705条</span>
      <span class="iconfont icon-icon-test5 cursor-pointer" @click="handleSetting" />
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
          <!-- <pie-chart /> -->
          <no-message></no-message>
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
          <!-- <pie-chart /> -->
          <no-message></no-message>
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
          <!-- <warning-list /> -->
          <no-message></no-message>
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
          <!-- <project-list /> -->
          <no-message></no-message>
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
          <!-- <sensitive :chart-data="lineChartData" /> -->
          <no-message></no-message>
        </Card>
      </div>
      <div class="grid-div col-span-4">
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
            <no-message></no-message>
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
import Sensitive from '@/views/dashboard/components/Sensitive';
import PieChart from '@/views/dashboard/components/PieChart';
import ProjectList from '@/views/dashboard/components/ProjectList';
import WarningList from '@/views/dashboard/components/WarningList';
import NoMessage from '@/components/NoMessage';

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
    fuck: [100, 200, 300, 400, 200, 11, 2323]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
    fuck: [100, 200, 300, 400, 200, 11, 2323]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
    fuck: [100, 200, 300, 400, 200, 11, 2323]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
    fuck: [100, 200, 300, 400, 200, 11, 2323]
  }
};

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
      lineChartData: lineChartData.newVisitis,
      projectSelected: false
    };
  },
  methods: {
    handleSetting() {
      this.projectSelected = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-label {
  margin-bottom: 10px;
  height: 32px;
  line-height: 32px;
  background: #e5f9f4;
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
</style>
