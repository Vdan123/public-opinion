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
      isConnected: false
    };
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      this.$socket.emit('login', '123');
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
        this.$toast({
          component: Notice,
          props: {
            message: '#河北大学北街#说是两个学校用一个生活区 食堂人流量那么大 饭点食堂本就是很拥挤如果没有北街来缓解食堂压力 '
          }
        });
        this.$toast(data);
      });
    }
  }
};
</script>

<style lang="scss">
</style>
