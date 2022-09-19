<template>
  <div class="login">
    <img class="info" src="@/assets/images/login/login.png" />
    <div class="content">
      <h3>管理系统 - 登录</h3>
      <!-- form -->
      <m-form :model="form" :auto-label-width="true" @submit="handleSubmit">
        <m-form-item field="username" :rules="[{required: true, message: '请输入用户名'}]">
          <m-input v-model="form.username" placeholder="请输入用户名" />
        </m-form-item>
        <m-form-item field="password" :rules="[{required: true, message: '请输入密码'}]">
          <m-input v-model="form.password" placeholder="请输入密码" />
        </m-form-item>
        <m-form-item style="margin-top: 10px; line-height: 20px">
          登录页面可根据项目具体的需求，进行自定义配置
        </m-form-item>
        <m-form-item>
          <m-button type="primary" long html-type="submit">登录</m-button>
        </m-form-item>
      </m-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import {jump} from "@/hooks/useWindow";

const form = reactive({
  username: "",
  password: "",
});
const handleSubmit = ({values, errors}: any) => {
  if (!errors) {
    console.log(values);
    jump("/");
  }
};
</script>

<style scoped lang="scss">
.login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("@/assets/images/login/login-bg.png") center no-repeat;
  background-size: cover;
  .info {
    width: 650px;
    position: fixed;
    top: 11%;
    right: 55%;
    animation: turn 100s linear infinite;
  }

  .content {
    position: fixed;
    top: 50%;
    right: 22%;
    width: 300px;
    margin: -200px 0 0 0;
    padding: 24px 24px 14px 24px;
    border-radius: 8px;
    background-color: #ffffff;
    z-index: 9999;
    h3 {
      margin: 0 0 32px 0;
      font-size: 22px;
      font-weight: 600;
    }
    input {
      width: 100%;
    }
  }
  :deep(.arco-form-item-label-col.arco-form-item-label-col-flex) {
    display: none;
  }
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
