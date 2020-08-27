<template>
  <div>
    <template v-if="hasChildren(sourceData.keywords, sourceData)">
      <MenuItem
        :name="onlyOneChild.name"
        :to="resolvePath(onlyOneChild)"
        class="menu-item"
      >
        <template v-if="onlyOneChild.group_id">
          {{ onlyOneChild.title }}
          <span class="hover-options">
            <Dropdown>
              <a href="javascript:void(0)">
                ...
              </a>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="handleDelPlan">删除方案</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
        </template>
        <template v-else>
          <!-- 这里是冗余的代码，可以抽离成一个独立的组件进行复用的 -->
          <span class="iconfont icon-folder" />
          {{ onlyOneChild.title }}
          <Dropdown>
            <a
              href="javascript:void(0)"
              onclick="event.stopPropagation();"
              class="pl-1"
            >
              <span class="iconfont icon-icon-test3" />
            </a>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="handleChangeName(sourceData.group_name)">
                修改名称
              </DropdownItem>
              <DropdownItem @click.native="handleDelGroup">
                删除分组
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </MenuItem>
    </template>

    <Submenu v-else :name="sourceData.id">
      <template slot="title">
        <span class="iconfont icon-folder" />
        {{ sourceData.group_name }}
        <Dropdown>
          <a
            href="javascript:void(0)"
            onclick="event.stopPropagation();"
            class="pl-1"
          >
            <span class="iconfont icon-icon-test3" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="handleChangeName(sourceData.group_name)">
              修改名称
            </DropdownItem>
            <DropdownItem @click.native="handleDelGroup">
              删除分组
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
      <sidebar-item
        v-for="(item, index) in sourceData.keywords"
        :key="index"
        :source-data="item"
      />
    </Submenu>
    <Modal
      v-model="visible"
      title="修改分组名称"
      @on-ok="handleSubmit"
    >
      <Input v-model="groupName" />
    </Modal>
  </div>
</template>

<script>
import { delKeywords } from '../api';

export default {
  name: 'SidebarItem',
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    baseId: {
      type: Number,
      default: 0
    }
  },
  data() {
    this.onlyOneChild = {};
    return {
      visible: false,
      groupName: ''
    };
  },
  methods: {
    hasChildren(children = [], parent) {
      const { group_name, plan_name, id, group_id, main_keyword } = parent;
      if (children.length === 0) {
        if (!_.isUndefined(group_id)) {
          this.onlyOneChild = {
            name: `${group_id}-${id}`,
            title: plan_name,
            path: id,
            main_keyword,
            group_id
          };
        } else {
          this.onlyOneChild = {
            name: id,
            title: group_name
          };
        }
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (!_.isUndefined(routePath.path)) {
        const { title, group_id } = routePath;
        return { path: '/current/search', query: { group_id, id: routePath.path, title }};
      }
    },
    handleChangeName(name) {
      this.visible = true;
      this.groupName = name;
    },
    handleSubmit() {
      const { id } = this.sourceData;
      this.$emit('editGroup', {
        id,
        groupName: this.groupName
      });
    },
    handleDelGroup() {
      const { id } = this.sourceData;
      this.$Modal.confirm({
        title: '确定删除该分组么？',
        onOk: () => {
          this.$emit('deleteGroup', { id });
        }
      });
    },
    handleDelPlan() {
      const { id, group_id } = this.sourceData;
      this.$Modal.confirm({
        title: '确定删除该方案么？',
        onOk: () => {
          this.delKeywords({ id, groupId: group_id });
        }
      });
    },

    async delKeywords(params) {
      await delKeywords(params).then(res => {
        if (res.state === 1) {
          this.$Message.success(res.message);
          this.$nextTick(() => {
            this.$store.dispatch('group/getGroupPlan');
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-item:hover {
  .hover-options {
    display: block;
    float: right;
    cursor: pointer;
    user-select: none;
  }
}

.hover-options {
  display: none;
}
</style>
