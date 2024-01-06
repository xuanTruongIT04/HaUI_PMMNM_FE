<script>
import { auth } from '~/assets/ts/auth'
import { TitlePage } from '@/constants/constants'
import { UserManager } from '@/services/manager/UserManager'

definePageMeta({
  layout: 'auth',
})

export default {
  data() {
    return {
      userManager: new UserManager(),
      auth,
    }
  },
  mounted() {
    auth.title = TitlePage.REGISTER
    auth.linkBackgroundImage = '~/assets/images/background-register.png'
  },
  methods: {
    handlerRegister() {

    },
  },
}
</script>

<template>
  <div class="row">
    <div id="login-form" class="col-lg-12 ms-5">
      <div class="login-form">
        <form>
          <div class="row py-2">
            <div class="col-lg-12">
              <div class="row">
                <label
                  for="fullname"
                  class="col-sm-4 form-label text-start fw-semibold mb-12"
                >Họ tên</label>
              </div>
              <div class="row">
                <div class="col-sm-10">
                  <input
                    id="fullname"
                    v-model="userManager.getUser().fullname"
                    type="text"
                    class="form-control border-dark input-type-text"
                    name="fullname"
                    aria-describedby="nameHelp"
                    placeholder="Nhập họ tên"
                  >
                  <div id="errFullname" />
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-12">
              <div class="row">
                <label
                  for="username"
                  class="col-sm-4 form-label text-start fw-semibold mb-12"
                >Tên tài khoản</label>
              </div>
              <div class="row">
                <div class="col-sm-10">
                  <input
                    id="username"
                    v-model="userManager.getUser().username"
                    type="text"
                    class="form-control border-dark input-type-text"
                    name="username"
                    aria-describedby="nameHelp"
                    placeholder="Nhập tên tài khoản"
                  >
                  <div id="errName" />
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-12">
              <div class="row">
                <label
                  for="password"
                  class="col-sm-4 form-label text-start fw-semibold mb-12"
                >Mật khẩu</label>
              </div>
              <div class="row">
                <div class="col-sm-10">
                  <input
                    id="password"
                    v-model="userManager.getUser().password"
                    type="password"
                    class="form-control border-dark input-type-text"
                    name="password"
                    placeholder="Nhập mật khẩu"
                  >
                  <div id="errPass" />
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-12">
              <div class="row">
                <label
                  for="ConfirmPassword"
                  class="col-sm-4 form-label text-start fw-semibold mb-12"
                >Xác nhận mật khẩu</label>
              </div>
              <div class="row">
                <div class="col-sm-10">
                  <input
                    id="ConfirmPassword"
                    v-model="userManager.getUser().confirmPassword"
                    type="password"
                    class="form-control border-dark input-type-text"
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                  >
                  <div id="errPass" />
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-12">
              <div class="row">
                <label
                  for="inputPermission"
                  class="col-sm-4 form-label text-start fw-semibold mb-12"
                >Chức vụ</label>
              </div>
              <div class="row">
                <div class="col-sm-10">
                  <select
                    id="inputPermission"
                    name="permission"
                    class="form-control border-dark input-type-text"
                  >
                    <option
                      v-for="(perm, index) in userManager.permission"
                      :key="index"
                      :value="perm"
                    >
                      {{ perm }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-lg-10 text-end btn-create-account">
              <button
                type="button"
                class="btn-login btn btn-primary"
                @click="handlerRegister"
              >
                <i class="fa-solid fa-right-to-bracket" />Tạo tài khoản
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("~/assets/scss/auth.scss");
</style>
