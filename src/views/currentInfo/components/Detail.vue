<template>
  <div>
    <div class="mb-5">
      <Breadcrumb>
        <BreadcrumbItem to="/">舆情监测</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">石家庄</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="grid-div row-span-3">
        <Card>
          <List>
            <ListItem>
              来源: 新浪微博
            </ListItem>
            <ListItem>
              发布时间: 2020-08-20 17:54:41
            </ListItem>
            <ListItem>
              作者: 有时很神奇30774
            </ListItem>
            <ListItem>
              首发网站: 新浪微博
            </ListItem>
            <ListItem>
              属性: 敏感
            </ListItem>
            <ListItem>
              涉及关键词: 政府
            </ListItem>
            <ListItem>
              已读用户: wdataworld
            </ListItem>
            <ListItem>
              原文链接: http://weibo.com/7488666497/JgO3fkIJX
            </ListItem>
          </List>

          <div class="detail-toolbar">
            <ul class="flex">
              <li>收藏</li>
              <li>加入简报</li>
              <li>分享</li>
              <li>删除</li>
              <li>敏感</li>
              <li>反馈</li>
              <li>复制链接</li>
            </ul>
          </div>

          <div class="detail-news">
            正文
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
export default {

};
</script>

<style lang="scss" scoped>
.detail-news {
  position: relative;
  margin-top: 30px;
  border: 1px solid #ebecf0;
  padding: 15px 10px 15px;
}
</style>
