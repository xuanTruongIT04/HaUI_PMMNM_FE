<script lang="ts">
import 'bootstrap/dist/js/bootstrap.esm.min.js'
import { addTitle } from '~/assets/ts/BaseWebApplication'
import { PatientManager } from '@/services/manager/PatientManager'
import {MedicalExaminationManager} from'@/services/manager/MedicalExaminationManager'
import { Pagination } from '@/helpers/Pagination'
import { CustomAction, Location, Messages, TitleForm, TitleModal, TitlePage,TypeModal,ButtonContent, Role } from '@/constants/constants'
import { Notification } from '@/helpers/Notification'
import { Patient } from '@/models/Patient'

import Modal from '@/components/app/Modal.vue'
import PaginationView from '@/components/app/Pagination.vue'
import NotificationView from '@/components/app/Notification.vue'
import DataGridView from '@/components/app/Datagrid.vue'
import { MedicalExamination } from '@/models/MedicalExamination'

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
      pagination: new Pagination<Patient>(),
      notification: new Notification(),
      patientManager: new PatientManager(),
      role:'',
      medicalExamManager: new MedicalExaminationManager(),
      content: 'bệnh nhân',
      dataLoaded: false,
      dataTarget: `#${TypeModal.ADD_PATIENT}`,
      titleForm: '',
      titleModal: '',
      newPatient:false,
      CustomAction,
      Location,
      TitleModal,
      keySearch: '',
      totalResultSearch: 0,
      TypeModal,
      TitleForm,
      ButtonContent,
      Role,
    }
  },
  async mounted() {
    document.title = TitlePage.PATIENT_RECORDS
    addTitle(TitlePage.PATIENT_RECORDS)
    this.pagination = await this.patientManager.getAllPatients(1, 10)
    this.dataLoaded = true
    await this.medicalExamManager.initData()
    this.setRole()
  },
  methods: {
    setRole(){
      this.role = this.patientManager.role != undefined ? this.patientManager.role: Role.RECEPTIONIST
    },
    chooseForm(
      titleModal: string,
      isAdd: boolean,
      titleForm?: string
    ): boolean {
      if (isAdd) {
        this.medicalExamManager.medicalExam = new MedicalExamination();
        this.patientManager.patient = new Patient(`${this.pagination.totalRecord != undefined ?this.pagination.totalRecord+1:1}`);
      }
      this.titleModal = titleModal;
      this.titleForm = titleForm != undefined ?  titleForm : '';
      return true;
    },
    async nextForm(
      typeModal: string,
      titleForm: string,
      titleModal: string,
      isClick: boolean
    ) {
      this.dataTarget = `#${typeModal}`;
      if (!isClick) {
        return;
      }
      var formNext = document.getElementById("add_form");
      let clickHandled = false;

      const clickHandler = ()=>{
        if(!clickHandled){
          this.chooseForm(titleModal, true,titleForm);
          clickHandled = true;

          // Xóa sự kiện click sau khi đã xử lý một lần
          formNext?.removeEventListener("click", clickHandler, false);
        }
      }
      setTimeout(() => {
        formNext?.addEventListener("click",clickHandler,false);
        formNext?.click();
      }, 2000);
    },
    async createMedicalExam() {
      if(this.newPatient){
        this.patientManager.patient = await this.patientManager.getLatestPatient()
      }
      const isSuccess = await this.medicalExamManager.createMedicalExam(
        this.medicalExamManager.medicalExam,
        this.patientManager.patient
      );
      this.newPatient = false
      if (!isSuccess) {
        this.notification.error(Messages.ADD_MEDICAL_FAIL);
        this.dataTarget = `#${TypeModal.ADD_PATIENT}`
        return;
      }
      this.notification.success(Messages.ADD_MEDICAL_EXAM);
      this.dataTarget = `#${TypeModal.ADD_PATIENT}`

    },
    async addPatient() {

      const isSuccess = await this.patientManager.addPatient(this.patientManager.patient)
      this.newPatient = true
      if (!isSuccess) {
        this.notification.error(Messages.ADD_PATIENT_FAIL)
        return
      }
      this.notification.success(Messages.ADD_PATIENT_SUCCESS)
      await this.getAllPatient()
      this.nextForm(
        TypeModal.ADD_MEDICAL_EXAM,
        TitleForm.MEDICAL_EXAM,
        TitleModal.ADD_MEDICAL_EXAM,
        true
      );
    },
    async updatePatient() {
      const isSuccess = await this.patientManager.updatePatient(this.patientManager.patient)
      
      if (!isSuccess) {
        this.notification.error(Messages.EDIT_PATIENT_FAIL)
        return
      }
      this.notification.success(Messages.EDIT_PATIENT_SUCCESS)
      await this.getAllPatient()
    },
    async deletePatient() {
      const id = this.patientManager.patient.id
      if (id === undefined)
        return false
      const isSuccess = await this.patientManager.deletePatient(id.toString())
      if (!isSuccess) {
        this.notification.error(Messages.DELETE_PATIENT_FAIL)
        return
      }
      this.notification.success(Messages.DELETE_PATIENT_SUCCESS)
      await this.getAllPatient()
    },
    async getAllPatient() {
      if (
        this.pagination.currentPage !== undefined
        && this.pagination.row !== undefined
      ) {
        this.pagination = await this.patientManager.getAllPatients(
          this.pagination.currentPage,
          this.pagination.row,
        )
      }
    },
    async paginationChanged() {
      await this.getAllPatient()
    },
    selectedRow(patient: any) {
      this.patientManager.patient = patient
    },
    async searchPatient($event: Event) {
      $event.preventDefault();
      try {
        this.pagination = await this.patientManager.searchPatients(this.keySearch, 1, 10);
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
    :id="TypeModal.DELETE_PATIENT"
    :typeForm="CustomAction.DELETE"
    :func="deletePatient"
    :contentConfirmDialog="TitleModal.DELETE_PATIENT" :object-prop="patientManager.patient"
  />
  <Modal
    :typeForm="CustomAction.ADD"
    :func="createMedicalExam"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="medicalExamManager.medicalExam"
    :object-manager-prop="medicalExamManager"
    :id="TypeModal.ADD_MEDICAL_EXAM"
    @updateObjectProp="medicalExamManager.medicalExam = $event"
  />
  <Modal
    :typeForm="CustomAction.ADD"
    :func="addPatient"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="patientManager.patient"
    :object-manager-prop="patientManager"
    :btnFirst="ButtonContent.EXIT"
    :btnSecond="ButtonContent.NEXT"
    :id="TypeModal.ADD_PATIENT"
    @updateObjectProp="patientManager.patient = $event"
  />
  <Modal
    :typeForm="CustomAction.EDIT"
    :func="updatePatient"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="patientManager.patient"
    :object-manager-prop="patientManager"
    :id="TypeModal.EDIT_PATIENT"
    @updateObjectProp="patientManager.patient=$event"
  />
  <div class="row content">
    <div v-if="dataLoaded" class="card">
      <div class="card-body">
        <form class="patient-records">
          <div class="row mt-4 text-center">
            <div class="col-lg-4 text-end">
                <div class="input-group mb-2">
                  <input
                    id="fullname"
                    type="search"
                    class="form-control border border-end-0"
                    placeholder="Tìm kiếm theo tên bệnh nhân"
                    v-model="keySearch"
                  >
                  <button
                    class="btn btn-white border border-start-0 text-center"
                    type="submit"
                    @click="searchPatient"
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
            <div class="col-lg-3 text-end" v-if="role==Role.ADMIN_SYS || role==Role.RECEPTIONIST">
              <button
                id="add_form"
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                :data-bs-target="dataTarget"
                @click="chooseForm(TitleModal.ADD_PATITENT, true,TitleForm.PATIENT)"
              >
                Thêm hồ sơ bệnh nhân
                <font-awesome-icon
                  :icon="['fas', 'circle-plus']"
                  class="ps-2"
                />
              </button>
            </div>
          </div>
          <DataGridView
            :objectProp="patientManager.patient"
            :titleEditModal="TitleModal.EDIT_PATIENT"
            :titleFormEditModal = "TitleForm.PATIENT"
            :rows="pagination.rows"
            :selectedRow="selectedRow"
            :is-press-table-row="true"
            :func="chooseForm"
            :edit-modal-prop="TypeModal.EDIT_PATIENT"
            :delete-modal-prop="TypeModal.DELETE_PATIENT"
            @updateObjectProp="patientManager.patient = $event"
          ></DataGridView>
          <PaginationView
              :pagination="pagination"
              :start="0"
              :end="4"
              :content="content"
              @updatePagination="(pagination = $event), paginationChanged()"
            />
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
