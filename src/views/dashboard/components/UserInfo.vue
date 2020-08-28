<template>
  <div>
    <p class="mb-sm">
      <span>上次登录时间：</span>
      <span>
        {{ userInfo.last_login_time }}
      </span>
    </p>
    <p class="mb-sm">
      <span>账号状态：</span>
      <span>
        {{ userInfo.state | statusFilter }}
      </span>
    </p>
    <p class="mb-sm">
      <span>登录次数：</span>
      <span>
        {{ userInfo.login_count }} 次
      </span>
    </p>
    <p class="mb-sm">
      <span>
        关键字数量：
      </span>
      <span>
        {{ userInfo.capacity }} 个
      </span>
    </p>
    <p>
      <span>
        方案使用详情：
      </span>
      <span>
        已用0个，共0个
      </span>
    </p>
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
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
