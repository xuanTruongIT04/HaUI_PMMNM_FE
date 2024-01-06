<script setup lang="ts">
import "bootstrap/dist/js/bootstrap.esm.min.js";
import { BaseEnable, onClick } from '~/assets/ts/template.ts'
import { BaseTitleDisplay, clearChilds } from '~/assets/ts/BaseWebApplication'
import { UserManager } from '@/services/manager/UserManager'
import { Notification } from '@/helpers/Notification'
import { Messages } from '@/constants/constants'
import { User } from '@/models/User'
import "bootstrap/dist/js/bootstrap.esm.min.js";
import { eventBus } from '@/plugins/event-bus';
import mitt, { EventType } from 'mitt';

const userManager = new UserManager();
const notify = new Notification();
let checkLogin = await userManager.checkLogin();

let dataUser = new User();

if (checkLogin) {
  try {
    dataUser = await userManager.getInformation();
  } catch (error) {
    console.error('Error getting user information:', error);
  }
}

const handUpdate = (data: User) => {
    dataUser = {... data.results};
};


onMounted(() => {
    eventBus.on('is-update-auth', handUpdate as (data: any) => void);
});
onUnmounted(() => {
    eventBus.off('is-update-auth', handUpdate as (data: any) => void);
});

const logout = async () => {
  let isCheckLogout = await userManager.logout();
  if (isCheckLogout) {
    navigateTo('/auth/login')
    notify.success(Messages.LOGOUT_SUCCESS)
  } else {
    notify.error(Messages.LOGOUT_FAIL)
  }
}

BaseTitleDisplay.parent = 'Trang chủ'
clearChilds()
</script>

<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <NuxtLink 
        to="./home"
        class="logo d-flex align-items-center ms-3"
        :style="{ width: BaseEnable.header_margin_left }"
      >
        <img src="~/assets/images/logo.svg">
        <img
          src="~/assets/images/medicare_logo.svg"
          :hidden="BaseEnable.isHidden"
        >
      </NuxtLink>
      <font-awesome-icon
        :icon="['fas', 'bars']"
        class="toggle-sidebar-btn"
        @click="onClick"
      />
    </div>
    <!-- End Logo -->

    <div class="pagetitle pt-1 ps-5 mb-0">
      <h5 class="mb-0">
        Phòng khám đa khoa Medicare
      </h5>
      <nav>
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item ms-0">
            <NuxtLink to="./home">{{ BaseTitleDisplay.parent }}</NuxtLink>
          </li>
          <li
            v-for="(child, index) in BaseTitleDisplay.childs"
            :key="index"
            class="breadcrumb-item"
          >
            {{ child }}
          </li>
        </ol>
      </nav>
    </div>

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item dropdown pe-3">
          <a
            class="nav-link nav-profile d-flex align-items-center pe-0"
            href="#"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
          >
            <span class="d-none d-md-block dropdown-toggle ps-2">{{ dataUser.name }}</span>
          </a>

          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
          >
            <li class="dropdown-header">
              <h6>{{ dataUser.name }}</h6>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <NuxtLink class="dropdown-item d-flex align-items-center" to="/admin/edit-user">
                <font-awesome-icon :icon="['far', 'user']" />
                <span>Thông tin cá nhân</span>
              </NuxtLink>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <NuxtLink class="dropdown-item d-flex align-items-center" to="/admin/change-password">
                <font-awesome-icon :icon="['far', 'pen-to-square']" />
                <span>Đổi mật khẩu</span>
              </NuxtLink>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <NuxtLink class="dropdown-item d-flex align-items-center" to="#" @click="logout">
                <font-awesome-icon :icon="['fas', 'right-to-bracket']" class="logout-icon" />
                <span class="d-inline-block m-1">Đăng xuất</span>
              </NuxtLink>
            </li>
          </ul>
          <!-- End Profile Dropdown Items -->
        </li>
        <!-- End Profile Nav -->
      </ul>
    </nav>
    <!-- End Icons Navigation -->
  </header>
</template>

<style>
@import url("~/assets/scss/main.scss");

.pagetitle {
  margin-bottom: 10px;
}

.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #012970;
}

.logout-icon {
  display: inline-block;
  margin-right: 4px;
}
</style>
