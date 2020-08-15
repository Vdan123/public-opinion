<template>
  <div>
    <Menu mode="horizontal" @on-select="handleMenu">
      <MenuItem
        v-for="item in menu"
        :key="item.key"
        :name="item.key"
      >
        {{ item.label }}
      </MenuItem>
    </Menu>
    <Content>
      <component :is="menuContent" />
    </Content>
  </div>
</template>

<script>
import List from '@/views/currentInfo/components/List';
import Analysis from '@/views/currentInfo/components/Analysis';
import ForeWarning from '@/views/currentInfo/components/ForeWarning';

const menu = [
  { label: '信息列表', key: 'List' },
  { label: '图表分析', key: 'Analysis' },
  { label: '预警设置', key: 'ForeWarning' },
  { label: '修改方案', key: 'Edit' }
];

export default {
  components: {
    List,
    Analysis,
    ForeWarning
  },
  data() {
    return {
      menu,
      menuContent: 'List'
    };
  },
  methods: {
    handleMenu(name) {
      this.menuContent = name;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
