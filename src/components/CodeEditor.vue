<template>
  <div class="homeView">
    <div
      class="code-editor"
      ref="codeEditorRef"
      style="min-height: 600px; height: 80vh"
    ></div>
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, watch } from "vue";
import { defineProps, withDefaults, toRaw } from "vue";

const codeEditor = ref();
const codeEditorRef = ref();
const value = ref("hello world");

interface Props {
  value: string;
  language: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "Java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
    readOnly: false,
    theme: "vs-dark",
  });
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
