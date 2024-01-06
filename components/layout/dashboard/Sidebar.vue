<script lang="ts">
import { BaseEnable } from '~/assets/ts/template.ts'
import { ActivePages } from '~/assets/ts/BaseWebApplication'
import { RedirectPage, Role } from '@/constants/constants'
import { UserManager } from '@/services/manager/UserManager';

BaseEnable.active = 'collapsed'
export default{
  data(){
    return{
      BaseEnable,
      ActivePages,
      RedirectPage,
      userManager: new UserManager(),
      role: '',
      Role,
    }
  },
  mounted() {
    if(this.userManager.role != undefined){
      this.role = this.userManager.role 
    }
  },
}
</script>

<template>
  <aside
    id="sidebar"
    class="sidebar"
    :style="{ width: BaseEnable.sidebar_width }"
  >
    <ul id="sidebar-nav" class="sidebar-nav">
      <li class="nav-item">
        <NuxtLink class="nav-link" :to="RedirectPage.HOME" :class="ActivePages.OverviewPage">
          <div class="d-flex">
            <p class="overview-icon">
              <img
                src="~/assets/images/icons/overview_icon.svg"
                class="icon"
                alt=""
                srcset=""
              ><span class="sub-title overview">Tổng quan</span>
            </p>
            <span class="ms-3" :hidden="BaseEnable.isHidden">Tổng quan</span>
          </div>
        </NuxtLink>
      </li>

      <li class="nav-item" v-if="role==Role.RECEPTIONIST">
        <NuxtLink class="nav-link" :to="RedirectPage.MEDICAL_EXAM" :class="ActivePages.MEPage">
          <div class="d-flex">
            <p class="medical_examination-icon">
              <img
                src="~/assets/images/icons/medical_examination_icon.svg"
                class="icon"
                alt=""
                srcset=""
              >
              <span class="sub-title medical_examination" >Ca khám</span>
            </p>
            <span class="ms-3"  :hidden="BaseEnable.isHidden">Ca khám</span>
          </div>
          
        </NuxtLink>
      </li>
      <li class="nav-item"  v-if="role==Role.DOCTOR">
        <NuxtLink class="nav-link" :to="RedirectPage.MEDICAL_EXAM" :class="ActivePages.MEPage">
          <div class="d-flex">
            <p class="medical_examination-icon">
              <img
                src="~/assets/images/icons/medical_examination_icon.svg"
                class="icon"
                alt=""
                srcset=""
              >
              <span class="sub-title medical_examination">Tiếp nhận</span>
            </p>
            <span class="ms-3" :hidden="BaseEnable.isHidden">Tiếp nhận</span>
          </div>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink
          class="nav-link"
          data-bs-target="#forms-nav"
          :to="RedirectPage.PATIENT_RECORDS"
          :class="ActivePages.PRPage"
          v-if="role==Role.RECEPTIONIST"
        >
          <div class="d-flex">
            <p class="patient_record-icon">
              <img
                src="~/assets/images/icons/patient_record_icon.svg"
                class="icon"
                alt=""
                srcset=""
              >
              <span class="sub-title patient_record">Hồ sơ bệnh nhân</span>
            </p>
            <span class="ms-3" :hidden="BaseEnable.isHidden">Hồ sơ bệnh nhân</span>
          </div>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink
          class="nav-link"
          to="/admin/users"
          :class="ActivePages.LAPage"
          v-if="role==Role.ADMIN_SYS"
        >
          <div class="d-flex">
            <p class="user-icon">
              <img
                src="~/assets/images/icons/user_icon.svg"
                class="icon"
                alt=""
                srcset=""
              >
              <span class="sub-title user">Danh sách tài khoản</span>
            </p>
            <span class="ms-3" :hidden="BaseEnable.isHidden">Danh sách tài khoản</span>
          </div>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          class="nav-link"
          :to="RedirectPage.MEDICINES"
          :class="ActivePages.MMPage"
          v-if="role==Role.ADMIN_SYS"
        >
          <div class="d-flex">
            <p class="medicine-icon">
              <img
                src="~/assets/images/icons/medicine_icon.svg"
                class="icon"
                alt=""
                srcset=""
              ><span class="sub-title user" >Quản lý thuốc</span>
            </p>
            <span class="ms-3" :hidden="BaseEnable.isHidden">
              Quản lý thuốc</span>
          </div>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          class="nav-link"
          to="/admin/services"
          :class="ActivePages.SMPage"
          v-if="role==Role.ADMIN_SYS"
        >
          <div class="d-flex">
            <p class="service_icon">
              <img
                src="~/assets/images/icons/service_icon.svg"
                class="icon"
                alt=""
                srcset=""
              ><span class="sub-title user" >Quản lý dịch vụ</span>
            </p>
            <span class="ms-3" :hidden="BaseEnable.isHidden" >
              Quản lý dịch vụ</span>
          </div>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          class="nav-link"
          to="#"
          :class="ActivePages.RMPage"
          v-if="role==Role.ADMIN_SYS"
        >
          <div class="d-flex">
            <p class="management-icon">
              <img
                src="~/assets/images/icons/management_icon.svg"
                class="icon"
                alt=""
                srcset=""
              ><span class="sub-title management">Quản lý báo cáo</span>
            </p>
            <span class="ms-3" :hidden="BaseEnable.isHidden">
              Quản lý báo cáo</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </aside>
  <div class="sperator" />
</template>

<style scoped lang="scss">
@import url("~/assets/scss/main.scss");

.sperator {
  height: 100%;
  width: 2px;
}
@media (max-width: 1199px) {
  span {
    visibility: hidden;
    overflow: hidden;
    display: none;
  }
}
.icon {
  width: 23px;
}
p {
  margin: 0px;
}
.sub-title {
  display: none;
  font-size: 14px;
  overflow: visible;
}
.overview-icon {
  position: relative;
}
.overview-icon span {
  position: absolute;
  top: 0;
  left: 100%; /* Để dòng text hiển thị bên cạnh ảnh */
  white-space: nowrap; /* Ngăn text bị xuống dòng */
  background-color: rgba(0, 0, 0, 0);
  color: black;
  padding: 5px;
  border-radius: 5px;
}
.overview-icon:hover span {
  display: block;
  z-index: 10000;
}
</style>
