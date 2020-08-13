<template>
  <div class="layout-main">
    <navbar />
    <div class="content-wrapper">
      <div class="router-view">
        <div class="router-content">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'Layouts',
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped>
.layout-main{
  height: 100%;
  min-height: 100%;
  .content-wrapper {
    position: absolute;
    top: 55px;
    bottom: 0;
    width: 100%;
    overflow: auto;
    min-width: 1280px;
    flex: auto;
    background: #f7f9fa;
    min-height: 280px;
  }
  .router-view {
    padding: 0 20px;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }
}
</style>
