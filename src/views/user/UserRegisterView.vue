<template>
  <div id="userLoginView">
    <h2 style="margin: 0 auto; margin-bottom: 30px">用户注册</h2>
    <a-form
      label-align="left"
      :model="form"
      @submit="handleSubmit"
      auto-label-width
      style="max-width: 400px; margin: 0 auto"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input
          v-model="form.userAccount"
          placeholder="请输入用户账号"
          max-length="8"
        />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item field="checkPassword" label="确认密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          type="primary"
          style="width: 200px; margin: 0 auto"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import {
  UserControllerService,
  UserLoginRequest,
  UserRegisterRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const router = useRouter();
const store = useStore();

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败," + res.message);
  }
};
</script>

<style></style>
