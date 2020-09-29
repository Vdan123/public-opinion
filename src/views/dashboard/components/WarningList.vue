<template>
  <List class="warning-list-container">
    <ListItem
      v-for="(item, index) in warningList"
      :key="index"
    >
      <div class="flex items-start">
        <span class="iconfont icon-icon-test6 warning" />

        <div class="ml-3">
          <div
            class="text-base font-bold mb-2 cursor-pointer title-ellipsis"
            v-html="item.title"
            @click="handleContent(item)"
          >
          </div>

          <span
            class="cursor-pointer text-ellipsis"
            v-html="item.content"
            @click="handleContent(item)"
          />
          <ul class="flex justify-start items-center" style="padding-top: 16px">
            <li class="swiper-li">
              <div class="todo-tags sm:ml-2 sm:my-0 my-2 flex">
                <tags-color :numbers="item.attribute">
                  <template v-slot:default="slotProps">
                    {{ transformAttribute(slotProps.tags, item.attribute ) }}
                  </template>
                </tags-color>
              </div>
            </li>
            <Divider type="vertical" />
            <li class="swiper-li">
              <!-- 跳转方案 -->
              <Icon type="ios-folder-open" />
              <router-link :to="{path: '/current/search', query: { group_id: item.group_id, id: item.keywordId, title: item.plan_name}}">
                {{ item.plan_name }}
              </router-link>
            </li>

            <Divider type="vertical" />
            <li class="swiper-li">
              {{ item.source }}
            </li>

            <Divider type="vertical" />
            <li class="swiper-li">
              {{ item.ins_time }}
            </li>
          </ul>
        </div>
      </div>
    </ListItem>
  </List>
</template>

<script>
import TagsColor from '@/components/TagsColor';
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
  components: {
    TagsColor
  },
  props: {
    warningList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    transformAttribute() {
      return (tags, attribute) => {
        return _.find(tags, el => el.value === attribute).tag;
      };
    }
  },
  methods: {
    handleContent({ id, keywordId } = {}) {
      this.$router.push({ name: 'Detail', params: { id, keywordId }});
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
