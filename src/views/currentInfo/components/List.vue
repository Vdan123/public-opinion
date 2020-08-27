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
              type="text"
              size="small"
              @click="collectionKeys(item, button)"
            >
              {{ button.label }}
            </Button>
          </ListItem>
          <ListItem>
            <Button type="primary" @click="handleSearch">查询</Button>
          </ListItem>
        </List>
      </Card>
    </div>
    <div>
      <Card>
        <div class="flex">
          <Checkbox>全选</Checkbox>
          <a href="javascript:void(0)">默认收藏夹</a>
          <a href="javascript:void(0)">标记已读</a>
          <a href="javascript:void(0)">删除</a>
          <Page :total="100" :current="2" simple />
          <Input
            style="width: 504px"
            placeholder="在结果中搜索，支持单个词组"
          />
          <Select slot="prepend" style="width: 80px">
            <Option value="day">按全文</Option>
            <Option value="month">按标题</Option>
            <Option value="month">按作者</Option>
          </Select>
          <Button slot="append" icon="ios-search" />
          </Input>
        </div>

        <Table
          border
          :columns="tableColumns"
          :data="sourceData"
          :loading="tableLoading"
        >
          <template slot="title" slot-scope="{ row }">
            <div class="news-content">
              <div class="news-content-title" v-html="row.title" />
              <!-- <div class="new-content-title">
                {{ row.auther}}
              </div> -->

              <Button size="small">敏感</Button>
              <Button size="small">纠错</Button>
              <router-link :to="'/current/detail/'+row.id" target="_blank">
                <div class="item-title" v-html="row.content" />
              </router-link>
              <div class="news-item-tools font-size-0">
                <a href="javascript:void(0)">涉及词</a>
                政府
                <a href="javascript:void(0)">默认收藏夹</a>
                <a href="javascript:void(0)">查看原文</a>
                <a href="javascript:void(0)">标记已读</a>
                <a href="javascript:void(0)">删除</a>
              </div>
            </div>
          </template>
        </Table>
      </Card>
    </div>
  </div>
</template>

<script>
const SearchButtons = [
  {
    label: '监测时间：',
    key: 'testingTime',
    value: [
      { label: '今天', text: 1, isActive: true },
      { label: '24小时', text: 2, isActive: false },
      { label: '2天', text: 3, isActive: false },
      { label: '3天', text: 4, isActive: false },
      { label: '7天', text: 5, isActive: false },
      { label: '自定义', text: 6, isActive: false }
    ]
  },
  {
    label: '信息属性：',
    key: 'infoType',
    value: [
      { label: '全部', text: 0, isActive: true },
      { label: '非敏感', text: 1, isActive: false },
      { label: '敏感', text: 2, isActive: false }
    ]
  },
  {
    label: '信息排序：',
    key: 'infoSort',
    value: [
      { label: '时间降序', text: 1, isActive: true },
      { label: '时间升序', text: 2, isActive: false },
      { label: '相似文章数', text: 3, isActive: false },
      { label: '采集降序', text: 4, isActive: false }
    ]
  },
  {
    label: '匹配方式：',
    key: 'searchType',
    value: [
      { label: '按全文', text: 0, isActive: true },
      { label: '按标题', text: 1, isActive: false },
      { label: '按正文', text: 2, isActive: false }
    ]
  },
  {
    label: '信息浏览：',
    key: 'isRead',
    value: [
      { label: '全部', text: 0, isActive: true },
      { label: '未读', text: 1, isActive: false },
      { label: '已读', text: 2, isActive: false }
    ]
  },
  {
    label: '信息来源：',
    key: 'source',
    value: [
      { label: '新浪微博', text: 1, isActive: true }
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

export default {
  name: 'TableList',
  inject: ['project'],
  data() {
    this.collections = {};
    return {
      SearchButtons,
      tableColumns
    };
  },
  computed: {
    sourceData() {
      return this.project.tableData.data;
    },
    tableLoading() {
      return this.project.tableLoading;
    }
  },
  methods: {
    collectionKeys({ key }, { text }) {

    },
    handleSearch() {
      this.$Message.warning('暂无权限操作，请联系管理员');
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
    line-height: 1.57142857;
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
