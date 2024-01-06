<script>
import CreateForm from '@/components/modules/patient/Create'
import ConfirmDialog from '@/components/modules/patient/ConfirmDialog'
import { CustomAction } from '@/constants/constants.ts'

export default {
  name: 'Modal',
  components: {
    CreateForm,
    ConfirmDialog,
  },
  props: {
    titleModal: String,
    titleForm: String,
    objectProp: Object,
    objectManagerProp: Object,
    func: Function,
    typeForm: String,
    id: String,
    btnFirst: String,
    btnSecond: String,
    contentConfirmDialog: String,
  },
  emits: ['updateObjectProp'],
  data() {
    return {
      object: this.objectProp,
      objectManager: this.objectManagerProp,
      obj: Object,
      CustomAction,
      btnContentFirst: this.btnFirst,
      btnContentSecond: this.btnSecond,
      sizeForm: 'modal-lg',
    }
  },
  watch: {
    objectProp(newObjectProp) {
      this.object = Object.create(newObjectProp)
    },
  },
  mounted() {
    this.chooseForm()
  },
  methods: {
    chooseForm() {
      if(this.btnFirst!=undefined || this.btnSecond!=undefined){
        return
      }
      if (this.typeForm === CustomAction.ADD) {
        this.btnContentFirst = 'Thoát'
        this.btnContentSecond = 'Thêm'
        return
      }

      if (this.typeForm === CustomAction.EDIT) {
        this.btnContentFirst = 'Thoát'
        this.btnContentSecond = 'Cập nhật'
        return
      }

      if (this.typeForm === CustomAction.DELETE) {
        this.btnContentFirst = 'Thoát'
        this.btnContentSecond = 'Xóa'
        this.sizeForm = 'modal-lg'
        return
      }
    },
    updatePatient() {
      this.$emit('updateObjectProp', this.object)
    },
    func() {
      this.updatePatient()
      this.func()
    },
  },
}
</script>

<template>
  <div :id="id" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" :class="sizeForm">
      <div class="modal-content">
        <div class="modal-header">
          <h3 v-if="del" id="exampleModalLabel" class="modal-title fw-bold" />
          <h3 v-else id="exampleModalLabel" class="modal-title fw-bold">
            {{ titleModal }}
          </h3>
        </div>
        <div v-if="typeForm === CustomAction.ADD" class="modal-body">
          <CreateForm :objectManagerProp="objectManager" :objectProp="object" :titleForm="titleForm" @updateObjectProp="object = $event" />
        </div>
        <div v-if="typeForm === CustomAction.EDIT" class="modal-body">
          <CreateForm :objectManagerProp="objectManager" :objectProp="object" :titleForm="titleForm" @updateObjectProp="object = $event" />
        </div>
        <div v-if="typeForm === CustomAction.DELETE" class="modal-body">
          <ConfirmDialog v-if="object!=undefined" :objectProp="object" :content="contentConfirmDialog" @updateObjectProp="object=$event" />
          <ConfirmDialog v-else :content="contentConfirmDialog"/>
        </div>
        <div class="modal-footer d-flex flex-row justify-content-center">
          <button type="button" class="btn btn-secondary me-5" data-bs-dismiss="modal" style="width: 100px;">
            {{ btnContentFirst }}
          </button>
          <button type="button" class="btn btn-primary ms-5" data-bs-dismiss="modal"  style="width: 100px;" @click="func()">
            {{ btnContentSecond }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
