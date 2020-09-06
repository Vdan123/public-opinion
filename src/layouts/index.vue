<template>
  <div class="layout-main relative bg-white">
    <navbar />
    <div class="content-wrapper">
      <div class="w-full mx-auto p-4">
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
  min-height: 100%;
  height: calc(100vh - 1px);
  .content-wrapper {
    position: absolute;
    top: 55px;
    bottom: 0;
    width: 100%;
    overflow: auto;
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
