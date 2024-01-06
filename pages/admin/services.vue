<script lang="ts">
import 'bootstrap/dist/js/bootstrap.esm.min.js'
import { addTitle } from '~/assets/ts/BaseWebApplication'
import { ServiceManager } from '@/services/manager/ServiceManager'
import { Pagination } from '@/helpers/Pagination'
import { CustomAction, Location, Messages, TitleForm, TitleModal, TitlePage, TypeModal } from '@/constants/constants'
import { Notification } from '@/helpers/Notification'
import { Service } from '@/models/Service'
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
      pagination: new Pagination<Service>(),
      notification: new Notification(),
      serviceManager: new ServiceManager(),
      CheckBox: reactive({ isCheckAll: false }),
      content: 'dịch vụ',
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
      listServices: [] as Service[], 
    }
  },
  async mounted() {
    document.title = TitlePage.SERVICES
    addTitle(TitlePage.SERVICES)
    const serviceData = await this.serviceManager.getAllService();
    if (Array.isArray(serviceData)) {
      this.listServices = serviceData; 
    } else if (serviceData && Array.isArray(serviceData)) {
      this.listServices = serviceData;
    }
    this.dataLoaded = true
  },
  methods: {
    chooseForm(titleModal: string,isAdd: boolean,titleForm?: string) {
      if(isAdd)
        this.serviceManager.service = new Service()
      this.titleModal = titleModal
      this.titleForm = titleForm != undefined ? titleForm:''
    },
    async addService() {
      const isSuccess = await this.serviceManager.addService(this.serviceManager.service)
      if (!isSuccess) {
        this.notification.error(Messages.ADD_SERVICE_FAIL)
        return
      }
      this.notification.success(Messages.ADD_SERVICE_SUCCESS)
      await this.getAllService()
    },
    async updateService() {
      const isSuccess = await this.serviceManager.updateService(this.serviceManager.service)
      
      if (!isSuccess) {
        this.notification.error(Messages.EDIT_SERVICE_FAIL)
        return
      }
      this.notification.success(Messages.EDIT_SERVICE_SUCCESS)
      await this.getAllService()
    },
    clickCheckAll() {
      if (this.CheckBox.isCheckAll)
        this.CheckBox.isCheckAll = false
      else this.CheckBox.isCheckAll = true
    },
    async deleteService() {
      const id = this.serviceManager.service.id
      if (id === undefined)
        return false       
      const isSuccess = await this.serviceManager.deleteService(id.toString())
      if (!isSuccess) {
        this.notification.error(Messages.DELETE_SERVICE_FAIL)
        return
      }
      this.notification.success(Messages.DELETE_SERVICE_SUCCESS)
      await this.getAllService()
    },
    async getAllService() {
       const serviceData = await this.serviceManager.getAllService();
    if (Array.isArray(serviceData)) {
      this.listServices = serviceData; 
    } else if (serviceData && Array.isArray(serviceData)) {
      this.listServices = serviceData;
    }
    },
    async paginationChanged() {
      await this.getAllService()
    },
    selectedRow(service: Service) {
      this.serviceManager.service = service
    },
    async searchService($event: Event) {
      $event.preventDefault();
      try {
        this.pagination = await this.serviceManager.searchServices(this.keySearch, 1, 10);
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
    :id="TypeModal.DELETE_SERVICE"
    :typeForm="CustomAction.DELETE"
    :func="deleteService"
    :content-delete-form="TitleModal.DELETE_SERVICE" :object-prop="serviceManager.service"
  />

  <Modal
    :id="TypeModal.ADD_SERVICE"
    :typeForm="CustomAction.ADD"
    :func="addService"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="serviceManager.service"
    :object-manager-prop="serviceManager"
    @updateObjectProp="serviceManager.service = $event"
  />

  <Modal
    :id="TypeModal.EDIT_SERVICE"
    :typeForm="CustomAction.EDIT"
    :func="updateService"
    :titleModal="titleModal"
    :titleForm="titleForm"
    :objectProp="serviceManager.service"
    :object-manager-prop="serviceManager"
    @updateObjectProp="serviceManager.service = $event"
  />
  <div class="row content">
    <div v-if="dataLoaded" class="card">
      <div class="card-body">
        <form class="service-records">
          <div class="row mt-4 text-center">
            <div class="col-lg-4 text-end">
                <div class="input-group mb-2">
                  <input
                    id="fullname"
                    type="search"
                    class="form-control border border-end-0"
                    placeholder="Tìm kiếm theo tên dịch vụ"
                    v-model="keySearch"
                  >
                  <button
                    class="btn btn-white border border-start-0 text-center"
                    type="submit"
                    @click="searchService"
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
                data-bs-target="#ADD_SERVICE"
                @click="chooseForm(TitleModal.ADD_SERVICE,true,TitleForm.SERVICE)"
              >
                Thêm hồ sơ dịch vụ
                <font-awesome-icon
                  :icon="['fas', 'circle-plus']"
                  class="ps-2"
                />
              </button>
            </div>
          </div>
          <DataGridView
            :objectProp="serviceManager.service"
            :titleEditModal="TitleModal.EDIT_SERVICE"
            :title-form-edit-modal="TitleForm.SERVICE"
            :rows="listServices"
            :selectedRow="selectedRow"
            :func="chooseForm"
            :edit-modal-prop="TypeModal.EDIT_SERVICE"
            :delete-modal-prop="TypeModal.DELETE_SERVICE"
            @updateObjectProp="serviceManager.service = $event"
          ></DataGridView>
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
