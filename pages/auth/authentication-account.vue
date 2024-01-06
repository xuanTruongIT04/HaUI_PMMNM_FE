<script>
import { auth } from "~/assets/ts/auth";
import { RedirectPage, TitlePage } from "@/constants/constants";
import { UserManager } from "@/services/manager/UserManager";

definePageMeta({
  layout: "auth",
});

export default {
  data() {
    return {
      userManager: new UserManager(),
      auth,
      RedirectPage,
    };
  },
  mounted() {
    auth.title = TitlePage.AUTH_ACCOUNT;
  },
  methods: {
    send() {

    },
  },
};
</script>

<template>
  <div class="row">
    <div id="loginForm" class="col-lg-12 ms-5">
      <div class="login-form">
        <form>
          <div class="row py-2">
            <div class="col-lg-12">
              <div class="row">
                <label
                  for="email"
                  class="col-sm-4 form-label text-start fw-semibold mb-12"
                  ><font-awesome-icon
                    class="mr-1"
                    :icon="['fas', 'envelope']"
                  />
                  Địa chỉ email</label
                >
              </div>
              <div class="row">
                <div class="col-sm-10">
                  <input
                    id="email"
                    v-model="userManager.getUser().email"
                    type="text"
                    class="form-control rounded-pill border border-1 border-dark input-type-text"
                    name="email"
                    aria-describedby="nameHelp"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-10 text-end">
              <button
                type="button"
                class="btn-login btn btn-primary"
                @click="send"
              >
                Gửi
                <font-awesome-icon
                  class="ml-1"
                  :icon="['fas', 'paper-plane']"
                />
              </button>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-10 text-center text-info">
              <NuxtLink
                :to="RedirectPage.LOGIN"
                class="text-decoration-none go-back-home"
                >Trở về trang đăng nhập</NuxtLink
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("~/assets/scss/auth.scss");
.logo {
  width: 225px;
}
.login-title {
  font-size: 1.2rem;
}
.btn-send {
  width: 30%;
  transition: width 2s;
}
.btn-send:hover {
  width: 35%;
  background-color: red;
  color: white;
}
.background_login img {
  width: 600px;
}
@media (max-width: 575.98px) {
  .login-form .col-sm-4 {
    text-align: left !important;
  }
  .logo {
    text-align: center !important;
  }
  #login-form {
    margin-left: 0px !important;
  }
}
@media (min-width: 576px) and (max-width: 767.98px) {
  .logo {
    text-align: center !important;
  }
}
@media (min-width: 768px) and (max-width: 991.98px) {
  .logo {
    text-align: center !important;
  }
}
@media (min-width: 992px) and (max-width: 1199.98px) {
  .logo {
    text-align: center !important;
  }
}
@media (min-width: 1200px) and (max-width: 1399.98px) {
}

@media (min-width: 1400px) {
}
</style>
