<template>
  <Card>
    <div slot="title">
      账号信息
    </div>
    <span class="title">账号信息</span>
    <ul class="mb-10">
      <li
        v-for="(item, index) in user"
        :key="index"
        class="p-5"
      >
        <span>
          {{ item.label }}
        </span>
        <span>
          {{ userInfo[item.key] }}
        </span>
      </li>
    </ul>

    <span class="title">账号权限</span>
    <ul>
      <li class="p-5">
        <span>监测关键词总字数:</span>
        <span> {{ userInfo['capacity'] }} </span>
      </li>
      <li class="p-5">
        <span>账号状态:</span>
        <span> {{ userInfo['state'] | statusFilter }} </span>
      </li>
    </ul>
    <!--
    <ul>
      <li>
        账号: wdataworld
      </li>
      <li>
        昵称: 刘先生 修改
      </li>
      <li>
        手机号码: 15200088248 修改
      </li>
      <li>
        邮箱: zhangjiameng@miduchina.com 修改
      </li>
      <li>
        有效期: 2020年08月24日
      </li>
    </ul>

    <ul class="mt-10">
      <li>
        账号权限
      </li>
      <li>
        用户角色: A类合作单位管理员
      </li>
      <li>
        账号状态: 正常
      </li>
      <li>
        所属公司: 北京万数科技有限公司
      </li>
      <li>
        权限明细:
      </li>
      <li>
        监测关键词总字数500个
      </li>
    </ul> -->
  </Card>
</template>

<script>

const user = [
  { label: '账号:', key: 'username' },
  { label: '单位名称:', key: 'realname' },
  { label: '手机号码:', key: 'mobile' },
  { label: '邮箱:', key: 'email' }
];

export default {
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
      user
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
