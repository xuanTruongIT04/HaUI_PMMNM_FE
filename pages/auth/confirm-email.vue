<template>
  <div class="row">
    <div id="loginForm" class="col-lg-12 ms-5">
      <div class="login-form">
        <h4 class="mt-3 text-dark">
          Một email đã được gửi đến hộp thư đến của bạn kèm theo một liên kết.
          Bấm vào liên kết trong email để chọn mật khẩu mới.
        </h4>
        <div class="block-button-check-email text-center">
          <NuxtLink
            :to="RedirectPage.LOGIN"
            class="btn btn-primary btn-check-email mt-4 mr-5"
          >
            Về trang đăng nhập
          </NuxtLink>

          <a
            href="https://mail.google.com/mail/u/0/"
            class="btn btn-success  btn-check-email mt-4 ml-5"
          >
            Chuyến đến gmail
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { auth } from "@/assets/ts/auth";
import { RedirectPage, TitlePage } from "@/constants/constants";

definePageMeta({
  layout: "auth",
});

export default {
  data() {
    return {
      auth,
      RedirectPage,
    };
  },
  mounted() {
    this.auth.title = TitlePage.CONFIRM_EMAIL;
  },
};
</script>

<style lang="scss" scoped>
@import url("~/assets/scss/auth.scss");
</style>
