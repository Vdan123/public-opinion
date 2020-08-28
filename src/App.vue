<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
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
        this.$toast(data);
      });
    }
  }
};
</script>

<style lang="scss">
</style>
