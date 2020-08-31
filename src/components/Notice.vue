<template>
  <div class="notice-container">
    <h3>新预警信息</h3>
    <div>
      <ul>
        <li v-for="(item, index) in message" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
