<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form :model="form" layout="inline">
        <a-form-item field="questionId" label="题号" style="min-width: 240px">
          <a-input v-model="searchParams.questionId" placeholder="请输入" />
        </a-form-item>

        <a-form-item field="language" label="编程语言" style="min-width: 200px">
          <a-select
            v-model="searchParams.language"
            :style="{ width: '320px' }"
            placeholder="请选择编程语言"
          >
            <a-option>java</a-option>
            <a-option>python</a-option>
            <a-option>cpp</a-option>
            <a-option>javascript</a-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="doSearch">搜索</a-button>
        </a-form-item>

        <a-form-item>
          <a-button type="secondary" @click="loadData">刷新数据</a-button>
        </a-form-item>
        <span class="infoRefresh">(每分钟自动刷新一次) </span>
      </a-form>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @pageChange="onPageChange"
    >
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #timeInfo="{ record }">
        {{ record.judgeInfo.memory || 0 }}
      </template>
      <template #memoryInfo="{ record }">
        {{ record.judgeInfo.time || 0 }}
      </template>
      <template #judgeRes="{ record }">
        <span
          :style="{
            color: record.judgeInfo.message === 'Accepted' ? 'green' : 'red',
          }"
        >
          {{ record.judgeInfo.message || "Info Lack" }}
        </span>
      </template>
      <template #userId="{ record }">
        {{
          record.judgeInfo.userId === loginUser.userId
            ? "我"
            : record.judgeInfo.userId
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import store from "@/store";

const total = ref(0);
const dataList = ref([]);
const searchParams = ref<QuestionSubmitQueryRequest>({
  current: 1,
  pageSize: 10,
  questionId: undefined,
  language: undefined,
});

const loginUser = store.state.user.loginUser;

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = parseInt(res.data.total);
  } else {
    message.error("加载失败" + res.msg);
  }
};
const router = useRouter();

/**
 * 监听searchParams变化
 * 加载数据
 */
watchEffect(() => {
  loadData();
});

const refresh = setInterval(() => {
  loadData();
}, 60000);

onUnmounted(() => {
  clearInterval(refresh);
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doSearch = () => {
  loadData();
};

onMounted(() => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题结果",
    slotName: "judgeRes",
  },
  {
    title: "内存消耗",
    slotName: "memoryInfo",
  },
  {
    title: "时间消耗",
    slotName: "timeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
  },
  {
    title: "题目 ID",
    dataIndex: "questionId",
  },
  {
    title: "提交者 ID",
    slotName: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];
</script>

<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}

.infoRefresh {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
