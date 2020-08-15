<template>
  <div>
    <div class="widget-container">
      <Card dis-hover>
        <div
          v-for="(item, index) in SearchButtons"
          :key="index"
        >
          <span>
            {{ item.key }}
          </span>
          <Button
            v-for="button in item.value"
            :key="button.label"
            size="small"
            type="text"
          >
            {{ button.label }}
          </Button>
        </div>
      </Card>
    </div>
    <div>
      <Card>
        <Table
          border
          :columns="tableColumns"
          :data="[]"
        />
      </Card>
    </div>
  </div>
</template>

<script>
const SearchButtons = [
  {
    key: '监测时间：',
    value: [
      { label: '今天' },
      { label: '24小时' },
      { label: '2天' },
      { label: '3天' },
      { label: '7天' },
      { label: '自定义' }
    ]
  },
  {
    key: '信息属性：',
    value: [
      { label: '全部' },
      { label: '敏感' },
      { label: '非敏感' }
    ]
  },
  {
    key: '信息排序：',
    value: [
      { label: '时间降序' },
      { label: '时间升序' },
      { label: '相似文章数' }
    ]
  },
  {
    key: '匹配方式：',
    value: [
      { label: '按全文' },
      { label: '按标题' },
      { label: '按正文' }
    ]
  },
  {
    key: '信息浏览：',
    value: [
      { label: '已读' },
      { label: '未读' }
    ]
  }
];

const tableColumns = [
  { title: '标题', key: '' },
  { title: '相似文章', key: '' },
  { title: '来源', key: '' },
  { title: '时间', key: '' }
];

export default {
  name: 'List',
  data() {
    return {
      SearchButtons,
      tableColumns
    };
  }
};
</script>

<style lang="scss" scoped>
.widget-container {
  padding: 10px 0;
}
</style>
