<template>
  <div>
    <List class="swiper-container" item-layout="vertical" size="small">
      <ListItem
        v-for="(item, index) in currentMessage"
        :key="index"
      >
        <router-link :to="'/current/detail/'+item.id" target="_blank">
          <span v-html="item.content" />
        </router-link>
        <template slot="action">
          <li v-html="item.ins_time" />
          <li v-html="item.sourceName" />
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  props: {
    currentMessage: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 470px;
  overflow: hidden;
}
.min {
  width: 20px;
  height: 20px;
  line-height: 1.7;
  background-color: #f57676;
  color: #fff;
  text-align: center;
  display: inline-block;
}
</style>
