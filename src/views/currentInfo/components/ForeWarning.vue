<template>
  <div>
    <Card>
      <div class="flex">
        <div>
          <span class="warning-title">预警设置</span>
          <span style="color: #999; font-size: 12px;" class="pl-2">
            通过设置预警接收方式（邮件、微信、客户端）等接收最新相关预警信息，达到及时通知、及时预警的效果
          </span>
        </div>
        <div class="ml-auto">
          <i-switch v-model="status" />
          <span class="ml-2">{{ status | filterText }}</span>
        </div>
      </div>
      <template v-if="status">
        <Form>
          <div class="mt-10">
            <span class="warning-title">预警词设置</span>
            <div class="page-label">
              <span class="pl-2">
                什么是预警词：您可设置3组预警词，通过空格区分，系统将根据预警词推送相关预警信息；如果不设，系统会给您推送与监测方案相关的信
              </span>
            </div>

            <span>设置预警词: </span>
            <Input style="width: 280px" />
          </div>

          <div class="mt-10">
            <span class="warning-title">预警条件设置</span>

            <FormItem
              v-for="(item,index) in conditions"
              :key="index"
              :label="item.label"
            >
              <RadioGroup v-for="sub in item.value">
                <Radio :label="sub.label" />
              </RadioGroup>
            </FormItem>
          </div>

          <div class="mt-10">
            <span class="warning-title">预警方式设置</span>
            <List>
              <ListItem v-for="item in source">
                <span>{{ item.label }}</span>
                <i-switch />
              </ListItem>
            </List>
          </div>

          <div class="mt-10">
            <span class="warning-title">预警时间设置</span>
            <FormItem label="接收时间: ">
              <TimePicker type="time" placeholder="开始时间" style="width: 168px" />
              <TimePicker type="time" placeholder="结束时间" style="width: 168px" />
            </FormItem>
            <FormItem label="预警间隔">
              <Button>定时预警</Button>
              <Button>实时预警</Button>
              <Slider
                v-model="value11"
                style="width: 470px"
                :marks="marks"
                show-stops
                :step="10"
                :min="0"
                :max="80"
              />
            </FormItem>
            <FormItem label="周末预警: ">
              <Button>周末预警</Button>
              <Button>周末不预警</Button>
            </FormItem>
            <FormItem label="无预警通知: ">
              <i-switch />
              <span>打开开关，当日无预警信息时，会下发提示</span>
            </FormItem>
          </div>
        </Form>
      </template>

      <div class="flex justify-center">
        <Button type="primary" class="mr-5" @click="handleSubmit">保存</Button>
        <Button>返回</Button>
      </div>
    </Card>
  </div>
</template>

<script>

const conditions = [
  {
    label: '信息属性:',
    value: [{ label: '全部' }, { label: '敏感' }, { label: '中性' }, { label: '非敏感' }]
  },
  {
    label: '来源网站:',
    value: [{ label: '全部' }, { label: '微博' }, { label: '网站' }, { label: '新闻' }, { label: '政务' }, { label: '微信' }, { label: '论坛' }]
  },
  {
    label: '相似文章:',
    value: [{ label: '合并' }, { label: '不合并' }]
  },
  {
    label: '来源网站:',
    value: [{ label: '全部' }, { label: '定向信源' }, { label: '贴吧' }]
  },
  {
    label: '结果呈现:',
    value: [{ label: '全部信息' }, { label: '正常信息' }, { label: '精准信息' }]
  },
  {
    label: '匹配方式: ',
    value: [{ label: '全文' }, { label: '正文' }, { label: '标题' }]
  },
  {
    label: '涉及方式:',
    value: [{ label: '全部' }, { label: '内容涉及' }, { label: '定位涉及' }]
  },
  {
    label: '预警去重:',
    value: [{ label: '关闭' }, { label: '开启' }]
  }
];

const source = [
  { label: '微信' },
  { label: '短信' },
  { label: '邮件' },
  { label: '系统推送' }
];

export default {
  filters: {
    filterText(status) {
      const text = {
        true: '开',
        false: '关'
      };
      return text[status];
    }
  },
  data() {
    return {
      status: true,
      conditions,
      source,
      value11: 20,
      marks: {
        10: '5分钟',
        20: '15分钟',
        30: '30分钟',
        40: '1小时',
        50: '2小时',
        60: '5小时',
        70: '8小时'
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$Message.warning('无操作权限，请联系管理员');
    }
  }
};
</script>

<style lang="scss" scoped>
.warning-title {
  font-size: 14px;
  font-weight: 700;
}
.page-label {
  margin: 10px 0;
  height: 32px;
  line-height: 32px;
  background: #f1fcfc;
  color: #8492a6;
  font-weight: 400;
}
</style>
