import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  // initial state
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "admin",
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
