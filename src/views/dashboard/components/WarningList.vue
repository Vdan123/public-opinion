<template>
  <List class="warning-list-container">
    <ListItem
      v-for="(item, index) in warningList"
      :key="index"
    >
      <div class="flex items-start">
        <span class="iconfont icon-icon-test6 warning" />

        <div class="ml-3">
          <router-link :to="'/current/detail/'+item.id">
            <span v-html="item.content" />
          </router-link>
          <ul class="flex justify-start items-center" style="padding-top: 16px">
            <li class="swiper-li">
              {{ item.ins_time }}
            </li>
            <Divider type="vertical" />
            <li class="swiper-li">
              {{ item.sourceName }}
            </li>
            <Divider type="vertical" />
            <li class="swiper-li">
              <div class="todo-tags sm:ml-2 sm:my-0 my-2 flex">
                <Tag :color="todoLabelColor(item.attribute)">
                  {{ item.attribute | attribute }}
                </Tag>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </ListItem>
  </List>
</template>

<script>
export default {
  name: 'WarningList',
  filters: {
    attribute(val) {
      const label = {
        1: '非敏感',
        2: '中性',
        3: '敏感'
      };
      return label[val];
    }
  },
  props: {
    warningList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    todoLabelColor() {
      return (label) => {
        const tags = [
          { tag: '非敏感', value: 1, describe: 'success' },
          { tag: '中性', value: 2, describe: 'warning' },
          { tag: '敏感', value: 3, describe: 'error' }
        ];
        return _.find(tags, (tag) => {
          return tag.value === label;
        }).describe;
      };
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
  color: #f90;
  width: 20px;
  height: 20px;
  margin: 0;
}

</style>
