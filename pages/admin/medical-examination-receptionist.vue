<script lang="ts">
import "bootstrap/dist/js/bootstrap.esm.min.js";
import { BaseTitleDisplay, addTitle } from "~/assets/ts/BaseWebApplication";
//constants
import {
  CustomAction,
  Location,
  Messages,
  TitleForm,
  TitleModal,
  TitlePage,
  TypeModal,
  ButtonContent,
  Role,
  Status,
} from "@/constants/constants";
// classes
import { Pagination } from "@/helpers/Pagination";
import { Notification } from "@/helpers/Notification";
import { MedicalExaminationManager } from "@/services/manager/MedicalExaminationManager";
import { MedicalExamination } from "@/models/MedicalExamination";
//components
import Modal from "@/components/app/Modal.vue";
import DataGridView from "@/components/app/Datagrid.vue";
import PaginationView from "@/components/app/Pagination.vue";
import NotificationView from "@/components/app/Notification.vue";
import DetailMedicalExamination from '@/components/app/detail-medical-examination.vue'
import { PatientManager } from "@/services/manager/PatientManager";
import { Patient } from "@/models/Patient";

definePageMeta({
  layout: "dashboard",
});
export default {
  components: {
    PaginationView,
    NotificationView,
    Modal,
    DataGridView,
    DetailMedicalExamination,
  },
  data() {
    return {
      pagination: new Pagination<MedicalExamination>(),
      notification: new Notification(),
      medicalExamManager: new MedicalExaminationManager(),
      patientManager: new PatientManager(),
      content: "ca khám",
      dataLoaded: false,
      titleForm: "",
      titleModal: "",
      dataTarget: "",
      CustomAction,
      Location,
      TitleModal,
      TypeModal,
      ButtonContent,
      TitleForm,
      enabledDetailExam: false,
      Role,
    };
  },
  async mounted() {
    document.title = TitlePage.MEDICAL_EXAMINATION_RECEPTIONIST;
    this.authorization();
    await this.medicalExamManager.getAllMedicalExam(1, 10);
    this.pagination = this.medicalExamManager.pagination;
    this.dataLoaded = true;
    this.dataTarget = `#${TypeModal.ADD_PATIENT}`;
  },
  methods: {
    authorization() {
      if (this.medicalExamManager.role == Role.DOCTOR) {
        addTitle(TitlePage.MEDICAL_EXAMINATION_DOCTOR);
        return;
      }
      if (this.medicalExamManager.role == Role.RECEPTIONIST) {
        addTitle(TitlePage.MEDICAL_EXAMINATION_RECEPTIONIST);
        return;
      }

      addTitle(TitlePage.MEDICAL_EXAMINATION_RECEPTIONIST);
    },
    chooseForm(
      titleModal: string,
      isAdd: boolean,
      titleForm?: string
    ): boolean {
      if (isAdd) {
        this.medicalExamManager.medicalExam = new MedicalExamination();
        this.patientManager.patient = new Patient();
      }
      this.titleModal = titleModal;
      this.titleForm = titleForm != undefined ? titleForm : "";
      return true;
    },
    async createPatient() {
      const isSuccess = await this.patientManager.addPatient(
        this.patientManager.patient
      );
      if (!isSuccess) {
        this.notification.error(Messages.ADD_PATIENT_FAIL);
      } else {
        this.notification.success(Messages.ADD_PATIENT_SUCCESS);
      }
      this.nextForm(
        TypeModal.ADD_MEDICAL_EXAM,
        TitleForm.MEDICAL_EXAM,
        TitleModal.ADD_MEDICAL_EXAM,
        true
      );
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

      const clickHandler = () => {
        if (!clickHandled) {
          this.chooseForm(titleModal, true, titleForm);
          clickHandled = true;
          // Xóa sự kiện click sau khi đã xử lý một lần
          formNext?.removeEventListener("click", clickHandler, false);
        }
      };
      setTimeout(() => {
        formNext?.addEventListener("click", clickHandler, false);
        formNext?.click();
      }, 2000);
    },
    async createMedicalExam() {
      const isSuccess = await this.medicalExamManager.createMedicalExam(
        this.medicalExamManager.medicalExam,
        this.patientManager.patient
      );
      if (!isSuccess) {
        this.notification.error(Messages.ADD_MEDICAL_FAIL);
        this.dataTarget = `#${TypeModal.ADD_PATIENT}`;
        return;
      }
      this.notification.success(Messages.ADD_MEDICAL_EXAM);
      await this.getAllMedicalExam(
        this.pagination.currentPage,
        this.pagination.row
      );
      this.dataTarget = `#${TypeModal.ADD_PATIENT}`;
    },
    async editMedicalExam() {
      const isSuccess = await this.medicalExamManager.updateMedicalExam(
        this.medicalExamManager.medicalExam
      );
      if (!isSuccess) {
        this.notification.error(Messages.EDIT_MEDICAL_EXAM_FAIL);
        return;
      }
      this.notification.success(Messages.EDIT_MEDICAL_EXAM_SUCCESS);
      await this.getAllMedicalExam(
        this.pagination.currentPage,
        this.pagination.row
      );
    },

    async deleteMedicalExam() {
      const id = this.medicalExamManager.medicalExam.id;
      if (id === undefined) return false;
      this.medicalExamManager.medicalExam.status = Status.CANCEL
      const isSuccess = this.medicalExamManager.deleteMedicalExam(
        this.medicalExamManager.medicalExam
      );
      if (!isSuccess) {
        this.notification.error(Messages.ADD_PATIENT_FAIL);
        return;
      }
      this.notification.success(Messages.ADD_PATIENT_SUCCESS);
      await this.getAllMedicalExam(
        this.pagination.currentPage,
        this.pagination.row
      );
    },
    async getAllMedicalExam(currentPage?: number, row?: number) {
      if (currentPage !== undefined && row !== undefined) {
        await this.medicalExamManager.getAllMedicalExam(currentPage, row);
        this.pagination = this.medicalExamManager.pagination;
        await this.medicalExamManager.getAllStatus()
      }
    },
    async paginationChanged() {
      await this.getAllMedicalExam(
        this.pagination.currentPage,
        this.pagination.row
      );
    },
    selectedRow(object: any) {
      this.medicalExamManager.medicalExam = object;
    },
    async getPatient(){
      await this.medicalExamManager.getAllPatient()
      let patient = new Patient();
      this.medicalExamManager.listPatients.forEach(p => {
        if(p.fullname == this.medicalExamManager.medicalExam.patientName){
          patient = p;
        }
      })
      this.patientManager.patient = patient;
    },
    async changeStatus() {
      if (this.medicalExamManager.role != Role.DOCTOR) {
        return;
      }
      if(this.medicalExamManager.medicalExam.status == Status.CANCEL){
        return
      }
      if(this.medicalExamManager.medicalExam.status == Status.CHECKING){
        this.medicalExamManager.medicalExam.status = Status.COMPLETE
        const isSuccess = await this.medicalExamManager.updateStatus(this.medicalExamManager.medicalExam)
        if(!isSuccess){
          this.notification.error(Messages.UPDATE_STATUS_FAIL)
          return
        }
        await this.getPatient()
        this.notification.success(Messages.UPDATE_STATUS_SUCCESS)
        this.enabledDetailExam = true
        await this.getAllMedicalExam(this.pagination.currentPage,this.pagination.row)
        return
      }

      if(this.medicalExamManager.medicalExam.status != Status.WAITING){
        return
      }
      this.medicalExamManager.medicalExam.status = Status.CHECKING
      const isSuccess = await this.medicalExamManager.updateStatus(this.medicalExamManager.medicalExam)
      if(!isSuccess){
        this.notification.error(Messages.UPDATE_STATUS_FAIL)
        return
      }
      await this.getPatient()
      this.notification.success(Messages.UPDATE_STATUS_SUCCESS)
      this.enabledDetailExam = true
      await this.getAllMedicalExam(this.pagination.currentPage,this.pagination.row)
    },
  },
};
</script>

<template>
  <div
    style="position: relative; width: 100%; height: 100%; z-index: 1000"
    :hidden="notification.enabled"
  >
    <NotificationView
      :notification-prop="notification"
      :right-prop="Location.RIGHT"
      :top-prop="Location.TOP"
    />
  </div>
  <Modal
    :contentConfirmDialog="TitleModal.DELETE_MEDICAL_EXAM"
    :object-prop="medicalExamManager.medicalExam"
    :typeForm="CustomAction.DELETE"
    :id="TypeModal.DELETE_MEDICAL_EXAM"
    :func="deleteMedicalExam"
  />
  <Modal
    :contentConfirmDialog="TitleModal.CONFIRM_MEDICAL_EXAM"
    :typeForm="CustomAction.DELETE"
    :id="TypeModal.CONFIRM_EXAMINATION"
    :btnFirst="ButtonContent.CLOSE"
    :btnSecond="ButtonContent.ACCEPT"
    :func="changeStatus"
  />

  <Modal
    :typeForm="CustomAction.ADD"
    :func="createMedicalExam"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="medicalExamManager.medicalExam"
    :object-manager-prop="medicalExamManager"
    :id="TypeModal.ADD_MEDICAL_EXAM"
    :btnFirst="ButtonContent.EXIT"
    :btnSecond="ButtonContent.ADD"
    @updateObjectProp="medicalExamManager.medicalExam = $event"
  />
  <Modal
    :typeForm="CustomAction.ADD"
    :func="createPatient"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="patientManager.patient"
    :object-manager-prop="patientManager"
    :id="TypeModal.ADD_PATIENT"
    :btnFirst="ButtonContent.EXIT"
    :btnSecond="ButtonContent.NEXT"
    @updateObjectProp="patientManager.patient = $event"
  />

  <Modal
    :typeForm="CustomAction.EDIT"
    :func="editMedicalExam"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="medicalExamManager.medicalExam"
    :object-manager-prop="medicalExamManager"
    :id="TypeModal.EDIT_MEDICAL_EXAM"
    :btnFirst="ButtonContent.EXIT"
    :btnSecond="ButtonContent.UPDATE"
    @updateObjectProp="medicalExamManager.medicalExam = $event"
  />
  <div class="row content">
    <DetailMedicalExamination v-if="enabledDetailExam && medicalExamManager.role == Role.DOCTOR" :func="changeStatus" :medical-exam="medicalExamManager.medicalExam" :patient-object="patientManager.patient"></DetailMedicalExamination>
    <div v-if="dataLoaded && enabledDetailExam!=true" class="card">
      <div class="card-body">
        <form class="patient-records">
          <div class="row mt-4 text-center">
            <div class="col-lg-4 text-end">
              <div class="input-group mb-2">
                <input
                  id="fullname"
                  type="search"
                  name="fullname"
                  class="form-control border border-end-0"
                  placeholder="Tìm kiếm mã ca khám"
                />
                <button
                  class="btn btn-white border border-start-0 text-center"
                  type="button"
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
          </div>
          <DataGridView
            :objectProp="medicalExamManager.medicalExam"
            :titleEditModal="TitleModal.EDIT_MEDICAL_EXAM"
            :titleFormEditModal="TitleForm.MEDICAL_EXAM"
            :rows="pagination.rows"
            :selectedRow="selectedRow"
            :func="chooseForm"
            :edit-modal-prop="TypeModal.EDIT_MEDICAL_EXAM"
            :delete-modal-prop="TypeModal.DELETE_MEDICAL_EXAM"
            :roleProp="medicalExamManager.role"
            :roleNotAccess="Role.DOCTOR"
          ></DataGridView>

          <PaginationView
            :pagination="pagination"
            :start="0"
            :end="4"
            :content="content"
            @updatePagination="pagination, paginationChanged()"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media (max-width: 1200px) {
  .content {
    width: 1500px;
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
.form {
  background-color: #fffffe;
  z-index: 10000000000000;
}
</style>
