<template>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <form id="user-profile" method="POST">
          <div class="row mt-2 text-center">
            <div class="col-lg-5 offset-lg-3">
              <div class="row">
                <div id="avatar">
                  <img
                    src="~/assets/images/avatar.jpg"
                    class="rounded-circle"
                    style="width: 75px; height: 75px"
                  >
                </div>
              </div>
              <!-- <div class="row mt-4">
                <div class="col-lg-6 d-flex flex-row-reverse">
                  <div class="row me-1">
                    <button
                      type="submit"
                      class="btn btn-primary border border-3 border-secondary"
                    >
                      Tải lên
                    </button>
                  </div>
                </div>
                <div class="col-lg-6 d-flex flex-row">
                  <div class="row text-end ms-1">
                    <button
                      type="submit"
                      class="btn border border-3 border-secondary"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="row">
            <div class="col-lg-5">
              <div class="row mt-2">
                <label for="username" class="form-label">Họ và tên</label>
                <input
                  id="username"
                  type="text"
                  class="form-control ms-2"
                  name="username"
                  v-model="dataUser.name"
                >
                <div id="errUsername" />
              </div>
              <div class="row mt-2">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control ms-2"
                  name="email"
                  v-model="dataUser.email"
                >
                <div id="errEmail" />
              </div>
              <div class="row mt-2">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input
                  id="phone"
                  type="text"
                  class="form-control ms-2"
                  name="phone"
                 v-model="dataUser.phoneNumber"
                >
                <div id="errUserPhone" />
              </div>
            </div>
            <div class="col-lg-1" />
            <div class="col-lg-5">
              <div class="row mt-2">
                <label for="position" class="form-label">Chức vụ</label>
                <select id="position" class="form-control ms-2" v-model="dataUser.role">
                  <option :value="Role.DOCTOR">Bác sĩ</option>
                  <option :value="Role.RECEPTIONIST">Lễ tân</option>
                  <option v-if="dataUser.role == Role.ADMIN_SYS" :value="Role.ADMIN_SYS">Quản trị viên</option>
                </select>
                <div id="errPosition" />
              </div>
              <div class="row mt-2">
                <label for="birthday" class="form-label">Ngày sinh</label>
                <input
                  id="birthday"
                  type="text"
                  class="form-control ms-2"
                  name="birthday"
                  v-model="dataUser.birthday"
                >
                <div id="errBirthday" />
              </div>
              <div class="row mt-2">
                <label for="address" class="form-label me-3">Địa chỉ</label>
                <input
                  id="address"
                  type="text"
                  class="form-control ms-2"
                  name="address"
                  v-model="dataUser.address"
                >
                <div id="errAddress" />
              </div>
              <div class="row mt-4 d-flex flex-row-reverse">
                <button
                  type="submit"
                  @click="handleUpdateUser"
                  class="btn btn-primary col-sm-3 offset-sm-4"
                >
                  <i class="fa-solid fa-pen-to-square" /> Cập nhật
                </button>
              </div>
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
import { Role } from '@/constants/constants';
import { eventBus } from '@/plugins/event-bus';

definePageMeta({
  layout: 'dashboard',
})
const userManager = new UserManager();

let checkLogin = await userManager.checkLogin();
let dataUser: User = new User();
const router = useRouter()

if (checkLogin) {
  try {
    dataUser = await userManager.getInformation();
  } catch (error) {
    console.error('Error getting user information:', error);
  }
}

const handleUpdateUser = async (e : any) => {
  e.preventDefault()
  if(dataUser) {
    try {
      let isCheckUpdate = await userManager.updateUser(dataUser);
      
      if (isCheckUpdate) {
        toast.success(Messages.UPDATE_USER_SUCCESS, {
          autoClose: 1000
        })

        eventBus.emit('is-update-auth', isCheckUpdate);

        setTimeout(() => {
          router.push(RedirectPage.HOME)
        }, 1000)
      }
      else
        toast.error(Messages.UPDATE_USER_FAIL, {
            autoClose: 1000
          })
    } catch (error) {
      console.error('Error getting user information:', error);
    }
  }
}

BaseTitleDisplay.childs.push('Cài đặt tài khoản')
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
