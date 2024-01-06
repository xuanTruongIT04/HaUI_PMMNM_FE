<script lang="ts">
//constants
import {
  CustomAction,
  Location,
  TitleModal,
  TitlePage,
  TypeModal,
  ButtonContent,
  Role,
} from "@/constants/constants";
// classes
import { Notification } from "@/helpers/Notification";
import { MedicalExamination } from "@/models/MedicalExamination";
//components
import Modal from "@/components/app/Modal.vue";
import DataGridView from "@/components/app/Datagrid.vue";
import PaginationView from "@/components/app/Pagination.vue";
import NotificationView from "@/components/app/Notification.vue";
import { Patient } from "@/models/Patient";
import { PatientManager } from "@/services/manager/PatientManager";

definePageMeta({
  layout: "dashboard",
});
export default {
  name: 'DetailMedicalExamination',
  props:{
    medicalExam: MedicalExamination,
    patientObject: Patient,
    func: Function,
  },
  components: {
    PaginationView,
    NotificationView,
    Modal,
    DataGridView,
  },
  data() {
    return {
      notification: new Notification(),
      content: "ca khám",
      patient: this.patientObject,
      dataLoaded: false,
      CustomAction,
      Location,
      TitleModal,
      TypeModal,
      ButtonContent,
      Role,
    };
  },
  async mounted() {
    document.title = TitlePage.DETAIL_MEDICAL_EXAMINATION;
    this.dataLoaded = true;
  },
  watch:{
    patientObject(newPatientObject) {
      this.patient = Object.assign(newPatientObject, {})
    },
  },
  methods: {
    async complete(){
      if(this.func!= undefined)
        await this.func()
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
  <div class="row content">
    <div v-if="dataLoaded" class="card">
      <div class="card-body">
        <form class="patient-records">
          <div class="row mt-4 text-center border-bottom">
            <div class="col-lg-4 text-start mt-2">
              <h6 style="color: blue" class="fw-bold">Hồ sơ bệnh nhân</h6>
            </div>
            <div class="col-lg-3 text-end" />
            <div class="col-lg-2 text-end"></div>
            <div class="col-lg-3 text-end mb-2">
              <input type="button" class="btn btn-primary" @click="complete" value="Hoàn thành"/>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-lg-2">
              <div class="row">
                <label for="" class="mt-2">Họ và tên</label>
                <label for="" class="mt-1 infor-patient">{{ patient?.fullname }}</label>
              </div>
              <div class="row">
                <label for="" class="mt-2">Ngày sinh</label>
                <label for="" class="mt-1 infor-patient">{{ patient?.birthday}}</label>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="row">
                <label for="" class="mt-2">Ngày khám</label>
                <label for="" class="mt-1 infor-patient">{{ medicalExam?.medicalExaminationDay }}</label>
              </div>
              <div class="row">
                <label for="" class="mt-2">Giới tính</label>
                <label for="" class="mt-1 infor-patient">{{ patient?.gender }}</label>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="row">
                <label for="" class="mt-2">Bác sĩ khám</label>
                <label for="" class="mt-1 infor-patient"
                  >{{ medicalExam?.doctorName }}</label
                >
              </div>
              <div class="row">
                <label for="" class="mt-2">Mã ca khám</label>
                <label for="" class="mt-1 infor-patient">{{ medicalExam?.idMedicalExam }}</label>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="row">
                <label for="" class="mt-2">Số điện thoại</label>
                <label for="" class="mt-1 infor-patient">{{ patient?.phone }}</label>
              </div>
              <div class="row">
                <label for="" class="mt-2">Địa chỉ</label>
                <label for="" class="mt-1 infor-patient"
                  >{{ patient?.address }}</label
                >
              </div>
            </div>
          </div>
          
        </form>
      </div>
      <div class="card-body">
        <form class="patient-records">
          <div class="row mt-3">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Khám bệnh
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Thuốc
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Lịch sử
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabindex="0"
              >
                <div class="row " >
                  <div class="col-lg-6">
                    <div class="row">
                      <select class="form-control bg-primary text-white">
                        <option>Tiền sử bệnh</option>
                        <option>Tiền sử bệnh 1</option>
                        <option>Tiền sử bệnh 2</option>
                        <option>Tiền sử bệnh 3</option>
                      </select>
                    </div>
                    <div class="row form-floating mt-2">
                      <textarea
                          class="form-control"
                          placeholder="Nhập tiền sử bệnh"
                          id="floatingTextarea2"
                          style="height: 200px"
                        ></textarea>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="row">
                      <select class="form-control bg-primary text-white">
                        <option>Khám lâm sàn</option>
                        <option>Khám lâm sàn</option>
                        <option>Khám lâm sàn</option>
                        <option>Khám lâm sàn</option>
                      </select>
                    </div>
                    <div class="row form-floating mt-2">
                      <textarea
                          class="form-control"
                          placeholder="Nhập kết quả khám lâm sàn"
                          id="floatingTextarea2"
                          style="height: 200px"
                        ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row mt-4 ">
                  <div class="col-lg-6">
                    <div class="row">
                      <select class="form-control bg-primary text-white">
                        <option>Khám sơ bộ</option>
                      </select>
                    </div>
                    <div class="row form-floating mt-2">
                      <textarea
                          class="form-control"
                          placeholder="Nhập kết quả khám sơ bộ"
                          id="floatingTextarea2"
                          style="height: 200px"
                        ></textarea>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="row">
                      <select class="form-control bg-primary text-white">
                        <option>Chuẩn đoán xác định</option>
                      </select>
                    </div>
                    <div class="row form-floating mt-2">
                      <textarea
                          class="form-control"
                          placeholder="Nhập kết quả chuẩn đoán"
                          id="floatingTextarea2"
                          style="height: 200px"
                        ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabindex="0"
              >
                Đoàn Văn Quân
              </div>
              <div
                class="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
                tabindex="0"
              >
                Đoàn Văn Chính
              </div>
            </div>
          </div>
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
.infor-patient {
  font-weight: bold;
}
.tbl-header,
.footer {
  background-color: #e7edff;
}
.combobox {
  height: 50px;
  background-color: blue;
}
</style>
