<template>
  <div>
    <span>发送时间</span>
    <DatePicker type="" />
    <DatePicker type="" />
    <Button>查询</Button>
    <Button>手动清除</Button>
    <Table :columns="columns" :data="[]" />
    <Page />
  </div>
</template>

<script>
const columns = [
  { title: '内容' },
  { title: '来源' },
  { title: '归属方案' },
  { title: '下发时间' }
];

export default {
  name: 'Notice',
  data() {
    return {
      columns
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
