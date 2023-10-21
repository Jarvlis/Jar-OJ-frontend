<template>
  <div class="homeView">
    <div
      class="code-editor"
      ref="codeEditorRef"
      style="min-height: 400px"
    ></div>
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref } from "vue";
import { defineProps, withDefaults, toRaw } from "vue";

const codeEditor = ref();
const codeEditorRef = ref();
const value = ref("hello world");

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChangeL: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
  });
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
