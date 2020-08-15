<template>
  <div>
    <Modal
      v-model="visible"
      title="修改密码"
      @on-visible-change="changeModalStatus"
    >
      <Form>
        <FormItem label="旧密码">
          <Input />
        </FormItem>
        <FormItem label="新密码">
          <Input />
        </FormItem>
        <FormItem label="旧密码">
          <Input />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'PasswordModal',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value
    };
  },
  computed: {},
  watch: {
    value(val) {
      this.visible = val;
    }
  },
  methods: {
    changeModalStatus(status) {
      if (!status) {
        this.$emit('input', false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
