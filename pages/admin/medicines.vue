<script lang="ts">
import 'bootstrap/dist/js/bootstrap.esm.min.js'
import { addTitle } from '~/assets/ts/BaseWebApplication'
import { MedicineManager } from '@/services/manager/MedicineManager'
import { Pagination } from '@/helpers/Pagination'
import { CustomAction, Location, Messages, TitleForm, TitleModal, TitlePage, TypeModal } from '@/constants/constants'
import { Notification } from '@/helpers/Notification'
import { Medicine } from '@/models/Medicine'
import Modal from '@/components/app/Modal.vue'
import PaginationView from '@/components/app/Pagination.vue'
import NotificationView from '@/components/app/Notification.vue'
import DataGridView from '@/components/app/Datagrid.vue'

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
      medicineManager: new MedicineManager(),
      CheckBox: reactive({ isCheckAll: false }),
      content: 'thuốc',
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
    document.title = TitlePage.MEDICINES
    addTitle(TitlePage.MEDICINES)
    this.pagination = await this.medicineManager.getAllMedicine(1, 10)
    this.dataLoaded = true
    if(this.medicineManager.medicine == undefined){
      this.medicineManager.medicine = new Medicine()
    }
    console.log(">>>>>>>>>>medicine: ",this.medicineManager.medicine)
  },
  methods: {
    chooseForm(titleModal: string,isAdd: boolean,titleForm?: string) {
      if(isAdd)
        this.medicineManager.medicine = new Medicine()
      this.titleModal = titleModal
      this.titleForm = titleForm != undefined ? titleForm:''
    },
    async addMedicine() {
      const isSuccess = await this.medicineManager.addMedicine(this.medicineManager.medicine)
      if (!isSuccess) {
        this.notification.error(Messages.ADD_MEDICINE_FAIL)
        return
      }
      this.notification.success(Messages.ADD_MEDICINE_SUCCESS)
      await this.getAllMedicine()
    },
    async updateMedicine() {
      const isSuccess = await this.medicineManager.updateMedicine(this.medicineManager.medicine)
      
      if (!isSuccess) {
        this.notification.error(Messages.EDIT_MEDICINE_FAIL)
        return
      }
      this.notification.success(Messages.EDIT_MEDICINE_SUCCESS)
      await this.getAllMedicine()
    },
    clickCheckAll() {
      if (this.CheckBox.isCheckAll)
        this.CheckBox.isCheckAll = false
      else this.CheckBox.isCheckAll = true
    },
    async deleteMedicine() {
      const id = this.medicineManager.medicine.id
      if (id === undefined)
        return false       
      const isSuccess = await this.medicineManager.deleteMedicine(id.toString())
      if (!isSuccess) {
        this.notification.error(Messages.DELETE_MEDICINE_FAIL)
        return
      }
      this.notification.success(Messages.DELETE_MEDICINE_SUCCESS)
      await this.getAllMedicine()
    },
    async getAllMedicine() {
      if (
        this.pagination.currentPage !== undefined
        && this.pagination.row !== undefined
      ) {
        this.pagination = await this.medicineManager.getAllMedicine(
          this.pagination.currentPage,
          this.pagination.row,
        )
      }
    },
    async paginationChanged() {
      await this.getAllMedicine()
    },
    selectedRow(medicine: Medicine) {
      this.medicineManager.medicine = medicine
    },
    async searchMedicine($event: Event) {
      $event.preventDefault();
      try {
        this.pagination = await this.medicineManager.searchMedicines(this.keySearch, 1, 10);
      } catch (error) {
        this.totalResultSearch = -1
      }
    }
  },
}
</script>

<template>
  <NotificationView :notification-prop="notification" :right-prop="Location.RIGHT" :top-prop="Location.TOP" />
  <Modal
    :id="TypeModal.DELETE_MEDICINE"
    :typeForm="CustomAction.DELETE"
    :func="deleteMedicine"
    :contentConfirmDialog="TitleModal.DELETE_PATIENT" :object-prop="medicineManager.medicine"
  />
  <Modal
    :typeForm="CustomAction.ADD"
    :func="addMedicine"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="medicineManager.medicine"
    :object-manager-prop="medicineManager"
    :id="TypeModal.ADD_MEDICINE"
    @updateObjectProp="medicineManager.medicine = $event"
  />
  <Modal
    :typeForm="CustomAction.EDIT"
    :func="updateMedicine"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="medicineManager.medicine"
    :object-manager-prop="medicineManager"
    :id="TypeModal.EDIT_MEDICINE"
    @updateObjectProp="medicineManager.medicine=$event"
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
                    @click="searchMedicine"
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
                data-bs-target="#ADD_MEDICINE"
                @click="chooseForm(TitleModal.ADD_MEDICINE,true,TitleForm.MEDICINE)"
              >
                Thêm hồ sơ thuốc
                <font-awesome-icon
                  :icon="['fas', 'circle-plus']"
                  class="ps-2"
                />
              </button>
            </div>
          </div>
          <DataGridView
            :objectProp="medicineManager.medicine"
            :titleEditModal="TitleModal.EDIT_MEDICINE"
            :title-form-edit-modal="TitleForm.MEDICINE"
            :rows="pagination.rows"
            :selectedRow="selectedRow"
            :func="chooseForm"
            :edit-modal-prop="TypeModal.EDIT_MEDICINE"
            :delete-modal-prop="TypeModal.DELETE_MEDICINE"
            @updateObjectProp="medicineManager.medicine = $event"
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
