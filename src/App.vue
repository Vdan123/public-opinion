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
      toastArray: []
    };
  },
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
        this.$refs.audio.currentTime = 0; // 从头开始播放提示音
        this.$refs.audio.play(); // 播放

        if (_.isEmpty(this.toastArray)) {
          this.toastArray = JSON.parse(data);
        } else {
          JSON.parse(data).map(el => {
            this.toastArray.push(el);
          });
        }

        this.$toast({
          component: Notice,
          props: {
            message: this.toastArray
          },
          listeners: {
            closeToast: this.closeToast
          }
        });

        this.$nextTick(() => {
          this.$store.dispatch('notice/getWarningInfo');
        });
      });
    },
    unSubscribeChannel() {
      console.log('解除连接');
      this.sockets.unsubscribe('messageChannel');
    },
    closeToast() {
      this.toastArray = [];
      this.$toast.clear();
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
