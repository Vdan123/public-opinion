<template>
  <div>
    <div>
      <Form
        ref="form"
        :model="formItem"
        label-position="left"
      >
        <FormItem
          prop="content"
          label="分组名称："
          :rules="[{required: true, message: '请填写分组名称', trigger: 'blur'}]"
        >
          <Select
            v-model="formItem.content"
            placeholder="请输入分组名称"
          >
            <Option
              v-for="item in tableData"
              :key="item.id"
              :label="item.group_name"
              :value="item"
            />
          </Select>
        </FormItem>
        <FormItem label="备注：">
          <Input type="textarea" />
        </FormItem>
      </Form>
    </div>
    <Button @click="nextStep">下一步</Button>
  </div>
</template>

<script>
import { getGroup, addGroup } from '../api';

export default {
  name: 'AddGroup',
  data() {
    return {
      tableData: [],
      formItem: {
        content: ''
      }
    };
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    async getGroup() {
      await getGroup().then(res => {
        const { data } = res;
        this.tableData = data;
      });
    },
    async addGroup(params) {
      await addGroup(params).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        });
      });
    },
    nextStep() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const content = this.formItem.content;
          if (_.isUndefined(content['id'])) {
            this.addGroup({ groupName: this.formItem.content });
          }
          this.$emit('nextStep');
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
