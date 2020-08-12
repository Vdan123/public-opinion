<template>
  <div>
    <!-- <div>
      <el-form
        ref="form"
        :model="formItem"
        label-position='left'
      >
        <el-form-item
          prop="content"
          label="分组名称："
          :rules="[{required: true, message: '请填写分组名称', trigger: 'blur'}]"
        >
          <el-select
            v-model="formItem.content"
            value-key="id"
            filterable
            allow-create
            default-first-option
            placeholder="请输入分组名称">
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.group_name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="nextStep">下一步</el-button> -->
  </div>
</template>

<script>
import { getGroup, addGroup } from '../api'

export default {
  name: 'AddGroup',
  data() {
    return {
      tableData: [],
      formItem: {
        content: ''
      }
    }
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    async getGroup() {
      await getGroup().then(res => {
        const { data } = res
        this.tableData = data
      })
    },
    async addGroup(params) {
      await addGroup(params).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      })
    },
    nextStep() {
      this.$refs['form'].validate(valid => {
        if(valid) {
          const content = this.formItem.content
          if (_.isUndefined(content['id'])) {
            this.addGroup({groupName: this.formItem.content})
          }
          this.$emit('nextStep')
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
