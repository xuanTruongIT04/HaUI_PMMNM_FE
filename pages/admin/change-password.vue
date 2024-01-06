<template>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <form id="user-profile" method="POST">
          <div class="row">
            <div class="col-lg-10">
              <div class="row mt-2">
                <label for="username" class="form-label">Mật khẩu cũ</label>
                <input
                  id="username"
                  type="password"
                  class="form-control ms-2"
                  name="username"
                  v-model="inforUser.old_password"
                >
                <div id="errUsername" />
              </div>
              <div class="row mt-2">
                <label for="email" class="form-label">Mật khẩu mới</label>
                <input
                  id="password"
                  type="password"
                  class="form-control ms-2"
                  name="password"
                  v-model="inforUser.password"
                >
                <div id="errpassword" />
              </div>
              <div class="row mt-2">
                <label for="phone" class="form-label">Xác nhận mật khẩu mới</label>
                <input
                  id="phone"
                  type="password"
                  class="form-control ms-2"
                  name="phone"
                 v-model="inforUser.password_confirmation"
                >
                <div id="errUserPhone" />
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-9"></div>
            <div class="col-3">
              <button class="btn btn-primary" @click="updatePassword">Cập nhật</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseTitleDisplay } from 'assets/ts/BaseWebApplication'
import { User } from '@/models/User';
import { UserManager } from '@/services/manager/UserManager'
import { Notification } from '@/helpers/Notification'
import { Messages, RedirectPage } from '@/constants/constants';
import { toast, type ToastOptions } from 'vue3-toastify'

definePageMeta({
  layout: 'dashboard',
})
const userManager = new UserManager();

const router = useRouter()
let dataUser = userManager.getCurrentUser();

let inforUser = {
  email: dataUser.email,
  old_password: "",
  password: "",
  password_confirmation: ""
}

const updatePassword = async(e: any) => {
  e.preventDefault();
  
  let checkUpdate = await userManager.updatePassword(inforUser);

  if (checkUpdate) {
    toast.success(Messages.UPDATE_USER_PASSWORD_SUCCESS + "", {
      autoClose: 1000
    })

    setTimeout(() => {
      router.push(RedirectPage.HOME)
    }, 1000)
  }
}

BaseTitleDisplay.childs.push('Đổi mật khẩu')
</script>

<style scoped lang="scss">
@import url("~/assets/scss/main.scss");
#avatar {
  display: flex;
  justify-content: center;
}
#avatar img {
  width: 75px;
}
</style>
