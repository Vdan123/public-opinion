<template>
  <div>
    <List class="swiper-container" item-layout="vertical" size="small">
      <ListItem
        v-for="(item, index) in sensitiveMessage"
        :key="index"
      >
        <div style="width: 30px; float: left">
          <span class="min">敏</span>
        </div>
        <span>
          {{ item.content }}
        </span>
        <template slot="action">
          <li>
            {{ item.ins_time }}
          </li>
          <li>
            {{ item.sourceName }}
          </li>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  props: {
    sensitiveMessage: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    };
  },
  computed: {
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
