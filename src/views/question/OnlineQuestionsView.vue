<template>
  <div id="OnlineQuestionsView">
    <a-spin :loading="loading" tip="判题中, 请耐心等待...">
      <a-row :gutter="[24, 24]">
        <a-col :md="12" :xs="24">
          <a-tabs default-active-key="question">
            <a-tab-pane key="question" title="题目">
              <a-card v-if="question" :title="question.title">
                <a-descriptions
                  title="判题条件"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig.timeLimit ?? 0 }} MS
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{ question.judgeConfig.memoryLimit ?? 0 }} KB
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    {{ question.judgeConfig.stackLimit ?? 0 }} KB
                  </a-descriptions-item>
                </a-descriptions>
                <MdViewer :value="question.content || ''" />
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(tag, index) of question.tags"
                      :key="index"
                      color="green"
                      >{{ tag }}
                    </a-tag>
                  </a-space>
                </template>
              </a-card>
            </a-tab-pane>
            <a-tab-pane key="comment" title="评论区"> 暂未添加内容</a-tab-pane>
            <a-tab-pane key="record" title="提交记录"> 暂未添加内容</a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form :model="form" layout="inline">
            <a-form-item
              field="language"
              label="编程语言"
              style="min-width: 240px"
            >
              <a-select
                v-model="form.language"
                :style="{ width: '320px' }"
                placeholder="请选择编程语言"
              >
                <a-option>java</a-option>
                <a-option>python</a-option>
                <a-option>cpp</a-option>
                <a-option>javascript</a-option>
              </a-select>
            </a-form-item>
          </a-form>
          <CodeEditor
            :value="form.code"
            :language="form.language"
            :handle-change="changeCode"
          />
          <a-divider :size="0" />
          <a-button
            :status="btnStatus"
            type="primary"
            @click="throttleSubmit"
            style="min-width: 200px"
            :loading="loadingSubmit"
            >提交代码
          </a-button>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch, withDefaults } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import useState from "@arco-design/web-vue/es/_hooks/use-state";
import { throttle } from "@/utils/tools";
import { javaTemolates } from "@/codeTemplate/codeTemolates";
import router from "@/router";

const question = ref<QuestionVO>();

const loading = ref(false);

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const [loadingSubmit, setLoadingSubmit] = useState(false);
const [btnStatus, setBtnStatus] = useState("");

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: javaTemolates,
});

watch(
  () => form.value.language,
  () => {
    // console.log("切换语言");
    // todo 切换语言时需要更换代码模板
    form.value.code = javaTemolates;
  },
  { deep: true }
);

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  setLoadingSubmit(true);
  loading.value = true;
  const res = await QuestionControllerService.doQustionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
    loading.value = false;
    router.push("/questions_submit");
  } else {
    message.error("提交失败" + res.message);
    setBtnStatus("false");
  }
};

const throttleSubmit = throttle(doSubmit, 1000);

const changeCode = (code: string) => {
  form.value.code = code;
};

onMounted(() => {
  loadData();
});
</script>

<style>
#OnlineQuestionsView {
  max-width: 1400px;
  margin: 0 auto;
}

#OnlineQuestionsView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
