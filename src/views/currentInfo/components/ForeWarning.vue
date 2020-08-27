<template>
  <div>
    <Card>
      <div class="flex mb-5 p-2 border border-solid border-gray-400">
        <div>
          <span class="warning-title">预警设置</span>
          <span style="color: #999; font-size: 12px;" class="pl-2">
            通过设置预警接收方式（邮件、微信、客户端）等接收最新相关预警信息，达到及时通知、及时预警的效果
          </span>
        </div>
        <div class="ml-auto">
          <i-switch v-model="switchState" />
          <span class="ml-2">{{ switchState | filterText }}</span>
        </div>
      </div>

      <template v-if="selected['state']">
        <Form>
          <div class="mt-10">
            <span class="warning-title">预警条件设置</span>
            <FormItem
              v-for="(item, index) in conditions"
              :key="index"
              :label="item.label"
            >
              <RadioGroup
                v-for="(sub, subIndex) in item.value"
                :key="subIndex"
                v-model="selected[item.key]"
                size="small"
              >
                <Radio :label="subIndex">
                  {{ sub.label }}
                </Radio>
              </RadioGroup>
            </FormItem>
          </div>

          <div class="mt-10">
            <span class="warning-title">预警方式设置</span>
            <List>
              <ListItem
                v-for="(item, index) in notification"
                :key="index"
                class="flex"
                style="line-height: 32px"
              >
                <span>
                  {{ item.label }}
                </span>

                <template v-if="item['isActive'] && item.label !== '系统推送'">
                  <Input
                    v-model="selected[item.key]"
                    style="width: 280px"
                    class="ml-5"
                    placeholder="请填写信息"
                  />
                </template>

                <i-switch
                  v-model="item['isActive']"
                  class="ml-auto"
                />
              </ListItem>
            </List>
          </div>

          <div class="mt-10">
            <span class="warning-title">预警时间设置</span>
            <FormItem label="接收时间: ">
              <TimePicker
                v-model="selected['startTime']"
                format="HH:mm"
                type="time"
                placeholder="开始时间"
                style="width: 168px"
              />
              <span>-</span>
              <TimePicker
                v-model="selected['endTime']"
                format="HH:mm"
                type="time"
                placeholder="结束时间"
                style="width: 168px"
              />
            </FormItem>

            <FormItem label="预警间隔: ">
              <template v-for="item in buttonGroup">
                <Button
                  :key="item.label"
                  class="mr-2"
                  :type="selected['warningType'] === item.value ? 'primary' : 'default'"
                  @click="handleButton(item)"
                >
                  {{ item.label }}
                </Button>
              </template>

              <template v-if="selected['warningType'] === 1">
                <Slider
                  v-model="selected['warningInterval']"
                  style="width: 470px"
                  :marks="marks"
                  show-stops
                  :step="10"
                  :min="0"
                  :max="80"
                />
              </template>
            </FormItem>

            <FormItem label="周末预警: ">
              <template v-for="item in buttonWeekend">
                <Button
                  :key="item.label"
                  class="mr-2"
                  :type="selected['weekend'] === item.value ? 'primary' : 'default'"
                  @click="handleWeekend(item)"
                >
                  {{ item.label }}
                </Button>
              </template>
            </FormItem>

            <FormItem label="无预警通知: ">
              <i-switch />
              <span class="ml-5">打开开关，当日无预警信息时，会下发提示</span>
            </FormItem>
          </div>
        </Form>
      </template>

      <div class="flex justify-center">
        <Button
          type="primary"
          class="mr-5"
          @click="handleSubmit"
        >
          保存
        </Button>
        <Button>返回</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { setWarning, getWarning } from '../api';

const conditions = [
  {
    label: '信息属性:',
    key: 'attribute',
    value: [
      { label: '全部' },
      { label: '非敏感' },
      { label: '中性' },
      { label: '敏感' }
    ]
  },
  {
    label: '来源网站:',
    key: 'source',
    value: [
      { label: '全部' },
      { label: '微博' },
      { label: '网站' },
      { label: '新闻' },
      { label: '政务' },
      { label: '微信' },
      { label: '论坛' }
    ]
  },
  {
    label: '匹配方式: ',
    key: 'searchType',
    value: [
      { label: '全文' },
      { label: '标题' },
      { label: '正文' }
    ]
  },
  {
    label: '预警去重:',
    key: 'isRepeat',
    value: [
      { label: '关闭' },
      { label: '开启' }
    ]
  }
  // {
  //   label: '相似文章:',
  //   value: [{ label: '合并' }, { label: '不合并' }]
  // },
  // {
  //   label: '结果呈现:',
  //   value: [{ label: '全部信息' }, { label: '正常信息' }, { label: '精准信息' }]
  // },
  // {
  //   label: '涉及方式:',
  //   value: [{ label: '全部' }, { label: '内容涉及' }, { label: '定位涉及' }]
  // },
  // {
  //   label: '来源网站:',
  //   value: [{ label: '全部' }, { label: '定向信源' }, { label: '贴吧' }]
  // },
];

const notification = [
  { label: '微信', key: 'WeChat', isActive: false },
  { label: '短信', key: 'mobile', isActive: false },
  { label: '邮件', key: 'email', isActive: false },
  { label: '系统推送', key: 'system', isActive: false }
];

const buttonGroup = [
  { label: '定时预警', value: 1 },
  { label: '实时预警', value: 2 }
];

const buttonWeekend = [
  { label: '周末预警', value: 1 },
  { label: '周末不预警', value: 2 }
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
      selected: {
        attribute: 0,
        source: 0,
        searchType: 0,
        isRepeat: 0,
        system: 0, // 0 是关闭， 1 是开启
        WeChat: '',
        mobile: '',
        email: '',
        startTime: undefined,
        endTime: undefined,
        warningType: 2, // 1 预警， 2 不预警
        warningInterval: undefined,
        weekend: 1,
        state: 0
      },
      conditions,
      notification,
      buttonGroup,
      buttonWeekend,
      switchState: false,
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
  watch: {
    switchState(val) {
      this.selected.state = val ? 1 : 0;
    }
  },
  mounted() {
    const { id } = this.$route.query;
    this.getWarning({ keywordId: id });
  },
  methods: {
    async getWarning(params) {
      await getWarning(params).then(res => {
        const result = res.data;

        if (!_.isEmpty(result)) {
          const { state } = result;
          this.switchState = !!state;

          // 如果预警方式有值，则改变状态
          ['WeChat', 'email', 'mobile', 'system'].map(el => {
            if (result[el] !== '' && result[el] !== 0) {
              this.notification.map(item => {
                if (item['key'] === el) {
                  item['isActive'] = true;
                }
              });
            }
          });

          this.selected = Object.assign({}, result);
        } else {
          this.notification.map(el => {
            el['isActive'] = false;
          });
        }
      });
    },
    async setWarning(params) {
      const status = { true: 1, false: 0 };

      await setWarning(Object.assign({}, params, {
        keywordId: this.$route.query.id,
        system: status[_.last(this.notification)['isActive']]
      })).then(res => {
        this.$Message.success(res.message);
      });
    },

    handleSubmit() {
      if (this.switchState) {
        this.setWarning(this.selected);
      }
    },

    handleButton(item) {
      this.selected['warningType'] = item['value'];
    },

    handleWeekend(item) {
      this.selected['weekend'] = item['value'];
    }
  }
};
</script>

<style lang="scss" scoped>
.warning-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
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
