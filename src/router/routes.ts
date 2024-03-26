import { RouteRecordRaw } from "vue-router";

const QuestionsView = () => import("@/views/question/QuestionsView.vue");
const QuestionsSubmitView = () =>
  import("@/views/question/QuestionsSubmitView.vue");
const UserLayout = () => import("@/layouts/UserLayout.vue");
const UserLoginView = () => import("@/views/user/UserLoginView.vue");
const AddQuestionView = () => import("@/views/question/AddQuestionView.vue");
const ManageQuestionView = () =>
  import("@/views/question/ManageQuestionView.vue");
const UserRegisterView = () => import("@/views/user/UserRegisterView.vue");
const OnlineQuestionsView = () =>
  import("@/views/question/OnlineQuestionsView.vue");
const NoAuth = () => import("@/views/NoAuth.vue");
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
    meta: {
      access: ACCESS_ENUM.USER,
    },
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
