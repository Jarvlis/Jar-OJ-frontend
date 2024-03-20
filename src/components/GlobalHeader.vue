<template>
  <div id="header">
    <a-row id="globalHeader" align="center" class="header" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          :default-selected-keys="['1']"
          @menu-item-click="doMenuClick"
          :style="{ background: 'transparent' }"
        >
          <a-menu-item
            key="0"
            :style="{
              padding: 0,
              marginRight: '38px',
              background: 'transparent',
            }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/logo.svg" />
              <div class="title">Jar-OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item
            v-for="item in visibleMenu"
            :key="item.path"
            :style="{ background: 'transparent' }"
          >
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>
          <a-avatar :style="{ backgroundColor: '#3370ff' }">
            {{ store.state.user?.loginUser?.userName ?? "未登录" }}
          </a-avatar>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import CheckAccess from "@/access/checkAccess";

const router = useRouter();
const store = useStore();
let loginUser = store.state.user.loginUser;

const visibleMenu = computed(() => {
  loginUser = store.state.user.loginUser;
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限返回菜单
    if (!CheckAccess(loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.header {
  box-shadow: #eee 1px 1px 5px;
  margin-bottom: 16px;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title {
  font-size: 36px;
  margin-left: 15px;
  color: #0073ce;
}

#header {
  background: inherit;
}
</style>
