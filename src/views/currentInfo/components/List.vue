<template>
  <div>
    <div class="widget-container">
      <Card dis-hover>
        <List size="small">
          <ListItem
            v-for="(item, index) in SearchButtons"
            :key="index"
          >
            <span class="search-container">
              {{ item.label }}
            </span>
            <Button
              v-for="button in item.value"
              :key="button.label"
              class="search-container"
              :type="collections[item.key] === button.text ? 'primary' : 'default'"
              size="small"
              @click="collectionKeys(item.key, button.text)"
            >
              {{ button.label }}
            </Button>
          </ListItem>
          <ListItem class="flex justify-center mt-5">
            <Button type="primary" @click="handleSearch">查询</Button>
            <Button class="ml-2">清空查询条件</Button>
          </ListItem>
        </List>
      </Card>
    </div>
    <div>
      <Card>
        <div class="flex justify-center mb-2">
          <Page
            simple
            :total="tableTotal"
            :current="currentPage"
            :page-size="50"
            @on-change="changePage"
          />
          <!-- <a href="javascript:void(0)">默认收藏夹</a>
          <a href="javascript:void(0)">标记已读</a>
          <a href="javascript:void(0)">删除</a> -->
          <!-- <Input
            style="width: 504px"
            placeholder="在结果中搜索，支持单个词组"
          />
          <Select slot="prepend" style="width: 80px">
            <Option value="day">按全文</Option>
            <Option value="month">按标题</Option>
            <Option value="month">按作者</Option>
          </Select>
          <Button slot="append" icon="ios-search" />
          </Input> -->
        </div>
        <Table
          border
          :columns="tableColumns"
          :data="sourceData"
          :loading="tableLoading"
        >
          <template slot="title" slot-scope="{ row }">
            <div class="news-content">
              <template v-if="row.title !== ''">
                <span class="news-content-title" v-html="row.title" />
              </template>
              <template v-else>
                <span class="news-content-title">
                  {{ row.auther }}
                </span>
              </template>

              <Dropdown trigger="click">
                <Button
                  size="small"
                  class="mx-2"
                  :type="row.attribute === 1 ||
                    row.attribute === 2 ?
                      'primary' : 'error'"
                >
                  {{ row.attribute | filterText }}
                  <Icon type="ios-arrow-down" />
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem
                    v-for="(item, key) in textState"
                    :key="key"
                    :name="key"
                    @click.native="handleChangeState(key, row)"
                  >
                    {{ item }}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button size="small">纠错</Button>

              <router-link :to="'/current/detail/'+row.id">
                <div class="item-title" v-html="row.content" />
              </router-link>
              <div class="news-item-tools font-size-0">
                <ul class="flex my-2">
                  <li
                    v-for="(item, index) in tools"
                    :key="index"
                    class="pr-1"
                  >
                    <a href="javascript:void(0)">
                      {{ item.label }}
                    </a>
                    <Divider type="vertical" />
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </Table>
      </Card>
    </div>
  </div>
</template>

<script>
import { setArticleAttribute, getSource } from '../api';

const SearchButtons = [
  {
    label: '监测时间：',
    key: 'testingTime',
    value: [
      { label: '今天', text: 1 },
      { label: '24小时', text: 2 },
      { label: '2天', text: 3 },
      { label: '3天', text: 4 },
      { label: '7天', text: 5 },
      { label: '自定义', text: 6 }
    ]
  },
  {
    label: '信息属性：',
    key: 'infoType',
    value: [
      { label: '全部', text: 0 },
      { label: '非敏感', text: 1 },
      { label: '中性', text: 2 },
      { label: '敏感', text: 3 }
    ]
  },
  {
    label: '信息排序：',
    key: 'infoSort',
    value: [
      { label: '时间降序', text: 1 },
      { label: '时间升序', text: 2 },
      { label: '相似文章数', text: 3 },
      { label: '采集降序', text: 4 }
    ]
  },
  {
    label: '匹配方式：',
    key: 'searchType',
    value: [
      { label: '按全文', text: 0 },
      { label: '按标题', text: 1 },
      { label: '按正文', text: 2 }
    ]
  },
  {
    label: '信息浏览：',
    key: 'isRead',
    value: [
      { label: '全部', text: 0 },
      { label: '未读', text: 1 },
      { label: '已读', text: 2 }
    ]
  },
  {
    label: '信息来源：',
    key: 'source',
    value: [
      { label: '全部', text: 0 },
      { label: '新浪微博', text: 1 },
      { label: '今日头条', text: 2 }
    ]
  }
];

const tableColumns = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  { title: '标题', slot: 'title' },
  // 相似文章，暂定
  { title: '相似文章', maxWidth: 100, render: (h) => h('div', 1), align: 'center' },
  { title: '来源', key: 'sourceName', maxWidth: 100, align: 'center' },
  { title: '时间', key: 'ins_time', maxWidth: 120, align: 'center' }
];

const textState = {
  1: '非敏感',
  2: '中性',
  3: '敏感'
};

const tools = [
  // { label: '涉及词' },
  { label: '默认收藏夹' },
  // { label: '查看原文' },
  { label: '标记已读' },
  { label: '删除' }
];

export default {
  name: 'TableList',
  inject: ['project'],
  filters: {
    filterText(state) {
      const textState = {
        1: '非敏感',
        2: '中性',
        3: '敏感'
      };
      return textState[state];
    }
  },
  data() {
    return {
      SearchButtons,
      tableColumns,
      textState,
      tools,
      collections: {
        testingTime: 1,
        infoType: 0,
        searchType: 0,
        isRead: 0,
        infoSort: 1,
        source: 0
      }
    };
  },
  computed: {
    sourceData() {
      return this.project.tableData.data;
    },
    tableLoading() {
      return this.project.tableLoading;
    },
    tableTotal() {
      return this.project.tableData.total;
    },
    currentPage() {
      return this.project.currentPage;
    }
  },
  // mounted() {
  //   this.getSource()
  // },
  methods: {
    async setArticleAttribute(params) {
      await setArticleAttribute(params).then(res => {
        if (res.state === 1) {
          this.$emit('changeAttribute', params);
        }
      });
    },

    // async getSource() {
    //   await getSource({}).then(res => {
    //     console.log(res);
    //   })
    // },

    handleChangeState(state, { id, attribute }) {
      if (_.toNumber(state) !== attribute) {
        this.setArticleAttribute({
          articleId: id,
          infoType: state
        });
      }
    },

    changePage(page) {
      this.$emit('changePage', page);
    },

    collectionKeys(key, value) {
      this.collections[key] = value;
    },

    handleSearch() {
      this.$emit('handleSearch', this.collections);
    }
  }
};
</script>

<style lang="scss" scoped>
.widget-container {
  padding-bottom: 10px;
  .search-container {
    display: inline-block;
    padding: 0 5px;
    margin: 0 5px 0 0;
    font-size: 12px;
    line-height: 1.5;
    -o-transition: all .2s linear;
    transition: all .2s linear;
  }
}
.news-content {
  padding: 10px;
  width: calc(100% - 34px);
  vertical-align: middle;

}
.news-content-title {
  color: #1A1A1A;
  font-size: 16px;
  max-width: calc(100% - 200px);
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.item-title {
  margin: 10px 0 0;
  line-height: 24px;
  font-size: 14px;
  color: #666;
}
</style>
