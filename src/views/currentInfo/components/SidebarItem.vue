<template>
  <div>
    <template v-if="hasChildren(sourceData.keywords, sourceData)">
      <MenuItem
        :name="onlyOneChild.name"
        :to="resolvePath(onlyOneChild)"
      >
        {{ onlyOneChild.title }}
      </MenuItem>
    </template>

    <Submenu v-else :name="sourceData.id">
      <template slot="title">
        <span class="iconfont icon-folder" />
        {{ sourceData.group_name }}
      </template>
      <sidebar-item
        v-for="(item, index) in sourceData.keywords"
        :key="index"
        :source-data="item"
      />
    </Submenu>
  </div>
</template>

<script>
import path from 'path';
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
            main_keyword
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
        const { main_keyword, plan_name, title } = routePath;
        return { path: '/current/search', query: { id: routePath.path, keywords: main_keyword, title }};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
