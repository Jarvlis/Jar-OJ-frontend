import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";

export default {
  namespaced: true,
  // initial state
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  // getters
  // actions
  actions: {
    getLoginUser({ commit, state }, payload) {
      // todo 发送请求获取远程登录信息
      commit("updateUser", payload);
    },
  },
  // mutations
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
