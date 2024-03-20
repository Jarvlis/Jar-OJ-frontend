<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>

      <a-form-item field="language" label="编程语言" style="min-width: 200px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="请选择编程语言"
        >
          <a-option>全部</a-option>
          <a-option>java</a-option>
          <a-option>python(暂不支持)</a-option>
          <a-option>cpp(暂不支持)</a-option>
          <a-option>javascript(暂不支持)</a-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="doSearch">搜索</a-button>
      </a-form-item>

      <a-form-item>
        <a-button type="secondary" @click="loadData">刷新数据</a-button>
      </a-form-item>
      <!--      <span class="infoRefresh">(每3s自动刷新) </span>-->
    </a-form>
    <a-divider :size="0" />
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
      <template #timeInfo="{ record }">
        {{ record.judgeInfo.time || 0 }}ms
      </template>
      <template #memoryInfo="{ record }">
        {{ record.judgeInfo.memory || 0 }}kb
      </template>
      <template #status="{ record }">
        {{ (record.status === 1 && "判题结束") || "判题结束" }}
      </template>
      <template #judgeRes="{ record }">
        <span
          :style="{
            color: record.judgeInfo.message === 'Accepted' ? 'green' : 'red',
          }"
        >
          {{ record.judgeInfo.message || "Compile Error" }}
        </span>
      </template>
      <template #userId="{ record }">
        {{
          record.judgeInfo.userId === loginUser.userId
            ? "我的提交"
            : record.judgeInfo.userId
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD hh:mm:ss") }}
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
  if (searchParams.value.language === "全部") {
    searchParams.value.language = undefined;
  }
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

setTimeout(() => {
  loadData();
}, 3000);

const refresh = setTimeout(() => {
  loadData();
}, 10000);

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
    slotName: "status",
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
