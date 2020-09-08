<template>
  <div id="app">
    <audio ref="audio" controls="controls" hidden src="../src/assets/notice_sound/got-it-done.mp3" />
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    '$store.state.notice.count'() {
      this.$refs.audio.currentTime = 0; // 从头开始播放提示音
      this.$refs.audio.play(); // 播放
    }
  }
};
</script>

<style lang="scss">

</style>
