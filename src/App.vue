<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();
const router = useRouter();

/**
 * 初始化代码写在下面的函数中
 */
const doInit = () => {
  console.log("初始化项目");
};

onMounted(() => {
  doInit();
});
router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    if (store.state.user?.loginUser?.userRole !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>

<style></style>
