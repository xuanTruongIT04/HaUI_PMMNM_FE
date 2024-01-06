<script lang="ts">
import { InputTypeSelector } from '@/helpers/Selector'
import { CustomReflect } from '@/helpers/Decorator'
import { Type } from '@/constants/constants'

export default {
  name: 'CreateForm',
  props: {
    objectProp: Object,
    objectManagerProp: Object,
    titleForm: String,
  },
  emits: ['updateObjectProp'],
  data() {
    return {
      object: this.objectProp,
      objectManager: this.objectManagerProp,
      firstNames: [''],
      secondNames: [''],
      firstTypes: [''],
      secondTypes: [''],
      textareaNames:[''],
      CustomReflect,
    }
  },
  watch: {
    objectProp(newObjectProp) {
      this.object = newObjectProp
    },
  },
  mounted() {
    this.getNameAndType()
  },
  methods: {
    updateObjectProp() {
      this.$emit('updateObjectProp', this.object)
    },
    clearArray() {
      this.firstNames = []
      this.firstTypes = []
      this.secondTypes = []
      this.secondNames = []
      this.textareaNames = []
      this.secondTypes = []
      
    },
    getNameAndType() {
      this.clearArray()
      let map = new Map<string, string>()
      if (this.object !== undefined)
        map = InputTypeSelector.getPropetyAndType(this.object)
      let i = 1
      let length = 0
      for (const [key, value] of map) {
        if(!CustomReflect.isDisabled(this.object,key)){
          length++
        }
      }
      for (const [key, value] of map) {
        if(CustomReflect.isDisabled(this.object,key)){
          continue
        }
        if(CustomReflect.getMetadata(Type.TEXTAREA,this.object,key)){
          this.textareaNames.push(key)
          i++
          continue
        }
        if (i <= Math.ceil(length / 2)) {
          this.firstNames.push(key)
          this.firstTypes.push(value)
          i++
          continue
        }
        this.secondNames.push(key)
        this.secondTypes.push(value)
        i++
      }
    },
    getLabelByProp(target: any, key: string): string {
      return CustomReflect.getLabel(target, key)
    },
  },
}
</script>

<template>
  <div class="row ">
    <h4 class="fw-bold">
      {{ titleForm }}
    </h4>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <form class="add-patient-form">
        <div class="row">
          <div v-if="object !== undefined && objectManager !== undefined" class="col-lg-6">
            <div v-for="(name, index) in firstNames" :key="index" class="row me-1 ms-1">
              <div v-if="getLabelByProp(object, name) !== undefined" class="col-lg-12">
                <div class="row">
                  <label class="title">{{ getLabelByProp(object, name) }}</label>
                </div>
                <div class="row" v-if="CustomReflect.getDataSourceOfCombobox(object,name) === undefined">
                  <input id="" v-model="object[name]" class="form-control" :type="firstTypes[index]" name="" @change="updateObjectProp">
                </div>
                <div class="row" v-else>
                  <select v-model="object[name]" class="form-select">
                    <option v-for="(item,index) in objectManager[CustomReflect.getDataSourceOfCombobox(object,name)]" :value="item"> {{ item }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div v-if="object !== undefined  && objectManager !== undefined" class="col-lg-6">
            <div v-for="(name, index) in secondNames" :key="index" class="row me-1 ms-1">
              <div v-if="getLabelByProp(object, name) !== undefined" class="col-lg-12">
                <div class="row">
                  <label class="title">{{ getLabelByProp(object, name) }}</label>
                </div>
                <div class="row" v-if="CustomReflect.getDataSourceOfCombobox(object,name) === undefined">
                  <input id="" v-model="object[name]" class="form-control" :type="secondTypes[index]" name="" @change="updateObjectProp">
                </div>
                <div class="row" v-else>
                  <select v-model="object[name]" class="form-select">
                    <option v-for="(item,index) in objectManager[CustomReflect.getDataSourceOfCombobox(object,name)]" :value="item">{{ item }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-2" v-if="textareaNames.length > 0">
          <div class="col-lg-12">
            <div class="row ms-1 me-1" v-for="(name,index) in textareaNames" :key="index">
              <label class="title">{{ getLabelByProp(object, name) }}</label>
              <textarea v-if="object!==undefined" v-model="object[name]"  class="form-control" placeholder="Nhập lý do" id="floatingTextarea2" style="height: 100px"></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.title{
  font-weight: bold;
  margin-bottom: 10px;
  margin-top:10px;
}
</style>