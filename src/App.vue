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
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style>
#app {
  background: url("./assets/background.jpg") 0 0 / 100% 100%;
}
</style>
