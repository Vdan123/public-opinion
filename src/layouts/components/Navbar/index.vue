<template>
  <nav class="white">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
            <!-- Icon when menu is closed. -->
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open. -->
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0">
            <img src="@/assets/login_images/网信藁城.jpeg" class="hidden lg:block h-8 w-auto" alt="YuQing logo">
            <img src="@/assets/login_images/网信藁城.jpeg" class="block lg:hidden h-8 w-auto" alt="YuQing logo">
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex">
              <template v-for="route in routes">
                <template v-if="hasOneShowingChild(route.children, route) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
                  <router-link
                    :key="route.path"
                    :to="resolvePath(route.path, onlyOneChild.path)"
                    active-class="textColor"
                  >
                    <div
                      v-if="onlyOneChild.meta"
                      :key="resolvePath(route.path, onlyOneChild.path)"
                      class="ml-4 px-3 py-2 rounded-md text-15 font-medium leading-5 hover:bg-shallow hover:text-green-customer hover:bg-gray-200 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out active"
                    >
                      {{ onlyOneChild.meta.title }}
                    </div>
                  </router-link>
                </template>
              </template>
            </div>
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="mr-3 relative p-1 border-2 border-transparent text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none transition duration-150 ease-in-out">
            <a href="javascript:void(0)">
              <span class="iconfont icon-icon-test5 cursor-pointer" />
            </a>
          </div>

          <div class="mr-3 relative p-1 border-2 border-transparent text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none transition duration-150 ease-in-out">
            <a href="javascript:void(0)">
              <span class="iconfont icon-icon-test11" />
            </a>
          </div>
          <Poptip title="通知助手" content="content">
            <div class="mr-3 relative p-1 border-2 border-transparent text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none transition duration-150 ease-in-out">
              <a href="javascript:void(0)">
                <span class="iconfont icon-icon-test6" />
              </a>
            </div>

            <div slot="content">
              <div class="flex">
                <Button size="small">全部</Button>
                <Button size="small">概览</Button>
                <Button size="small">系统更新通知</Button>
              </div>
            </div>
          </Poptip>
          <span>石家庄市藁城区委</span>

          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <Dropdown trigger="click">
              <a href="javascript:void(0)">
                <span>{{ userInfo.username }}</span>
                <Icon type="ios-arrow-down" />
              </a>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="handlePassword">修改密码</DropdownItem>
                <DropdownItem divided @click.native="handleLogout">退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>

    <password-modal
      v-model="passwordStatus"
      @changePassword="changePassword"
    />

    <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
    <!-- <div class="hidden sm:hidden">
      <div class="px-2 pt-2 pb-3">
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Dashboard</a>
        <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Team</a>
        <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Projects</a>
        <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Calendar</a>
      </div>
    </div> -->
  </nav>
</template>

<script>
import path from 'path';
import { editPassword } from '@/api/user.js';
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

    async editPassword(params) {
      await editPassword(params).then(res => {
        if (res.state === 1) {
          this.$Message.success(res.message);
          this.$nextTick(() => {
            this.$router.push({ path: '/login' });
          });
        }
      });
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
    },

    changePassword(params) {
      this.editPassword(params);
    }
  }
};
</script>

<style lang="scss" scoped>
.yuqing-header {
  background-color: #fff;
  height: 54px;
  line-height: 54px;
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
.textColor {
  .active {
    color: #04cb94 !important;
  }
}

.layout-logo{
  display: flex;
  height: 54px;
  border-style: none;
  align-items: center;
  .layout-image {
    max-height: 25px;
    max-width: 165px;
    padding: 0 10px;
    width: auto;
  }
}
</style>
