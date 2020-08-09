<template>
  <div>
    <Header :style="{position: 'fixed', width: '100%'}">
      <Menu mode="horizontal" theme="light">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <MenuItem name="1">
          <span>总览</span>
          </MenuItem>
          <MenuItem name="2">
            <span>舆情监测</span>
          </MenuItem>
          <MenuItem name="3">
            <span>全文检索</span>
          </MenuItem>
          <MenuItem name="4">
            <span>简报生成</span>
          </MenuItem>
          <MenuItem name="5">
            <span>用户管理</span>
          </MenuItem>
          <MenuItem name="6">
            <span>系统设置</span>
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.layout-logo{
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav{
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
