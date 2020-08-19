<template>
  <div>
    <div class="flex items-center search-box">
      <span>监测方案</span>
      <div class="ml-auto">
        <Button class="mr-2" size="small">
          <span class="iconfont icon-icon-test2" />
        </Button>
        <Dropdown trigger="click">
          <Button size="small">
            <span class="iconfont icon-icon-test3" />
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem
              @click.native="handleAddGroup"
            >
              创建方案组
            </DropdownItem>
            <DropdownItem>创建监测方案</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <Menu>
      <sidebar-item 
      v-for="(item, index) in tableData"
      :key="index"
      :source-data="item"
      />
    </Menu>

    <div class="fixed bottom-0 p-4">
      <Button 
        style="width: 210px;"  
        @click="handleCreate"
      >
        创建监测方案
      </Button>
    </div>

    <Modal
      v-model="addGroupModal"
      title="新建分组"
    >
      <div slot="footer">
        <Button
          type="primary"
          @click="handleSubmit"
        >
          确认
        </Button>
      </div>
      <Form
        ref="form"
        :model="formItem"
        :rules="validForm"
        :footer-hide="true"
      >
        <FormItem prop="content">
          <Input
            v-model="formItem.content"
            placeholder="请输入分组名称"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { addGroup, getGroupPlan } from '../api';
import SidebarItem from '@/views/currentInfo/components/SidebarItem';
export default {
  name: 'CurrentSidebar',
  components: {
    SidebarItem
  },
  data() {
    return {
      addGroupModal: false,
      formItem: {
        content: ''
      },
      validForm: {
        content: [{ required: true, message: '请填写分组名称', trigger: 'blur' }]
      },
      tableData: []
    };
  },
  mounted() {
    this.getGroupPlan();
  },
  methods: {
    async addGroup(params) {
      await addGroup(params).then(res => {
        if (res.state === 1) {
          this.$Message.success(res.message);
          this.addGroupModal = false;
          this.$nextTick(() => {
            this.getGroup();
          });
        }
      });
    },
    async getGroupPlan() {
      await getGroupPlan({}).then(res => {
        console.log(res, 'sss');
        const { data } = res;
        this.tableData = data;
      });
    },
    handleAddGroup() {
      this.addGroupModal = true;
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.addGroup({
            groupName: this.formItem.content
          });
        }
      });
    },
    handleCreate() {
      this.$router.push({ name: 'newEdition' });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  padding: 0 12px 0 21px;
  margin-top: 10px;
}
</style>
