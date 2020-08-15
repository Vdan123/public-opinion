<template>
  <div>
    <template v-if="hasChildren">
      <Menu />
    </template>

    <Submenu v-else>
      <template slot="title">
        <span class="iconfont icon-folder" />
        舆情监测组（父组件）
      </template>
      <MenuItem
        name="1-1"
        :to="{name: 'Project', params: { id: 123 }}"
      >
        石家庄
      </MenuItem>
    </Submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  data() {
    return {
      hasChildren: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
