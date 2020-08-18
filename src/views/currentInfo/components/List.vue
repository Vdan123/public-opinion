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
            <Button type="primary">查询</Button>
          </ListItem>
        </List>
      </Card>
    </div>
    <div>
      <Card>
        <Table
          border
          :columns="tableColumns"
          :data="sourceData"
        />
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
  { title: '标题', key: '' },
  { title: '相似文章', key: '' },
  { title: '来源', key: 'source_name' },
  { title: '时间', key: 'ins_time' }
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
    }
  },
  methods: {
    collectionKeys({ key }, { text }) {
      console.log(text, 'oo');
      console.log(key, 'key');
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
</style>
