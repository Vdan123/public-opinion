<template>
  <div class="cursor-pointer">
    <span v-html="context" />
    <div>
      <span>{{ time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeContent',
  props: {
    context: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
