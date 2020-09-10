<template>
  <div>
    <div class="sub-nav-wrap" />

    <div class="grid grid-cols-2 gap-4">
      <div class="grid-div row-span-3">
        <Card>
          <!-- 判断如果有 title 则显示，没有则不显示 -->
          <!-- <div class="detail-title">

            {{ listObject.title }}
          </div> -->
          <List :border="true" size="small">
            <ListItem
              v-for="(item, index) in detailList"
              :key="index"
            >
              <span>
                {{ item.label }} ：
              </span>
              <template v-if="item.label === '原文链接'">
                <a :href="item.value" target="_bank">
                  {{ item.value }}
                </a>
              </template>
              <template v-else-if="item.label === '属性'">
                <tags-color :describe="item.value">
                  {{ item.value }}
                </tags-color>
              </template>
              <template v-else>
                <span>
                  {{ item.value | disposeArray }}
                </span>
              </template>
            </ListItem>
          </List>

          <!-- <div class="detail-toolbar">
            <ul class="flex">
              <li>收藏</li>
              <li>加入简报</li>
              <li>分享</li>
              <li>删除</li>
              <li>敏感</li>
              <li>反馈</li>
              <li>复制链接</li>
            </ul>
          </div> -->

          <div class="detail-news">
            <span class="detail-news-title">正文</span>

            <p class="detail-news-body" v-html="listObject.content " />
          </div>
        </Card>
      </div>
      <div class="grid-div">
        <Card>
          <p slot="title">关键词云</p>
        </Card>
      </div><div class="grid-div">
        <Card>
          <p slot="title">情感判断</p>
        </Card>
      </div><div class="grid-div">
        <Card>
          <p slot="title">实体识别</p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetails } from '../api';
import TagsColor from '@/components/TagsColor';

const detailKeys = {
  sourceName: '来源',
  ins_time: '发布时间',
  auther: '作者',
  attribute: '属性',
  keywords: '涉及关键字',
  url: '原文链接'
};
export default {
  filters: {
    disposeArray(value) {
      if (_.isArray(value)) {
        return value.join('、');
      }
      return value;
    }
  },
  components: {
    TagsColor
  },
  data() {
    return {
      detailKeys,
      listObject: {}
    };
  },
  computed: {
    detailList() {
      return _.transform(this.listObject, (result, value, key) => {
        if (_.includes(Object.keys(this.detailKeys), key)) {
          result.push({
            label: this.detailKeys[key],
            value
          });
        }
      }, []);
    }
  },
  mounted() {
    const { id, keywordId } = this.$route.params;
    this.getDetails({ articleId: id, keywordId });
  },
  methods: {
    async getDetails(params) {
      await getDetails(params).then(res => {
        if (res.state === 1) {
          this.listObject = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
a:link {
  color: #007db5;
  text-decoration: underline;
  text-decoration-color: #a2dffb;
}
.detail-news {
  position: relative;
  margin-top: 30px;
  border: 1px solid #ebecf0;
  padding: 15px 10px 15px;
  .detail-news-title {
    margin-bottom: 6px;
    font-weight: 700;
    font-size: 20px;
    color: #333;
    letter-spacing: 0;
    line-height: 30px;
  }
  .detail-news-body {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 2.1;
    text-align: justify;
    color: #4a4a4a;
  }
}
.detail-title {
  font-size: 24px;
  color: #333;
  letter-spacing: .03em;
  text-align: center;
}
</style>
