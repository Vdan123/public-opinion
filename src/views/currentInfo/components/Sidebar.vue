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
            <DropdownItem @click.native="handleCreate">创建监测方案</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <Menu class="overflow-y-auto" style="height: calc(100% - 150px)">
      <sidebar-item
        v-for="(item, index) in tableData"
        :key="index"
        :source-data="item"
        @editGroup="handleEdit"
        @deleteGroup="handleDel"
      />
    </Menu>

    <div class="fixed bottom-0 p-4 z-50">
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
import {
  addGroup,
  editGroup,
  delGroup,
  delKeywords
} from '../api';
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
      }
    };
  },
  computed: {
    tableData() {
      return this.$store.state.group.navbarList;
    }
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
            this.getGroupPlan();
          });
        }
      });
    },

    async editGroup(params) {
      await editGroup(params).then(res => {
        this.$Message.success(res.message);
        this.$nextTick(() => {
          this.getGroupPlan();
        });
      });
    },

    async delGroup(params) {
      await delGroup(params).then(res => {
        if (res.state === 1) {
          this.$Message.success(res.message);
          this.$nextTick(() => {
            this.getGroupPlan();
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    async delKeywords(params) {
      console.log(params, 'ooo');
      await delKeywords(params).then(res => {
        if (res.state === 1) {
          this.$Message.success(res.message);
          this.$nextTick(() => {
            this.getGroupPlan();
          });
        } else {
          this.$Message.error(res.message);
        }
      })
    },

    async getGroupPlan() {
      await this.$store.dispatch('group/getGroupPlan');
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
    },
    handleEdit(value) {
      this.editGroup(value);
    },
    handleDel(value) {
      this.delGroup(value);
    },
    handleDelPlan(value) {
      console.log(value, ';value');
      this.delKeywords(value);
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
