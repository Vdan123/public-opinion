<template>
  <div>
    <Breadcrumb class="mb-6">
      <BreadcrumbItem to="/dashboard/index">总览</BreadcrumbItem>
      <BreadcrumbItem>方案名</BreadcrumbItem>
      <BreadcrumbItem>详情页</BreadcrumbItem></BreadcrumbItem>
    </Breadcrumb>
    <Card class="mb-base" :shadow="true" :dis-hover="true">
      <List :border="true" size="small">
        <ListItem
          v-for="(item, index) in detailList"
          :key="index"
        >
          <span>
            {{ item.label }} ：
          </span>
          <template v-if="item.label === '原文链接'">
            <a :href="item.value" target="_bank" class="title-ellipsis">
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
        <!-- <ListItem>
          <ul class="flex">
            <li>收藏</li>
            <li>加入简报</li>
            <li>分享</li>
            <li>删除</li>
            <li>敏感</li>
            <li>反馈</li>
            <li>复制链接</li>
          </ul>
        </ListItem> -->
      </List>
    </Card>
    <Row type="flex" :gutter="10">
      <div class="lg:w-2/3 w-full">
        <i-col>
          <Card title="正文" class="mb-base" :shadow="true" :dis-hover="true">
            <!-- 判断如果有 title 则显示，没有则不显示 -->
            <!-- <div class="detail-title">

            {{ listObject.title }}
          </div> -->

            <div class="detail-news">
              <p class="detail-news-body" v-html="listObject.content " />
            </div>
          </Card>
        </i-col>
      </div>

      <div class="lg:w-1/3 w-full">
        <i-col>
          <Card title="相同文章" class="mb-base" :shadow="true" :dis-hover="true">
          </Card>
        </i-col>
      </div>
    </Row>
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

.d-theme-border-grey-light {
  // @apply border-grey-light;
  border-color: #dae1e7;
}
</style>
