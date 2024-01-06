<script lang="ts">
import { InputTypeSelector } from '@/helpers/Selector'
import {CustomReflect} from '@/helpers/Decorator'
export default {
  name: 'ConfirmDialog',
  props:{
    content: String,
    objectProp: Object,
  },
  emits: ['updateObjectProp'],
  data(){
    return{
      object: this.objectProp,
      propertyEnables: [''],
      CustomReflect,
    }
  },
  mounted(){
    this.getTypeAndNameOfProperties()
  },
  watch: {
    objectProp(newObjectProp) {
      this.object = newObjectProp
    },
  },
  methods: {
    updateObjectProp() {
      this.$emit('updateObjectProp', this.object)
    },
    getTypeAndNameOfProperties(){
      this.propertyEnables = []
      let map = new Map<string, string>()
      if (this.object !== undefined)
        map = InputTypeSelector.getPropetyAndType(this.object)
      for(const [key, value] of map){
        if(CustomReflect.isEnabledDeleteForm(this.object,key)){
          this.propertyEnables.push(key)
        }
      }
    },
    getLabelByProp(target: any, key: string): string {
      return CustomReflect.getLabel(target, key)
    },
  },
}
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="row d-flex flex-row justify-content-center">
        <img class="logo-form" src="~/assets/images/icons/delete.svg" alt="">
      </div>
      <div class="row text-center">
        <h5 class="fw-bold">
          {{ content }}
        </h5>
      </div>
      <div class="row mt-2" v-if="propertyEnables.length > 0 && object!==undefined">
          <div class="col-lg-12">
            <div class="row ms-1 me-1" v-for="(name,index) in propertyEnables" :key="index">
              <textarea v-if="object!==undefined" v-model="object[name]"  class="form-control" placeholder="Nhập lý do hủy" id="floatingTextarea2" style="height: 100px"></textarea>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style>
.logo-form{
  width: 150px;
  height: 150px;
}
</style>
