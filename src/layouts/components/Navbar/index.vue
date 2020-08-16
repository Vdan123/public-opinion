<template>
  <header class="yuqing-header flex-none px-2 md:px-6 lg:px-8 xl:px-10">
    <div class="layout-logo" />
    <nav>
      <template v-for="route in routes">
        <template v-if="hasOneShowingChild(route.children, route) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
          <div
            v-if="onlyOneChild.meta"
            :key="resolvePath(route.path, onlyOneChild.path)"
            class="nav-item"
          >
            <router-link :to="resolvePath(route.path, onlyOneChild.path)">
              {{ onlyOneChild.meta.title }}
            </router-link>
          </div>
        </template>
      </template>
    </nav>
    <div class="nav-dropdown">
      <a href="javascript:void(0)" class="nav-icons">
        <span class="iconfont icon-icon-test11" />
      </a>
      <Dropdown trigger="click">
        <a href="javascript:void(0)" class="nav-icons">
          <span class="iconfont icon-icon-test6" />
        </a>
        <DropdownMenu slot="list">
          通知助手
        </DropdownMenu>
      </Dropdown>
      <div class="nav-line" />
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

    <password-modal v-model="passwordStatus" />
  </header>
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
.yuqing-header {
  background-color: #fff;
  height: 54px;
  line-height: 54px;
  min-width: 1316px;
  box-shadow: 0 2px 4px 0 rgba(175,186,200,.17);
  & > nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    padding: 0;
    margin: 0;
    overflow: hidden;
    float: left;
    .nav-item {
      position: relative;
      height: 100%;
      text-align: center;
      min-width: max-content;
      padding: 0 20px;
      font-size: 15px;
      font-weight: 400;
      color: #1f2d3d;
      cursor: pointer;
      user-select: none;
    }
  }

  .nav-dropdown {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .nav-icons {
    padding: 0 8px;
    font-size: 16px;
    color: #778ca2;
    cursor: pointer;
    border-radius: 20px;
  }
  .nav-line:after {
    content: "";
    border-right: 1px solid #e0e6ed;
    height: 19px;
    margin-left: 8px;
    margin-right: 14px;
  }

}

.layout-logo{
  float: left;
  height: 54px;
  width: 100px;
  background: #5b6270;
  border-radius: 3px;
  align-items: center;
}
</style>
