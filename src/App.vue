<template>
  <div id="app">
    <audio ref="audio" controls="controls" hidden src="../src/assets/notice_sound/got-it-done.mp3" />
    <router-view />
  </div>
</template>

<script>
import Notice from '@/components/Notice';
export default {
  data() {
    return {
      isConnected: false,
      toastArray: []
    };
  },
  sockets: {
    connect() {
      // Fired when the socket connects.

      const { id } = this.$store.getters.userInfo;
      this.isConnected = true;
      this.$socket.emit('login', id);
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel() {
      this.subscribeChannel();
    }
  },
  methods: {
    subscribeChannel() {
      this.sockets.subscribe('messageChannel', (data) => {
        this.$refs.audio.currentTime = 0; // 从头开始播放提示音
        this.$refs.audio.play(); // 播放

        if (_.isEmpty(this.toastArray)) {
          this.toastArray = data;
        } else {
          data.map(el => {
            this.toastArray.push(el);
          });
        }

        this.$toast({
          component: Notice,
          props: {
            message: this.toastArray
          }
        },
        {
          onClose: () => {
            this.toastArray = [];
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
</style>
