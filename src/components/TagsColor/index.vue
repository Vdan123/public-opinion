<template>
  <div>
    <Tag :color="displayColor">
      <slot :tags="tags" />
    </Tag>
  </div>
</template>

<script>
const tags = [
  { tag: '暂无', value: 0, describe: 'default' },
  { tag: '非敏感', value: 1, describe: 'success' },
  { tag: '中性', value: 2, describe: 'warning' },
  { tag: '敏感', value: 3, describe: 'error' }
];
export default {
  name: 'TagsColor',
  props: {
    describe: {
      type: String,
      default: undefined
    },
    numbers: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      tags
    };
  },
  computed: {
    displayColor() {
      return _.find(tags, el => {
        if (this.describe || this.numbers) {
          return el.tag === this.describe || el.value === this.numbers;
        } else {
          return { tag: '暂无', value: 0, describe: 'default' };
        }
      }).describe;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
