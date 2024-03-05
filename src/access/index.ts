import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  // console.log("登录用户信息: " + store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;
  // 如果之前没登录，自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登录了，但是权限不足，那么跳转到无权限的页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
