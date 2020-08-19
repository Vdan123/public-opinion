<template>
  <div>
    <div class="flex items-center project-top-bar">
      <div>
        <div class="with-vertical-line relative ">
          <span style="padding-left: 15px; font-weight: 600; font-size: 16px">{{ title }}</span>
        </div>
      </div>

      <Menu
        class="ml-auto"
        mode="horizontal"
        active-name="TableList"
        @on-select="handleMenu"
      >
        <MenuItem
          v-for="item in menu"
          :key="item.key"
          :name="item.key"
        >
          {{ item.label }}
        </MenuItem>
      </Menu>
    </div>
    <div style="padding: 10px 0">
      <component :is="menuContent" :edit-state="editStatus" />
    </div>
  </div>
</template>

<script>
import { getArticleList } from '../api';

const menu = [
  { label: '信息列表', key: 'TableList' },
  { label: '图表分析', key: 'Analysis' },
  { label: '预警设置', key: 'ForeWarning' },
  { label: '修改方案', key: 'Edit' }
];

export default {
  name: 'Project',
  provide() {
    return {
      project: this
    };
  },
  components: {
    TableList: () => import('@/views/currentInfo/components/List'),
    Analysis: () => import('@/views/currentInfo/components/Analysis'),
    ForeWarning: () => import('@/views/currentInfo/components/ForeWarning'),
    Edit: () => import('@/views/new_edition/index')
  },
  data() {
    return {
      menu,
      menuContent: 'TableList',
      editStatus: false,
      tableData: [],
      title: ''
    };
  },
  watch: {
    $route: {
      handler(route) {
        const { keywords, title } = route.query;
        this.title = title;
        if (!_.isUndefined(keywords)) {
          this.handleArticle(keywords);
        }
      },
      deep: true
    }
  },
  mounted() {
    // this.handleArticle();
  },
  methods: {
    async getArticleList(params) {
      await getArticleList(params).then(res => {
        if (res.state === 1) {
          this.tableData = res.data;
        }
      });
    },
    handleArticle(keywords) {
      const params = {
        keywords,
        testingTime: 1,
        infoType: 0,
        searchType: 0,
        isRead: 0,
        infoSort: 1,
        source: 1,
        page: 1,
        limit: 50
      };
      this.getArticleList(params);
    },
    handleMenu(name) {
      this.menuContent = name;
      if (name === 'Edit') {
        this.editStatus = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.project-top-bar {
  background: #fff;
  height: 44px;
  line-height: 44px;
  z-index: 9;
  .ivu-menu {
    height: 44px;
    line-height: 44px;
  }
}
.with-vertical-line > span:before {
  position: absolute;
  content: '';
  top: 5px;
  left: 0;
  background-color: #04cb94;
  width: 3px;
  height: 80%;
  border-radius: 5px;
}
</style>
