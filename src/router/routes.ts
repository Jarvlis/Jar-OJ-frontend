import { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AdminView from "@/components/AdminView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import NoAuth from "@/views/NoAuth.vue";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "浏览题目",
    component: HelloWorld,
  },
  {
    path: "/hide",
    name: "隐藏组件",
    component: HelloWorld,
    meta: {
      hideInMenu: true,
    },
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
      access: ACCESS_ENUM.ADMIN,
    },
  },
];
