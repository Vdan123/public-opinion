<template>
  <div class="dashboard-project-list">
    <ul>
      <li
        v-for="(projectCount, index) in projectList"
        :key="index"
        class="mb-10"
      >
        <div class="flex">
          <a href="javascript:void(0)">
            <span style="color: #666;">
              {{ projectCount.plan_name }}：
            </span>
          </a>
          <span style="font-size: 14px; color: #333;" class="ml-auto">
            {{ projectCount.total }}条
          </span>
        </div>
        <div class="relative pt-1">
          <div class="overflow-hidden h-3 mb-4 text-xs flex rounded bg-blue-100">
            <div
              :style="totalPercent(projectCount.total)"
              class="shadow-none
              flex
              flex-col
              text-center
              whitespace-nowrap
              text-white
              justify-center
              bg-blue-400"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    projectList: {
      type: Array,
      default: () => []
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    totalPercent(params) {
      return { width: _.ceil(_.divide(params, this.totalCount), 2) * 100 + '%' };
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-project-list {
  max-height: 470px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
