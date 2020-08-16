<template>
  <div>
    <div class="page-label">
      <span style="padding-left: 6px">尊敬的用户，您本次登录时间为xxx，24小时内共为您监测信息27705条</span>
      <span class="iconfont icon-icon-test5" />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="grid-div">
        <Card class="hover:border-teal-400 hover:border-2">
          <p slot="title">账号详情</p>
          <UserInfo />
        </Card>
      </div>
      <div class="grid-div">
        <Card class="hover:border-teal-400 hover:border-2">
          <p slot="title">方案</p>
          <project-list />
        </Card>
      </div>
      <div class="grid-div row-span-2">
        <Card class="hover:border-teal-400 hover:border-2">
          <p slot="title">预警详情</p>
          <warning-list />
        </Card>
      </div>
      <div class="grid-div">
        <Card class="hover:border-teal-400 hover:border-2">
          <p slot="title">敏感信息占比</p>
          <pie-chart />
        </Card>
      </div>
      <div class="grid-div">
        <Card class="hover:border-teal-400 hover:border-2">
          <p slot="title">信息来源占比</p>
          <pie-chart />
        </Card>
      </div>
      <div class="grid-div col-span-3">
        <Card class="hover:border-teal-400 hover:border-2">
          <p slot="title">信息趋势走势图</p>
          <sensitive :chart-data="lineChartData" />
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/views/dashboard/components/UserInfo';
import Sensitive from '@/views/dashboard/components/Sensitive';
import PieChart from '@/views/dashboard/components/PieChart';
import ProjectList from '@/views/dashboard/components/ProjectList';
import WarningList from '@/views/dashboard/components/WarningList';

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  name: 'Dashboard',
  components: {
    UserInfo,
    Sensitive,
    PieChart,
    ProjectList,
    WarningList
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    };
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
