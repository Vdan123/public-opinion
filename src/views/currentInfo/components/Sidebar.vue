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
            <span class="iconfont icon-icon-edit" />
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>创建方案组</DropdownItem>
            <DropdownItem>创建监测方案</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <Menu>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate" />
          舆情监测组（父组件）
        </template>
        <MenuItem
          name="1-1"
          :to="{name: 'Project', params: { id: 123 }}"
        >
          石家庄
        </MenuItem>
        <MenuItem
          name="1-2"
          :to="{name: 'Project', params: { id: 456 }}"
        >
          保定
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'CurrentSidebar'
};
</script>

<style lang="scss" scoped>
.search-box {
  padding: 0 12px 0 21px;
  margin-top: 10px;
}
</style>
