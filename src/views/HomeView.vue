<template>
  <div class="home">
    <MdEditor :value="value" :handle-change="onMdChange" />
    <CodeEditor :value="mdValue" :handle-change="onCodeChange" />
  </div>
</template>

<script lang="ts" setup>
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

const codeValue = ref("");
const mdValue = ref("");

const onMdChange = (v: string) => {
  mdValue.value = v;
};
const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>
