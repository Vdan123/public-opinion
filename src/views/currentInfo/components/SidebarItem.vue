<template>
  <div>
    <template v-if="hasChildren(sourceData.keywords, sourceData)">
      <MenuItem 
        :name="getMenuName(sourceData)"
        :to="resolvePath(sourceData)"
      >
        {{ item.plan_name }}
      </MenuItem>
    </template>

    <Submenu v-else>
      <template slot="title">
        <span class="iconfont icon-folder" />
        <span>{{ sourceData.group_name }}</span>
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
    return {

    };
  },
  methods: {
    hasChildren(children = [], parent) {
      if (children.length === 0 ) {
        console.log(children, 'ooo');
        return true;
      }
      return false;
    },
    getMenuName() {
      
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
