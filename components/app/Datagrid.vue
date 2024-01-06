<script lang="ts">
import {InputTypeSelector} from '@/helpers/Selector'
import {CustomReflect} from '@/helpers/Decorator'
import { Status, TitleForm, TitleModal,Role } from '@/constants/constants'
import check_icon from '@/assets/images/icons/checking_icon.svg'
import cancel_icon from '@/assets/images/icons/cancel_icon.svg'
import waiting_icon from '@/assets/images/icons/waiting_icon.svg'
import complete_icon from '@/assets/images/icons/complete_icon.svg'

export default {
  name: 'DataGridView',
  props: {
    objectProp: Object,
    rows: [Object],
    titleEditModal: String,
    titleFormEditModal: String,
    isPressTableRow: Boolean,
    titleDelModal: String,
    func: Function,
    changeStatus: Function,
    selectedRow: Function,
    editModalProp: String,
    deleteModalProp: String,
    roleProp: String,
    roleNotAccess: String,
  },
  emits:['updateObjectProp'],
  data() {
    return {
      object: this.objectProp,
      obj: Object,
      nameProperties: [''],
      role: this.roleProp,
      CheckBox: reactive({ isCheckAll: false }),
      CustomReflect,
      Status,
      editModal: `#${this.editModalProp}`,
      deleteModal: `#${this.deleteModalProp}`,
      check_icon,
      cancel_icon,
      waiting_icon,
      complete_icon,
      Role,
    }
  },
  watch: {
    objectProp(newObjectProp) {
      this.object = Object.assign(newObjectProp, {})
    },
  },
  mounted() {
    this.getNameProp()
  },
  methods: {
    updateObjectProp() {
      this.$emit('updateObjectProp',this.object)
    },
    click(){
      if(!this.isPressTableRow){
        return
      }
      if(this.func!==undefined)
        this.func(TitleModal.ADD_MEDICAL_EXAM,true,TitleForm.MEDICAL_EXAM)
    },
    getNameProp(){
      this.nameProperties = ['']
      let map = new Map<string,string>()
      if(this.object == undefined){
        return
      }
      map = InputTypeSelector.getPropetyAndType(this.object)
      for (const [key, value] of map) {
        if(CustomReflect.isDisabledDatagrid(this.object,key)===true || value==undefined)
          continue
        this.nameProperties.push(key)
      }
    },
    chooseForm(title: any,titleForm?: string) {
      if(this.func !== undefined)
        this.func(title,false,titleForm)
    },
    getLabelByProp(target: any, key: string): string {
      return CustomReflect.getLabel(target, key)
    },
    clickCheckAll() {
      if (this.CheckBox.isCheckAll)
        this.CheckBox.isCheckAll = false
      else this.CheckBox.isCheckAll = true
    },
    selected(object: any) {
      if(this.selectedRow !== undefined)
          this.selectedRow(object)
    },
  },
}
</script>

<template>
  <div class="row mt-4">
    <div class="col-12">
      <table>
        <thead>
          <tr class="tbl-header">
            <th class="ps-3 th-start ms-1">
              <input
                id="checkAlls"
                type="checkbox"
                name="checkAll"
                class="form-check-input"
                @click="clickCheckAll"
              >
            </th>
            <th v-for="(name,index) in nameProperties" :key="index">{{getLabelByProp(object,name)}}</th>
            <th class="th-end">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in rows"
            :key="index"
            @click="selected(row)"
          >
            <td class="th-start ps-3">
              <input
                id="ckb"
                type="checkbox"
                name="ckb"
                class="form-check-input"
                :checked="CheckBox.isCheckAll"
              >
            </td>
           <td v-for="(name,index) in nameProperties" :key="index" id="allow-press" @click="click" v-if="isPressTableRow" data-bs-toggle="modal" data-bs-target="#ADD_MEDICAL_EXAM">
            <span v-if="row[name]!== Status.WAITING && row[name]!== Status.CHECKING && row[name]!==Status.COMPLETE  && row[name]!==Status.CANCEL">{{ row[name] }}</span>
           </td>
           <td v-for="(name,index) in nameProperties" :key="index" v-if="!isPressTableRow && role==Role.DOCTOR">
            <span v-if="row[name]!== Status.WAITING && row[name]!== Status.CHECKING && row[name]!==Status.COMPLETE && row[name]!==Status.CANCEL">{{ row[name] }}</span>
            <span v-if="row[name] === Status.WAITING" data-bs-toggle="modal" data-bs-target="#CONFIRM_EXAMINATION" ><img id="status" :src="waiting_icon" alt="" srcset=""></span>
            <span v-if="row[name] === Status.CHECKING" data-bs-toggle="modal" data-bs-target="#CONFIRM_EXAMINATION"><img id="status" :src="check_icon" alt="" srcset=""></span>
            <span v-if="row[name] === Status.COMPLETE" data-bs-toggle="modal" data-bs-target="#CONFIRM_EXAMINATION"><img id="status" :src="complete_icon" alt="" srcset=""></span>
            <span v-if="row[name] === Status.CANCEL" data-bs-toggle="modal" data-bs-target="#CONFIRM_EXAMINATION"><img id="status" :src="cancel_icon" alt="" srcset=""></span>
           </td>
           <td v-for="(name,index) in nameProperties" :key="index" v-if="!isPressTableRow && role!=Role.DOCTOR">
            <span v-if="row[name]!== Status.WAITING && row[name]!== Status.CHECKING && row[name]!==Status.COMPLETE && row[name]!==Status.CANCEL">{{ row[name] }}</span>
            <span v-if="row[name] === Status.WAITING"  ><img id="status" :src="waiting_icon" alt="" srcset=""></span>
            <span v-if="row[name] === Status.CHECKING" ><img id="status" :src="check_icon" alt="" srcset=""></span>
            <span v-if="row[name] === Status.COMPLETE"><img id="status" :src="complete_icon" alt="" srcset=""></span>
            <span v-if="row[name] === Status.CANCEL" ><img id="status" :src="cancel_icon" alt="" srcset=""></span>
           </td>
            <td class="th-end">
              <button
                type="button"
                class="btn me-1"
                style="width: 30px"
                data-bs-toggle="modal"
                :data-bs-target="editModal"
                @click="chooseForm(titleEditModal,titleFormEditModal)"
              >
                <font-awesome-icon
                  :icon="['fas', 'pen-to-square']"
                  class="text-primary fs-5"
                />
              </button>
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                :data-bs-target="deleteModal"
                @click="chooseForm('')"
              >
                <font-awesome-icon
                  :icon="['fas', 'trash-can']"
                  class="text-danger fs-5"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>