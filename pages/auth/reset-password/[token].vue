<template>
  <div class="row">
    <div class="col-lg-12 ms-5">
      <div class="login-form">
        <form>
          <div class="row py-2">
            <div class="col-lg-12">
              <div class="row">
                <label
                  for="input-password"
                  class="col-sm-4 form-label text-start fw-semibold mb-12"
                  ><font-awesome-icon class="mr-1" :icon="['fas', 'key']" /> Mật
                  khẩu mới</label
                >
              </div>
              <div class="row">
                <div class="col-sm-10 input-type-password">
                  <input
                    id="input-password"
                    v-model="userManager.getUser().password"
                    :type="userManager.showPassword ? 'text' : 'password'"
                    class="form-control rounded-pill border border-1 border-dark input-type-text"
                    name="password"
                    aria-describedby="nameHelp"
                    placeholder="Nhập mật khẩu mới"
                    @keyup="userManager.validPassword"
                  />

                  <div class="input-group-append">
                    <span
                      class="icon-show-hide-password"
                      @click="
                        userManager.showPassword = !userManager.showPassword
                      "
                    >
                      <font-awesome-icon
                        v-if="!userManager.showPassword"
                        :icon="['fas', 'eye']"
                      />
                      <font-awesome-icon v-else :icon="['fas', 'eye-slash']" />
                    </span>
                  </div>

                  <div :style="{ color: errMessages.textColor }">
                    {{ errMessages.errorPassword }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-12">
              <div class="row">
                <label
                  for="input-confirm-password"
                  class="col-sm-4 form-label text-start fw-semibold mb-12"
                  ><font-awesome-icon
                    class="mr-1"
                    :icon="['fas', 'user-check']"
                  />
                  Xác nhận mật khẩu</label
                >
              </div>
              <div class="row">
                <div class="col-sm-10 input-type-password">
                  <input
                    id="input-confirm-password"
                    v-model="userManager.getUser().confirmPassword"
                    :type="userManager.showConfirmPassword ? 'text' : 'password'"
                    class="form-control rounded-pill border border-dark input-type-text"
                    name="confirmPassword"
                    placeholder="Nhập mật khẩu"
                    @keyup="userManager.validConfirmPassword()"
                  />
                  
                  <div class="input-group-append">
                    <span
                      class="icon-show-hide-password"
                      @click="
                        userManager.showConfirmPassword = !userManager.showConfirmPassword
                      "
                    >
                      <font-awesome-icon
                        v-if="!userManager.showConfirmPassword"
                        :icon="['fas', 'eye']"
                      />
                      <font-awesome-icon v-else :icon="['fas', 'eye-slash']" />
                    </span>
                  </div>

                  <div :style="{ color: errMessages.textColor }">
                    {{ errMessages.errorConfirmPassword }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-10 text-end">
              <button
                type="button"
                class="btn-login btn btn-primary"
                @click="handleReset"
                v-if="canReset"
              >
                <font-awesome-icon
                  class="mr-1"
                  :icon="['fas', 'pen-to-square']"
                />
                Đổi mật khẩu
              </button>
              <button
                type="button"
                class="btn-login btn btn-success"
                v-else
                disabled
              >
                <font-awesome-icon class="mr-1" />
                Đã đổi mật khẩu
              </button>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-10 text-center text-info fs-5 mt-2">
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
import { UserManager } from "@/services/manager/UserManager";
import { RedirectPage, ResponseStatus, TitlePage } from "@/constants/constants";
const route = useRoute();

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
      canReset: true,
    };
  },
  mounted() {
    auth.title = TitlePage.RESET_PASSWORD;
  },
  methods: {
    async handleReset() {
      try {
        if (!this.canReset) {
          return;
        }

        let dataReset = {
          password: this.userManager.getUser().password,
          password_confirmation: this.userManager.getUser().confirmPassword,
        };

        if (!dataReset.password) this.userManager.validPassword();
        if (!dataReset.confirm_password)
          this.userManager.validConfirmPassword();

        if (!this.errMessages.password && !this.errMessages.confirmPassword) {
          const response = await this.$api(
            "auth/reset-password/" + route.params?.token,
            {
              method: "POST",
              body: JSON.stringify(dataReset),
            }
          );

          if (response.status == ResponseStatus.HTTP_OK) {
            this.canReset = false;
            this.$toastify.success(
              "Reset password successfully, after 3 seconds you will be redirected to the login page!"
            );
            setTimeout(() => {
              this.$router.push(RedirectPage.LOGIN);
            }, 2750);
          } else {
            this.$toastify.successV2(
              "Reset password failed, please try again later!"
            );
            this.canReset = true;
          }
        } else {
          this.userManager.validPassword();
          this.userManager.validConfirmPassword();
          this.canReset = true;
        }
      } catch (error) {
        console.error("Error during login:" + error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("~/assets/scss/auth.scss");
</style>
