<script lang="ts">
import 'bootstrap/dist/js/bootstrap.esm.min.js'
import { addTitle } from '~/assets/ts/BaseWebApplication'
import { Pagination } from '@/helpers/Pagination'
import { CustomAction, Location, Messages, TitleForm, TitleModal, TitlePage, TypeModal } from '@/constants/constants'
import { Notification } from '@/helpers/Notification'
import { Medicine } from '@/models/Medicine'
import Modal from '@/components/app/Modal.vue'
import PaginationView from '@/components/app/Pagination.vue'
import NotificationView from '@/components/app/Notification.vue'
import DataGridView from '@/components/app/Datagrid.vue'
import { UserManager } from '@/services/manager/UserManager'
import { User } from '@/models/User'

definePageMeta({
  layout: 'dashboard',
})
export default {
  components: {
    PaginationView,
    NotificationView,
    Modal,
    DataGridView,
  },
  data() {
    return {
      pagination: new Pagination<Medicine>(),
      notification: new Notification(),
      userManager: new UserManager(),
      CheckBox: reactive({ isCheckAll: false }),
      content: 'tài khoản',
      dataLoaded: false,
      titleForm: '',
      titleModal: '',
      CustomAction,
      Location,
      TitleModal,
      keySearch: '',
      totalResultSearch: 0,
      TypeModal,
      TitleForm,
    }
  },
  async mounted() {
    document.title = TitlePage.LIST_ACCOUNT
    addTitle(TitlePage.LIST_ACCOUNT)
    await this.userManager.getAllUser()
    this.pagination = new Pagination(20,1,this.userManager.users.length,3,this.userManager.users)
    this.dataLoaded = true
  },
  methods: {
    chooseForm(titleModal: string,isAdd: boolean,titleForm?: string) {
      if(isAdd)
        this.userManager.user = new User()
      this.titleModal = titleModal
      this.titleForm = titleForm != undefined ? titleForm:''
    },
    clickCheckAll() {
      if (this.CheckBox.isCheckAll)
        this.CheckBox.isCheckAll = false
      else this.CheckBox.isCheckAll = true
    },
    async getAllMedicine() {
      if (
        this.pagination.currentPage !== undefined
        && this.pagination.row !== undefined
      ) {
         await this.userManager.getAllUser()
         this.pagination = new Pagination(20,1,this.userManager.users.length,3,this.userManager.users)
      }
    },
    async paginationChanged() {
      await this.getAllMedicine()
    },
    selectedRow(user: User) {
      this.userManager.user = user
    },
  },
}
</script>

<template>
  <NotificationView :notification-prop="notification" :right-prop="Location.RIGHT" :top-prop="Location.TOP" />
  <Modal
    :id="TypeModal.DELETE_ACCOUNT"
    :typeForm="CustomAction.DELETE"
    :contentConfirmDialog="TitleModal.DELETE_ACCOUNT" :object-prop="userManager.user"
  />
  <Modal
    :typeForm="CustomAction.ADD"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="userManager.user"
    :object-manager-prop="userManager"
    :id="TypeModal.ADD_ACCOUNT"
    @updateObjectProp="userManager.user = $event"
  />
  <div class="row content">
    <div v-if="dataLoaded" class="card">
      <div class="card-body">
        <form class="medicine-records">
          <div class="row mt-4 text-center">
            <div class="col-lg-4 text-end">
                <div class="input-group mb-2">
                  <input
                    id="fullname"
                    type="search"
                    class="form-control border border-end-0"
                    placeholder="Tìm kiếm theo tên thuốc"
                    v-model="keySearch"
                  >
                  <button
                    class="btn btn-white border border-start-0 text-center"
                    type="submit"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'magnifying-glass']"
                      class="fs-5 text-primary"
                    />
                  </button>
                </div>
            </div>
            <div class="col-lg-3 text-end" />
            <div class="col-lg-2 text-end" />
            <div class="col-lg-3 text-end">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#ADD_ACCOUNT"
                @click="chooseForm(TitleModal.ADD_ACCOUNT,true,TitleForm.ACCOUNT)"
              >
                Thêm tài khoản
                <font-awesome-icon
                  :icon="['fas', 'circle-plus']"
                  class="ps-2"
                />
              </button>
            </div>
          </div>
          <DataGridView
            :objectProp="userManager.user"
            :rows="pagination.rows"
            :selectedRow="selectedRow"
            :func="chooseForm"
            :delete-modal-prop="TypeModal.DELETE_ACCOUNT"
            @updateObjectProp="userManager.user = $event"
          ></DataGridView>
          <div class="row pagination mt-2">
            <PaginationView
              :pagination="pagination"
              :start="0"
              :end="4"
              :content="content"
              @updatePagination="(pagination = $event), paginationChanged()"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media (max-width: 1200px) {
  .content {
    width: 1180px;
  }
}
.th-start {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.th-end {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
tr {
  height: 50px;
}
.tbl-header,
.footer {
  background-color: #e7edff;
}
table {
  border-collapse: collapse;
  overflow: hidden;
  width: 100%;
}
tr:hover {
  background-color: #e7edff;
  border-radius: 10px !important;
}
#rows {
  background-color: white;
  width: 50px;
  height: 30px;
}
.pagination {
  background-color: #e7edff;
  height: 50px;
  border-radius: 10px;
  margin: 0px;
}
.form {
  background-color: #fffffe;
  z-index: 10000000000000;
}
</style>
