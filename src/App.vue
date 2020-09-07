<template>
  <div id="app">
    <audio ref="audio" controls="controls" hidden src="../src/assets/notice_sound/got-it-done.mp3" />
    <router-view />
  </div>
</template>

<script>
export default {
  sockets: {
    connect() {
      const { id } = this.$store.getters.userInfo;
      this.$socket.emit('login', id);
      console.log('建立连接');
    },

    disconnect() {
      this.unSubscribeChannel();
    },

    messageChannel() {
      this.subscribeChannel();
    }
  },
  methods: {
    subscribeChannel() {
      this.sockets.subscribe('messageChannel', (data) => {
        // this.$refs.audio.currentTime = 0; // 从头开始播放提示音
        // this.$refs.audio.play(); // 播放

        console.log(JSON.parse(data), 'data');

        const { content, total } = JSON.parse(data)[0];

        this.$store.dispatch('notice/addCount', total);

        this.$Notice.open({
          title: '新消息提醒',
          desc: content
        });
      });
    },
    unSubscribeChannel() {
      console.log('解除连接');
      this.sockets.unsubscribe('messageChannel');
    }
  }
};
</script>

<style lang="scss">
/* Applied to the toast body when using regular strings as content */
.Vue-Toastification__toast--default.my-custom-toast {
  height: 210px;
  overflow: scroll;
  // background-color: #f7f7f7;
  border-radius: 10px;
  // color: #333
}
</style>
