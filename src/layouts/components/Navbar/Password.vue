<template>
  <div>
    <Modal
      v-model="visible"
      title="修改密码"
      @on-visible-change="changeModalStatus"
      @on-ok="changePassword"
    >
      <Form>
        <FormItem label="旧密码">
          <Input v-model="params.oldPassword" />
        </FormItem>
        <FormItem label="新密码">
          <Input v-model="params.newPassword" />
        </FormItem>
        <FormItem label="确认密码">
          <Input v-model="params.confirmPassword" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';
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
      visible: this.value,
      params: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
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
    },
    changePassword() {
      const query = {
        oldPassword: md5(this.params.oldPassword),
        newPassword: md5(this.params.newPassword),
        confirmPassword: md5(this.params.confirmPassword)
      };

      this.$emit('changePassword', query);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
