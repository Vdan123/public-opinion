<template>
  <div class="setting-container">
    <header>监测方案</header>
    <Card class="box-card">
      <div slot="header">
        <span>创建用户分组</span>
      </div>
      <div class="step-container">
        <Steps
          :active="active"
          :align-center="true"
        >
          <Step title="设置分组" description="创建或选择分组" />
          <Steps title="设置方案规则" />
        </Steps>
      </div>
      <component
        :is="currentComponents"
        @nextStep="nextStep"
        @lastStep="lastStep"
      />
    </Card>
  </div>
</template>

<script>
import { getKeywords } from './api';
import AddGroup from './components/addGroup';
import AddKeywords from './components/addKeywords';

export default {
  components: {
    AddGroup,
    AddKeywords
  },
  data() {
    return {
      tableData: [],
      currentComponents: 'AddGroup',
      active: 1
    };
  },
  methods: {
    async getKeywords() {
      await getKeywords().then(res => {
        console.log(res, 'getKeywords');
      });
    },
    nextStep() {
      this.currentComponents = 'AddKeywords';
    },
    lastStep() {
      this.currentComponents = 'AddGroup';
    }
  }
};
</script>

<style lang="scss" scoped>
.setting-container {
  padding: 16px
}
.step-container {
  padding: 0 100px
}
</style>
