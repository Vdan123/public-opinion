<template>
  <div>
   <Breadcrumb class="mb-4">
     <BreadcrumbItem>
     <a href="javascript:history.go(-1)">
        返回
     </a>
     </BreadcrumbItem>
     <BreadcrumbItem>
        预警记录
     </BreadcrumbItem>
   </Breadcrumb>
    <Card>
      <div class="flex flex-wrap items-center">

        <span class="mb-4 md:mb-0 md:mr-4"> 总共： {{ tableTotal }} 条</span>

        <span class="mb-4 md:mb-0 md:mr-4">发送时间：</span>

        <DatePicker
          type="date"
          class="mb-4 md:mb-0 mr-4"
          @on-change="handleStartTime"
        />

        <DatePicker
          type="date"
          class="mb-4 md:mb-0 mr-4"
          @on-change="handleEndTime"
        />

        <Button
          type="primary"
          class="mb-4 md:mb-0 mr-4"
          @click="handleSearch"
        >
          查询
        </Button>

        <Button
          class="mb-4 md:mb-0 md:ml-auto"
          @click="handleRead"
        >
          标记已读
        </Button>
      </div>

      <Table
        border
        class="w-100 my-4"
        :loading="tableLoading"
        :columns="columns"
        :data="tableList"
        @on-selection-change="handleSelect"
      />
      <Page
        :current="params.page"
        :total="tableTotal"
        :page-size="params.limit"
        show-sizer
        @on-change="handleChangePage"
        @on-page-size-change="handlePageSize"
      />

    </Card>
  </div>
</template>

<script>
import { getWarningRecords, upRead } from './api';
import NoticeContent from './components/Content';

const tags = [
  { tag: '暂无', value: 0, describe: 'default' },
  { tag: '非敏感', value: 1, describe: 'success' },
  { tag: '中性', value: 2, describe: 'warning' },
  { tag: '敏感', value: 3, describe: 'error' }
];

export default {
  name: 'Notice',
  components: {
    NoticeContent
  },
  data() {
    return {
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '内容', render: (h, params) => {
          return h('span', {
            on: {
              click: () => {
                this.handleContent(params.row);
              }
            }
          }, [
            h(NoticeContent, {
              props: {
                context: params.row.content || params.row.title,
                time: params.row.ins_time
              }
            })
          ]);
        }, align: 'center', ellipsis: true, minWidth: 220 },
        { title: '来源', key: 'sourceName', align: 'center', minWidth: 80, maxWidth: 120 },
        { title: '归属方案', key: 'plan_name', align: 'center', minWidth: 80, maxWidth: 120 },
        { title: '属性', align: 'center', minWidth: 80, maxWidth: 100, render: (h, params) => {
          const attr = params.row.attribute;
          return h('Tag', {
            props: {
              color: this.TagColor(attr)
            }}, this.TagName(attr));
        } },
        { title: '情感偏正向', align: 'center', minWidth: 90, maxWidth: 200, render: (h, params) => {
          return h('Progress', {
            props: {
              percent: this.ProgressBar(params.row.fumian),
              strokeColor: ['#ff9966', '#ff6680']
            }
          }, this.ProgressName(params.row.fumian));
        } },
        { title: '下发时间', key: 'push_time', width: 120, align: 'center' }
      ],
      tableList: [],
      tableTotal: 0,
      currentPage: 1,
      tableLoading: false,
      selectionList: [],
      params: {
        startTime: undefined,
        endTime: undefined,
        page: 1,
        limit: 40
      },
    };
  },
  computed: {
    TagColor() {
      return (label) => {
        return _.find(tags, (tag) => {
          return tag.value === label;
        }).describe;
      };
    },
    TagName() {
      return label => {
        return _.find(tags, (tag) => {
          return tag.value === label;
        }).tag;
      };
    },
    ProgressBar() {
      return label => {
        return _.round(label * 100, 2);
      };
    },
    ProgressName() {
      return label => {
        if (_.round(label, 2) === 1) {
          return '敏感';
        }
      };
    }
  },

  created() {
    this.getWarningRecords();
    this.$store.dispatch('notice/getNoticeTotal');
  },

  beforeDestroy() {
    this.levelList = null
  },

  methods: {
    async getWarningRecords() {
      this.tableLoading = true;
      this.tableList = [];
      await getWarningRecords(Object.assign({}, this.params)).then(res => {
        this.tableList = res.data.data;
        this.tableTotal = res.data.total;
        this.tableLoading = false;
      });
    },

    async upRead(params) {
      await upRead({
        articleIds: params
      }).then(res => {
        if (res.state === 1) {
          this.$Message.success(res.message);
          this.$nextTick(() => {
            this.currentPage = 1;
            this.getWarningRecords();
          });
        }
      });
    },

    handleContent({ id } = {}) {
      this.$router.push({ name: 'Detail', params: { id }});
      this.$store.dispatch('notice/minus', 1);
    },

    handleSelect(selection) {
      this.selectionList = _.map(selection, 'id');
    },

    handleStartTime(date) {
      this.params.startTime = date;
    },

    handleEndTime(date) {
      this.params.endTime = date;
    },

    handleSearch() {
      if (_.isUndefined(this.params.startTime) || _.isUndefined(this.params.endTime)) {
        return this.$Message.warning('请正确选择时间');
      }
      this.getWarningRecords();
    },

    handleRead() {
      if (_.isEmpty(this.selectionList)) {
        this.$Message.warning('请选择要标记的内容');
      } else {
        const length = this.selectionList.length;
        this.$store.dispatch('notice/minus', length);
        this.upRead(this.selectionList);
      }
    },

    handleChangePage(page) {
      this.params.page = page;
      this.getWarningRecords();
    },
    handlePageSize(limit) {
      this.params.limit = limit;
      this.getWarningRecords();
    },

    handleLink(item) {
      const { path } = item
      this.$router.push({ path })
    }

  }
};
</script>

<style lang="scss" scoped>
</style>
