import { RouteRecordRaw } from "vue-router";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionsSubmitView from "@/views/question/QuestionsSubmitView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import OnlineQuestionsView from "@/views/question/OnlineQuestionsView.vue";
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
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView,
  },
  {
    path: "/questions_submit",
    name: "浏览提交",
    component: QuestionsSubmitView,
  },
  {
    path: "/",
    name: "主页",
    component: QuestionsView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: OnlineQuestionsView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuth,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
];
