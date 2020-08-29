<template>
  <div>
    <h3>新预警信息</h3>
    <div>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
