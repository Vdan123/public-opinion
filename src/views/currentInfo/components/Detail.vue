<template>
  <div>
    <div class="mb-5">
      <Breadcrumb>
        <BreadcrumbItem>舆情监测</BreadcrumbItem>
        <BreadcrumbItem>##方案名##</BreadcrumbItem>
      </Breadcrumb>
    </div>

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
              <template v-else>
                <span>
                  {{ item.value }}
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
            正文

            <p v-html="listObject.content " />
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

const detailKeys = {
  sourceName: '来源',
  ins_time: '发布时间',
  auther: '作者',
  attribute: '属性',
  keywords: '涉及关键字',
  url: '原文链接'
};
export default {
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
    const { id } = this.$route.params;
    this.getDetails({ articleId: id });
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
.detail-news {
  position: relative;
  margin-top: 30px;
  border: 1px solid #ebecf0;
  padding: 15px 10px 15px;
}
.detail-title {
  font-size: 24px;
  color: #333;
  letter-spacing: .03em;
  text-align: center;
}
</style>
