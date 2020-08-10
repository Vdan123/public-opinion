<template>
  <div>
    <header class="flex header-container">
      <div class="layout-logo" />
      <ul class="top-bar">
        <li v-for="(nav, index) in navList" :key="index" class="top-bar-li">
          <a href="javascript:void(0)" class="top-bar-link">
            {{ nav }}
          </a>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: ['总览', '舆情监测', '全文检索', '舆情简报', '用户管理', '用户管理', '系统管理']
    };
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  min-width: 1316px;
  width: 100%;
  height: 54px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(175,186,200,.17);
  padding-right: 12px;
  padding-left: 12px;
  .top-bar {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    width: calc(100% - 661px);
    overflow: hidden;
    float: left;
    .top-bar-li {
      min-width: max-content;
      padding: 0 20px;
      font-size: 15px;
      font-weight: 400;
      color: #1f2d3d;
      line-height: 54px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      position: relative;
    }
    .top-bar-link {
      color: #1f2d3d;
      display: inline-block;
      user-select: none;
    }
  }
}
.layout-logo{
  display: flex;
  float: left;
  height: 54px;
  width: 100px;
  background: #5b6270;
  border-radius: 3px;
  align-items: center;
}
</style>
