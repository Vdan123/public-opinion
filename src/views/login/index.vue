<template>
  <Row class="h-screen flex w-full bg-img no-gutter items-center justify-center login-container" type="flex">
    <i-col class="sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <Card :dis-hover="true" :padding="0">
        <div class="full-page-bg-color">
          <Row class="no-gutter justify-center items-center" type="flex">
            <i-col class="hidden lg:block lg:w-1/2">
              <img :src="imageUrl" class="mx-auto login-image">
            </i-col>

            <i-col class="sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <Form
                ref="loginForm"
                class="px-8 pt-8 login-form"
                label-position="left"
                :model="loginForm"
                :rules="loginRules"
              >
                <div class="mb-4 title-container">
                  <h3 class="mb-4">舆情系统</h3>
                </div>

                <FormItem prop="username">
                  <Input
                    ref="username"
                    v-model="loginForm.username"
                    class="w-full"
                    placeholder="用户名"
                  />
                  <Icon slot="prefix" type="md-contact" />
                  </Input>
                </FormItem>

                <FormItem prop="password">
                  <Input
                    ref="password"
                    v-model="loginForm.password"
                    class="w-full"
                    :type="passwordType"
                    placeholder="密码"
                    @keyup.enter.native="handleLogin"
                  />
                  <Icon slot="prefix" type="md-lock" />
                  </Input>
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
                <p>
                  <span style="color: rgb(255, 159, 67);">
                    温馨提示：
                  </span>
                  推荐在Chrome,火狐等非IE浏览器下访问系统！
                </p>
                <p class="mt-2">
                  Chrome浏览器下载地址：
                  <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_bank">
                    https://www.google.cn/intl/zh-CN/chrome/
                  </a>
                </p>
              </Form>
            </i-col>
          </Row>
        </div>
      </Card>
    </i-col>
  </Row>
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
  background-color: $bg;
  .login-form {
    padding: 70px;
    margin: 0 auto;
  }
  .title-container {
    font-size: 26px;
    color: $light_gray;
    margin: 0px auto 20px auto;
    font-weight: bold;
  }
}
.login-image {
  display: block;
  text-align: center;
}

.full-page-bg-color {
  background: linear-gradient(180deg,#11ca8d,#237c96);
}

.d-theme-dark-bg {
  background-color: #fff;
}
</style>
