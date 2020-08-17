<template>
  <div>
    <div class="no-message-wrapper">
      <p class="no-message-icon">
        <span class="iconfont icon-wj-cznr"></span>
      </p>
      <p class="no-message-desc">暂无信息</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoMessage'
}
</script>

<style lang="scss" scoped>
.no-message-wrapper {
  width: 100%;
  height: 210px;
  position: relative;
  top: calc(50% - 21px);
  .no-message-icon {
    font-size: 45px !important;
    color: #afc1db;
    width: 100%;
    text-align: center;
  }
  .no-message-desc {
    text-align: center;
    color: #999;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.03em;
  }
}
</style>