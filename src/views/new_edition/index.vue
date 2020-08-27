<template>
  <div>
    <Card>
      <template v-if="!editState">
        <div slot="title" class="flex items-center">
          <span>创建监测方案</span>
          <template>
            <Button class="ml-auto" @click="handleBack">返回</Button>
          </template>
        </div>
      </template>

      <div class="page-label">
        <span style="padding-left: 6px">
          什么是监测方案：监测方案是与您相关或者您关注的词条，通过您设置的词条，系统将把互联网中与您相关的舆情信息第一时间通知您。
        </span>
      </div>

      <Form
        ref="newEditionForm"
        :model="formItem"
        :rules="ruleValid"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="方案名称: " prop="planName">
          <Input v-model="formItem.planName" style="width: 380px" maxlength="20" show-word-limit />
          <span style="color: #999; margin-left: 10px">方案的字数请尽量控制在20个字以内</span>
        </FormItem>

        <FormItem label="所属文件夹: " prop="groupId">
          <Select v-model="formItem.groupId" style="width: 300px">
            <Option
              v-for="item in getGroups"
              :key="item.id"
              :value="item.id"
            >
              {{ item.group_name }}
            </Option>
          </Select>
        </FormItem>

        <FormItem
          v-for="item in keyWords"
          :key="item.label"
          :label="item.label"
        >
          <Input
            v-model="formItem.words[item.key]"
            :autosize="{ minRows: 2, maxRows: 6 }"
            placeholder="关键词之间请用 '+' 隔开"
            maxlength="500"
            show-word-limit
            type="textarea"
          />
          <a href="javascript:void(0)" class="float-right" style="color: #04cb94" @click="handleLibrary">舆情词库</a>
        </FormItem>

        <FormItem>
          <div class="flex justify-center">
            <Button type="primary" class="mr-5" @click="handleSubmit">保存</Button>
            <Button @click="handleBack">取消，并返回列表</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
    <Modal v-model="library" title="舆情词库">
      <span>舆情词库内容正在对接中...</span>
    </Modal>
  </div>
</template>

<script>
import { addKeywords, editKeywords, getKeywords } from './api';

const keyWords = [
  { label: '主关键字：', key: 'mainKeyword' },
  { label: '子关键字：', key: 'subKeyword' },
  { label: '排除关键字：', key: 'excludeKeyword' }
];

const validatePass = (rule, value, callback) => {
  if (value.length === 0) {
    return callback(new Error());
  }
  callback();
};

export default {
  name: 'NewEdition',
  props: {
    editState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyWords,
      formItem: {
        planName: '',
        groupId: '',
        words: {
          mainKeyword: '',
          subKeyword: '',
          excludeKeyword: ''
        }
      },
      ruleValid: {
        planName: [{ required: true, message: '请填写方案名称', trigger: 'blur' }],
        groupId: [{ validator: validatePass, message: '请选择群组', trigger: 'change' }]
      },
      library: false
    };
  },
  computed: {
    getGroups() {
      return this.$store.state.group.list;
    }
  },
  mounted() {
    this.$store.dispatch('group/getAllGroups');
    if (this.editState) {
      const { group_id, id } = this.$route.query;
      this.getKeywords({ groupId: group_id }, id);
    }
  },
  methods: {
    async getKeywords(params, id) {
      await getKeywords(params).then(res => {
        const result = _.find(res.data, { id: _.toNumber(id) });

        if (!_.isUndefined(result)) {
          const { plan_name: planName,
            exclude_keyword: excludeKeyword,
            main_keyword: mainKeyword,
            sub_keyword: subKeyword,
            group_id: groupId } = result;

          this.formItem = {
            planName,
            groupId,
            words: {
              mainKeyword,
              subKeyword,
              excludeKeyword
            }
          };
        }
      });
    },
    async addKeywords(params) {
      await addKeywords(params).then(res => {
        if (res.state === 1) {
          this.$Message.success(res.message);
          this.$nextTick(() => {
            this.$store.dispatch('group/getGroupPlan');
          });
        }
      });
    },
    async editKeywords(params) {
      await editKeywords(params).then(res => {
        if (res.state === 1) {
          this.$Message.success(res.message);
          this.$nextTick(() => {
            this.$store.dispatch('group/getGroupPlan');
          });
        }
      });
    },
    handleSubmit() {
      this.$refs['newEditionForm'].validate(valid => {
        if (valid) {
          const mergedItems = _.merge(this.formItem, this.formItem['words']);
          delete mergedItems['words'];

          if (this.editState) {
            const { id } = this.$route.query;
            this.editKeywords(Object.assign({}, mergedItems, { id }));
          } else {
            this.addKeywords(mergedItems);
          }

          this.$router.push({ path: '/current' });
        }
      });
    },
    handleBack() {
      this.$router.push({ name: 'Current' });
    },
    handleLibrary() {
      this.library = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-label {
  margin-bottom: 20px;
  height: 32px;
  line-height: 32px;
  background: #f1fcfc;
  color: #8492a6;
  font-weight: 400;
}
</style>
