import { MedicalExamination } from '@/models/MedicalExamination'
import { Pagination } from '@/helpers/Pagination'
import { BaseObjectManager } from './BaseObjectManager';
import { Patient } from 'models/Patient';
import { ResponseStatus, Role } from '@/constants/constants';
export class MedicalExaminationManager extends BaseObjectManager{
  public medicalExam: MedicalExamination = new MedicalExamination()
  public pagination: Pagination<MedicalExamination> = new Pagination<MedicalExamination>(0,0,0)
  constructor(){
    super();
  }
  getUserId(fullname: string){
    let id = 0
    this.users.forEach(e=>{
      if(e.fullname === fullname){
        id = e.id!==undefined ? e.id : 0
      }
    })
    return id
  }
  getCategoryId(name: string){
    let id = ''
    this.categories.forEach(e=>{
      if(e.name === name){
        id = e.id!==undefined ? e.id : ''
      }
    })
    return id
  }
  async createMedicalExam(medicalExam: MedicalExamination,patient: Patient) {
    const user_id = this.getUserId(medicalExam.doctorName)
    const cate_id = this.getCategoryId(medicalExam.nameMEService)
    if(user_id===0){
      return false
    }
    if(cate_id===''){
      return false
    }
    try {
      const url = `${this.apiUrl}medical-registration-form/create?patientId=${patient.id}&userId=${user_id}&categoryId=${cate_id}&dayOfExamination=${medicalExam.medicalExaminationDay}&reason=${medicalExam.reason}`
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${this.token}`);
      const response = await fetch(url, {
        method: 'POST',
        headers: headers
      })
      if (!response.ok) {
        return false
      }
      const data = await response.json()
      if(data?.status != ResponseStatus.HTTP_OK){
        return false
      }
      return true
    }
    catch (error) {
      return false
    }
  }

  async deleteMedicalExam(medicalExam: MedicalExamination) {
    try{
      const header = new Headers()
      header.append("Authorization",`Bearer ${this.token}`)
      const url = `${this.apiUrl}medical-registration-form/update-status?id=${medicalExam.id}&statusCode=${medicalExam.status}`
      const res = await fetch(url,{
        method: "PUT",
        headers: header,
      })
      if(!res.ok){
        return false
      }
      return true
    }catch(error){
      return false
    }
  }
  async updateStatus(medicalExam: MedicalExamination){
    try{
      const header = new Headers()
      header.append("Authorization",`Bearer ${this.token}`)
      const url = `${this.apiUrl}medical-registration-form/update-status?id=${medicalExam.id}&statusCode=${medicalExam.status}`
      const res = await fetch(url,{
        method: "PUT",
        headers: header,
      })
      if(!res.ok){
        return false
      }
      return true
    }catch(error){
      return false
    }
  }
  async updateMedicalExam(medicalExam: MedicalExamination) {
    try {
      const user_id = this.getUserId(medicalExam.doctorName)
      const cate_id = this.getCategoryId(medicalExam.nameMEService)
      if(user_id===0){
        return false
      }
      if(cate_id===''){
        return false
      }
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${this.token}`);
      const url = `${this.apiUrl}medical-registration-form/update?id=${medicalExam.id}&dayOfExamination=${medicalExam.medicalExaminationDay}&categoryId=${cate_id}&userId=${user_id}&reason=${medicalExam.reason}`
      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
      });
      if(!response.ok){
        return false
      }
      const data = await response.json()
      return true;
    }
    catch (error) {
      console.error(`Error: ${error}`)
      return false
    }
  }
  async getAllMedicalExam(page: number, pageSize: number) {
    await this.initData()
    let medicalExams = Array<MedicalExamination>()
    let pagination_temp
    if (page === 0 || pageSize === 0)
      return false

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    let url = ''
    if(this.role==Role.RECEPTIONIST){
      url =`${this.apiUrl}medical-registration-form/alls?page=${page}&pageSize=${pageSize}`
    }
    else{
      url =`${this.apiUrl}medical-registration-form/list/doctor?userId=${this.currentUser.id}&page=${page}&pageSize=${pageSize}`
    }

    try {
      const res = await fetch(url, {
        headers: headers
      })
      if (!res.ok){
        return false
      }
      const data = await res.json()
      data.results.results.forEach((e: any) => {
        medicalExams.push(new MedicalExamination(`${e.id}`, e.code, e.patient.name, e.patient.phoneNumber, e.doctor.name, this.formatDate(e.dayOfExamination), e.category.name,e.status.code,e.reason))
      })
      this.medicalExam = medicalExams[0]
      pagination_temp = data.results.pagination
      this.pagination = new Pagination<MedicalExamination>(pageSize, pagination_temp.page, pagination_temp.count, pagination_temp.numPages, medicalExams)
      return true
    }
    catch (error) {
      return false
    }
  }
}
