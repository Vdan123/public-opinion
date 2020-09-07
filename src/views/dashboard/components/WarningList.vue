<template>
  <List class="warning-list-container">
    <ListItem
      v-for="(item, index) in warningList"
      :key="index"
    >
      <span class="warning mr-2">
        <Icon type="md-notifications-outline" />
      </span>
      <div>
        <router-link :to="'/current/detail/'+item.id">
          <span v-html="item.content" />
        </router-link>
        <ul class="flex justify-start items-center" style="padding-top: 16px">
          <li class="swiper-li" v-html="item.ins_time" />
          <Divider type="vertical" />
          <li class="swiper-li" v-html="item.sourceName" />
        </ul>
      </div>
    </ListItem>
  </List>
</template>

<script>
export default {
  name: 'WarningList',
  props: {
    warningList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.warning-list-container {
  height: 470px;
  overflow: scroll;
  scroll-behavior: smooth;
}

.warning {
  width: 20px;
  height: 20px;
  line-height: 1.7;
  background-color: #f90;
  color: #fff;
  text-align: center;
  display: inline-block;
}
</style>
