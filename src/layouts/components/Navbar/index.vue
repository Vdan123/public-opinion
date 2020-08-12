<template>
  <div>
    <header class="flex header-container">
      <div class="layout-logo" />
      <ul class="top-bar">
        <template v-for="route in routes">
          <template v-if="hasOneShowingChild(route.children, route) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
            <li class="top-bar-li" :key="resolvePath(route.path, onlyOneChild.path)">
              <router-link :to="resolvePath(route.path, onlyOneChild.path)">
                {{ onlyOneChild.meta.title }}
              </router-link>
            </li>
          </template>
        </template>
      </ul>
    </header>
  </div>
</template>

<script>
import path from 'path';
export default {
  data() {
    this.onlyOneChild = null;
    return {};
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    }
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
    .top-bar-link {
      color: #1f2d3d;
      display: inline-block;
      user-select: none;
    }
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
