<template>
  <div class="setting-container">
    <header>监测方案</header>
    <!-- <el-card class="box-card">
      <div slot="header">
        <span>创建用户分组</span>
      </div>
      <div class="step-container">
        <el-steps
          :active="active"
          :align-center="true"
        >
          <el-step title="设置分组" description="创建或选择分组"></el-step>
          <el-step title="设置方案规则"></el-step>
        </el-steps>
      </div>
      <component
        :is="currentComponents"
        @nextStep="nextStep"
        @lastStep="lastStep"
      />
    </el-card> -->
  </div>
</template>

<script>
import { getGroup, getKeywords, addGroup } from './api'
import AddGroup from './components/addGroup'
import AddKeywords from './components/addKeywords'

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
    }
  },
  methods: {
    async getKeywords() {
      await getKeywords().then(res => {
        console.log(res, 'getKeywords');
      })
    },
    nextStep() {
      this.currentComponents = 'AddKeywords'
    },
    lastStep() {
      this.currentComponents = 'AddGroup'
    }
  },
}
</script>

<style lang="scss" scoped>
.setting-container {
  padding: 16px
}
.step-container {
  padding: 0 100px
}
</style>
