import { BaseObjectManager } from './BaseObjectManager'
import { Patient } from '@/models/Patient'
import { Pagination } from '@/helpers/Pagination'
import { Role } from '@/constants/constants'

export class PatientManager extends BaseObjectManager {
  public patient: Patient = new Patient()
  public pagination: Pagination<Patient> = new Pagination<Patient>()
  public patients: Array<Patient> = new Array<Patient>()
  constructor() {
    super();
    this.token = localStorage.getItem("token");
  }
  getPropertyTypes() {
    const patient = new Patient()
    const properties = Object.getOwnPropertyNames(patient)
    const types = new Map<string, string>()
    properties.forEach((element) => {
      types.set(element, 'string')
    })
    return types
  }

  async addPatient(patient: Patient) {
    try {
      const url = `${this.apiUrl}patient/create?name=${patient.fullname}&gender=${patient.gender}&birthday=${patient.birthday}&phoneNumber=${patient.phone}&address=${patient.address}&insuranceNumber=${patient.healthInsuranceNumber}`

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${this.token}`);

      const response = await fetch(url, {
        method: 'POST',
        headers: headers
      })

      if (!response.ok) {
        console.error('Error:', response.statusText)
        return false
      }
      return true
    }
    catch (error) {
      console.error(`Error: ${error}`)
      return false
    }
  }

  async updatePatient(patient: Patient) {
    try {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${this.token}`);

      const url = `${this.apiUrl}patient/update`

      const dataUpdate = {
        id: patient.id,
        patient_group: "new_patient",
        name: patient.fullname,
        gender: patient.gender,
        birthday: patient.birthday,
        phoneNumber: patient.phone,
        address: patient.address,
        insuranceNumber: patient.healthInsuranceNumber,
      };
  
      const { data, error } = await useFetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(dataUpdate),
      });

      if (error.value) {
        console.error(`Error: ${error.value}`);
        return false;
      }
      return true;
    }
    catch (error) {
      console.error(`Error: ${error}`)
      return false
    }
  }

  async deletePatient(patientID: string) {
    try {
      if (patientID === null || patientID === undefined)
        return false
      const url = `${this.apiUrl}patient/delete?patientId=${patientID}` // Replace with your API endpoint
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${this.token}`);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: headers
      })
      if (!response.ok) {
        console.error('Error:', response.statusText)
        return false
      }
      return true
    }
    catch (error) {
      console.error(`Error: ${error}`)
      return false
    }
  }

  public async getAllPatients(page: number, pageSize: number) {
    let patients = [new Patient()]
    patients = []
    let pagination
    if (page === 0 || pageSize === 0)
      return this.pagination

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    let url = `${this.apiUrl}patient/alls?page=${page}&pageSize=${pageSize}`
    if(this.role==Role.DOCTOR){
      url = `${this.apiUrl}patient/alls?page=${page}&pageSize=${pageSize}`
    }
    const res = await fetch(url, {
      headers: headers
    })
    try {
      if (!res.ok)
        return this.pagination

      const data = await res.json()
      data.results.results.forEach((e: any) => {
        patients.push(new Patient(`${e.id}`, e.insuranceNumber, e.name, e.phoneNumber, this.formatDate(e.birthday), e.gender, e.address))
      })
      this.patient = patients[0]
      pagination = data.results.pagination
      this.pagination = new Pagination<Patient>(pageSize, pagination.page, pagination.count, pagination.numPages, patients)
      return this.pagination
    }
    catch (error) {
      return this.pagination
    }
  }
  public async getLatestPatient() {
    let patient = new Patient()
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    const res = await fetch(`${this.apiUrl}patient/get-latest`, {
      headers: headers
    })
    try {
      if (!res.ok)
        return patient
      const data = await res.json()
      patient = new Patient(`${data.results.id}`, data.results.insuranceNumber, data.results.name, data.results.phoneNumber, data.results.birthday, data.results.gender, data.results.address)
      return patient
    }
    catch (error) {
      return patient
    }
  }

  public async searchPatients(keySearch: string, page: number, pageSize: number) {
    try {
      let patients = [new Patient()]
      patients = []
      let pagination
      if (page === 0 || pageSize === 0)
        return this.pagination

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${this.token}`);
      
      const res = await fetch(`${this.apiUrl}patient/search?keyword=${keySearch}&page=${page}&pageSize=${pageSize}`, {
        headers: headers
      })
      
      if (!res.ok)
        return this.pagination
      
      const data = await res.json()
      data.results.results.forEach((e: any) => {
        patients.push(new Patient(`${e.id}`, e.insuranceNumber, e.name, e.phoneNumber, e.birthday, e.gender, e.address))
      })

      if(patients.length > 0) {
        this.patient = patients[0]
      } 
      pagination = data.results.pagination

      this.pagination = new Pagination<Patient>(pageSize, pagination.page, pagination.count, pagination.numPages, patients)
      return this.pagination
    }
    catch (error) {
      return this.pagination
    }
  }


}
