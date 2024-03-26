<template>
  <div class="homeView">
    <div
      class="code-editor"
      ref="codeEditorRef"
      style="min-height: 600px; height: 70vh"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { defineProps, withDefaults, toRaw } from "vue";

let monaco: any = null;

// 引入语言高亮模块
const highlightLang = async () => {
  const promiseList = [
    import(
      /* webpackPrefetch: true;" */ "monaco-editor/esm/vs/basic-languages/java/java.contribution"
    ),
    import(
      /* webpackPrefetch: true;" */ "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
    ),
    // import(
    //   /* webpackPrefetch: true;" */ "monaco-editor/esm/vs/basic-languages/python/python.contribution"
    // ),
    // import(
    //   /* webpackPrefetch: true;" */ "monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution"
    // ),
  ];
  return Promise.all(promiseList);
};

const initEditor = async () => {
  monaco = await import(
    /* webpackPrefetch: true;" */ "monaco-editor/esm/vs/editor/editor.api.js"
  );
  // 引入高亮模块
  await highlightLang();
};

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

onMounted(async () => {
  await initEditor();
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
