<template>
  <div class="login-container">
    <div class="flex">
      <Card :dis-hover="true" :padding="0">
        <Form
          ref="loginForm"
          class="login-form"
          label-position="left"
          :model="loginForm"
          :rules="loginRules"
        >
          <div class="title-container">
            <h3 class="title">舆情系统</h3>
          </div>

          <FormItem prop="username">
            <Input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
            />
            <Icon slot="prefix" type="md-contact" />
            </Input>
          </FormItem>

          <FormItem prop="password">
            <Input
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            />
            <Icon slot="prefix" type="md-lock" />
            </Input>
          </FormItem>

          <FormItem prop="verificationCode">
            <!-- v-model="loginForm.verificationCode" -->
            <Input
              placeholder="验证码"
              disabled
            />
          </FormItem>
          <div class="flex items-center mb-5">
            <Checkbox>
              一周内免密登录
            </Checkbox>
            <a href="javascript:void(0)" class="ml-auto">忘记密码</a>
          </div>

          <Button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >
            登录
          </Button>
          <p>温馨提示：推荐在Chrome,火狐等非IE浏览器下访问系统！</p>
          <p class="mt-2">
            Chrome浏览器下载地址：
            <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_bank">
              https://www.google.cn/intl/zh-CN/chrome/
            </a>
          </p>
        </Form>
      </Card>

      <Card :dis-hover="true" :padding="0" class="login-image-container">
        <div class="login-image">
          <img :src="imageUrl">
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { url } from '@/assets/login_images/login.js';
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入6位密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        verificationCode: 'a'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      otherQuery: {},
      redirect: undefined
    };
  },
  computed: {
    imageUrl() {
      return url;
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>
<style lang="scss" scoped>
$bg:#f8fbfd;
$dark_gray:#889aa4;
$light_gray:#2E4446;

.login-container {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: repeat-x left bottom -20px;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 70px;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
.login-image {
  background-image: linear-gradient(180deg,#11ca8d,#237c96);
  text-align: center;
  height: 565px;
  width: 530px;
  & > img {
    width: 410px;
    height: 100%;
  }
}
.login-image-container {
  & >>> .ivu-card .ivu-card-body {
    color: red
  }
}
</style>
