<template>
  <div class="notice-container">
    <div class="flex items-center">
      <h3>新预警信息</h3>
      <Button
        class="ml-auto"
        size="small"
        @click="handleClose"
      >
        <Icon type="md-close" />
      </Button>
    </div>
    <div>
      <ul>
        <li
          v-for="(item, index) in message"
          :key="index"
          class="py-3"
        >
          {{ index + 1 }}: {{ item.content }}
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
  },
  methods: {
    handleClose() {
      this.$emit('closeToast');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
