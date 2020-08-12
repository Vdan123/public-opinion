<template>
  <div>
    方案规则
    <!-- <el-form>
      <el-form-item label="方案名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="主关键字">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="子关键字">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="排除关键字">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="lastStep">上一步</el-button>
    <el-button>提交</el-button> -->
  </div>
</template>

<script>
export default {
  name: 'AddKeywords',
  data() {
    return {
      formItem: {
        planName: '',
        mainKeyword: '',
        subKeyword: '',
        excludeKeyword: ''
      }
    }
  },
  methods: {
    lastStep() {
      this.$emit('lastStep')
    }
  },
}
</script>

<style lang="sass" scoped>

</style>
