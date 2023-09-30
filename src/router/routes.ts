import { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AdminView from "@/components/AdminView.vue";
import NoAuth from "@/views/NoAuth.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "浏览题目",
    component: HelloWorld,
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuth,
  },
  {
    path: "/about",
    name: "关于我的",
    component: AdminView,
    meta: {
      access: "canAdmin",
    },
  },
];
