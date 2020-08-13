<template>
  <div>
    方案规则
    <Form>
      <FormItem label="方案名称">
        <Input /></Input>
      </FormItem>
      <FormItem label="主关键字">
        <Input /></Input>
      </FormItem>
      <FormItem label="子关键字">
        <Input /></Input>
      </FormItem>
      <FormItem label="排除关键字">
        <Input /></Input>
      </FormItem>
    </Form>
    <Button @click="lastStep">上一步</Button>
    <Button>提交</Button>
  </div>
</template>

<script>
export default {
  name: 'AddKeywords',
  data() {
    return {
      formItem: {
        planName: '',
        mainKeyword: '',
        subKeyword: '',
        excludeKeyword: ''
      }
    };
  },
  methods: {
    lastStep() {
      this.$emit('lastStep');
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
