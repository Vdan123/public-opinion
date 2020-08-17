<template>
  <div class="search-section">
    <div class="search-wrapper-word-wrapper">
      <span>
        全文搜索
      </span>
    </div>
    <div class="search-bg"></div>
    <div class="search-wrapper">
      <Input search enter-button="搜索" size="large" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  }
};
</script>

<style lang="scss" scoped>
.search-section {
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 350px;
  z-index: 1;
  .search-wrapper-word-wrapper {
    margin: auto;
    position: absolute;
    top: 30px;
    left: calc(50% - 90px);
    font-size: 45px;
  }
  .search-wrapper {
    width: 684px;
    position: absolute;
    top: 50%;
    left: calc(50% - 342px);
    z-index: 2;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}

</style>
