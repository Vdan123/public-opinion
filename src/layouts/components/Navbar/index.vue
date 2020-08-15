<template>
  <div>
    <header class="navbar-header">
      <div class="header-container">
        <div class="layout-logo" />
        <ul class="top-bar">
          <template v-for="route in routes">
            <template v-if="hasOneShowingChild(route.children, route) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
              <li
                v-if="onlyOneChild.meta"
                :key="resolvePath(route.path, onlyOneChild.path)"
                class="top-bar-li"
              >
                <router-link :to="resolvePath(route.path, onlyOneChild.path)">
                  {{ onlyOneChild.meta.title }}
                </router-link>
              </li>
            </template>
          </template>
        </ul>
        <div class="top-menu-container">
          <Dropdown trigger="click">
            <a href="javascript:void(0)">
              <span>{{ userInfo.username }}</span>
              <Icon type="ios-arrow-down" />
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>个人中心</DropdownItem>
              <DropdownItem @click.native="handlePassword">修改密码</DropdownItem>
              <DropdownItem divided @click.native="handleLogout">退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="top-icon-group">
          <a href="javascript:void(0)">
            <span class="iconfont icon-icon-test11" />
          </a>
          <Dropdown trigger="click">
            <a href="javascript:void(0)">
              <span class="iconfont icon-icon-test6" />
            </a>
            <DropdownMenu slot="list">
              通知助手
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
    <password-modal v-model="passwordStatus" />
  </div>
</template>

<script>
import path from 'path';
import PasswordModal from '@/layouts/components/Navbar/Password';
export default {
  components: {
    PasswordModal
  },
  data() {
    this.onlyOneChild = null;
    return {
      passwordStatus: false
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(basePath, routePath) {
      return path.resolve(basePath, routePath);
    },
    handleLogout() {
      this.logout();
    },
    handlePassword() {
      this.passwordStatus = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-header {
  position: relative;
  z-index: 100;
}
.header-container {
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  min-width: 1316px;
  width: 100%;
  height: 54px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(175,186,200,.17);
  padding-right: 12px;
  padding-left: 12px;
  & > div {
    height: 54px;
    display: flex;
    align-items: center;
  }
  .top-bar {
    height: 54px;
    line-height: 54px;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    width: calc(100% - 661px);
    overflow: hidden;
    float: left;
    list-style: none;
    .top-bar-li {
      min-width: max-content;
      padding: 0 20px;
      font-size: 15px;
      font-weight: 400;
      color: #1f2d3d;
      line-height: 54px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      position: relative;
    }
  }
  .top-menu-container, .top-icon-group {
    float: right;
  }
  .top-icon-group .iconfont {
    display: flex;
    align-items: center;
    margin-right: 8px;
    font-size: 16px;
    color: #778ca2;
    cursor: pointer;
    background: #fff;
    border-radius: 20px;
    height: 32px;
    width: 32px;
    justify-content: center;
  }
  .top-icon-group:after {
    content: "";
    border-right: 1px solid #e0e6ed;
    height: 19px;
    margin-left: 8px;
    margin-right: 14px;
  }
}
.layout-logo{
  display: flex;
  float: left;
  height: 54px;
  width: 100px;
  background: #5b6270;
  border-radius: 3px;
  align-items: center;
}
</style>
