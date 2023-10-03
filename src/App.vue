<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

/**
 * 初始化代码写在下面的函数中
 */
const doInit = () => {
  console.log("初始化项目");
};

onMounted(() => {
  doInit();
});

const route = useRoute();
</script>

<style></style>
