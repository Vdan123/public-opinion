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
        :active-name="activeName"
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
      <component
        :is="menuContent"
        :key="menuContent"
        :edit-state="editStatus"
        @changeAttribute="changeAttribute"
        @changePage="changePage"
        @handleSearch="handleSearch"
      />
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

const initParams = {
  testingTime: 1,
  infoType: 0,
  searchType: 0,
  isRead: 0,
  infoSort: 1,
  source: 0,
  page: 1,
  limit: 50
};

export default {
  name: 'Project',
  provide() {
    return {
      project: this
    };
  },
  components: {
    TableList: () => import(/* webpackChunkName: 'currentInfo' */ '@/views/currentInfo/components/List'),
    Analysis: () => import(/* webpackChunkName: 'currentInfo' */ '@/views/currentInfo/components/Analysis'),
    ForeWarning: () => import(/* webpackChunkName: 'currentInfo' */ '@/views/currentInfo/components/ForeWarning'),
    Edit: () => import(/* webpackChunkName: 'currentInfo' */ '@/views/new_edition/index')
  },
  data() {
    return {
      menu,
      initParams,
      copyParams: Object.assign({}, initParams),
      menuContent: 'TableList',
      activeName: 'TableList',
      editStatus: false,
      tableData: [],
      tableLoading: false,
      title: '',
      currentPage: 1
    };
  },
  watch: {
    $route: {
      handler(route) {
        const { title } = route.query;
        this.title = title;
        if (!_.isUndefined(title)) {
          this.handleArticle(this.initParams);
          this.currentPage = 1;
          this.menuContent = this.activeName = 'TableList';
        }
      },
      deep: true
    }
  },
  mounted() {
    this.handleArticle(this.initParams);
  },
  methods: {
    async getArticleList(params) {
      this.tableLoading = true;
      await getArticleList(params).then(res => {
        if (res.state === 1) {
          this.tableData = res.data;
        }
        this.$nextTick(() => {
          this.tableLoading = false;
        });
      });
    },

    handleArticle(params) {
      const { id, title } = this.$route.query;
      this.title = title;

      const query = Object.assign({}, params, { keywordId: id });
      this.getArticleList(query);
    },

    handleMenu(name) {
      this.menuContent = this.activeName = name;
      if (name === 'Edit') {
        this.editStatus = true;
      }
    },

    changeAttribute(value) {
      _.find(this.tableData.data, el => {
        if (el['id'] === value['articleId']) {
          return el;
        }
      })['attribute'] = _.toNumber(value.infoType);
    },

    changePage(page) {
      this.currentPage = page;
      this.copyParams.page = page;
      this.$nextTick(() => {
        this.handleArticle(this.copyParams);
      });
    },
    handleSearch(state) {
      const query = Object.assign(this.copyParams, state);

      this.$nextTick(() => {
        this.handleArticle(query);
      });
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
