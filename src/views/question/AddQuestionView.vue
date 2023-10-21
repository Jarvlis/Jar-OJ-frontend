<template>
  <div id="addQuestionView">
    <a-form :model="form">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor />
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
      </a-form-item>

      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 380px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              min="0"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              min="0"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              min="0"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        v-for="(judgeCaseItem, index) of form.judgeCase"
        :field="`posts[${index}].value`"
        :label="`Post-${index}`"
        :key="index"
      >
        <a-input v-model="judgeCaseItem.value" placeholder="请输入样例" />
        <a-button @click="handleDelete(index)" :style="{ marginLeft: '10px' }"
          >Delete</a-button
        >
      </a-form-item>
      <a-form-item>
        <a-button>提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";

const form = reactive({
  tags: [],
  title: "",
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
});
</script>

<style scoped>
#addQuestionView {
}
</style>
