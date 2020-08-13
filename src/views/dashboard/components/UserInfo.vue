<template>
  <div>
    <p slot="title">账号信息</p>
    <p>上次登录时间 {{ userInfo.last_login_time }}</p>
    <p>账号状态 {{ userInfo.state | statusFilter }}</p>
    <p>登录次数 {{ userInfo.login_count }} 次</p>
    <p>关键字数量 {{ userInfo.capacity }} 个</p>
    <p>方案使用详情 已用 x 个</p>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '正常',
        2: '禁用'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>
