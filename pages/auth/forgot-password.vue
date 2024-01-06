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
                    @keyup="userManager.validEmail()"
                  />
                  <div class="form-text" v-if="!errMessages.errorEmail">
                    {{ errMessages.content }}
                  </div>
                  <div :style="{ color: errMessages.textColor }">
                    {{ errMessages.errorEmail }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-10 text-end">
              <button
                v-if="canSend"
                type="button"
                class="btn-login btn btn-primary"
                @click="send()"
              >
                Gửi
                <font-awesome-icon
                  class="ml-1"
                  :icon="['fas', 'paper-plane']"
                />
              </button>
              <button
                v-else
                type="button"
                class="btn-login btn btn-success"
                @click="send()"
                disabled
              >
                Đang gửi ...
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

<script>
import { auth, errMessages } from "~/assets/ts/auth";
import { RedirectPage, ResponseStatus, TitlePage } from "@/constants/constants";
import { UserManager } from "@/services/manager/UserManager";

definePageMeta({
  layout: "auth",
});

export default {
  data() {
    return {
      userManager: new UserManager(),
      auth,
      errMessages,
      RedirectPage,
      canSend: true,
    };
  },
  mounted() {
    this.auth.title = TitlePage.FORGOT_PASSWORD;
  },
  methods: {
    async send() {
      try {
        if (!this.canSend) {
          this.$toastify.info(
            "Need to wait 5 seconds to send the next request..."
          );
          return;
        }

        let data = {
          email: this.userManager.getUser().email,
        };

        if (this.userManager.validEmail()) {
          this.canSend = false;

          errMessages.content =
            "Email đang được gửi đi, vui lòng chờ trong giây lát...";

          const response = await this.$api("auth/forget-password", {
            method: "POST",
            body: JSON.stringify(data),
          });

          if (response?.status == ResponseStatus.HTTP_OK) {
            this.$router.push(RedirectPage.CONFIRM_EMAIL);
          } else {
            errMessages.content =
              "Email đã được gửi thất bại, vui lòng thử lại sau!";
            this.$toastify.successV2(response.message);
          }

          this.canSend = true;
        }
      } catch (error) {
        console.error("Error during login:" + error);

        if (error.status == ResponseStatus.HTTP_UNPROCESSABLE_ENTITY)
          this.$toastify.error(
            "Không tồn tại email " +
              this.userManager.getUser().email +
              " vui lòng thử lại"
          );

        this.canSend = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("~/assets/scss/auth.scss");

.logo {
  width: 225px;
}
.login-title {
  font-size: 1.2rem;
}
.btn-send:hover {
  width: 35%;
  background-color: red;
  color: white;
}
.background_login img {
  width: 660px;
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
