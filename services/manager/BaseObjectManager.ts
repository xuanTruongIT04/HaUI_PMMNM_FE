import { User } from "@/models/User";
import { Category } from "@/models/Category";
import { Status } from "@/models/Status";
import { Patient } from "@/models/Patient";
import { Role } from "@/constants/constants";

export abstract class BaseObjectManager {
  public users = [new User()]
  public categories = [new Category()] 
  public status = [new Status]
  public nameMEServices = ['']
  public doctors = ['']
  public listPatients = [new Patient()]
  public role?: string
  public currentUser: User = new User()
  protected apiUrl: string = process.env.API_BASE_URL || 'http://127.0.0.1:8000/api/'
  protected token: string | null = null
  constructor(){
    this.token = localStorage.getItem("token");
    this.currentUser = this.getCurrentUser()
    this.role = this.currentUser.role
    this.users = []
    this.categories = []
    this.status = []
    this.listPatients = []
    this.nameMEServices = []
    this.doctors = []
  }
  getCurrentUser(){
    const data = localStorage.getItem("userInformation")
    if(data == undefined){
      return new User()
    }
    const user = data.split('-')
    if(user.length<7){
      return new User()
    }
    
    return new User(Number.parseInt(user[0]),user[1],user[2],user[3],user[4],user[5],user[6],user[7])
  }
  async getAllUser(){
    this.users = []
    const url = `${this.apiUrl}users/list`
    try{
      const res = await fetch(url,{
        method: 'GET'
      })
      if(!res.ok){
        return
      }
      const data = await res.json()
      data.results.forEach((e: any)=>{
        this.users.push(new User(e.id,e.fullname,e.email,'',e.username,'','',e.role))
      })
      return
    }
    catch(error){
      return
    }
  }
  
  async getAllCategory(){
    this.categories = []
    const url = `${this.apiUrl}master/category?type=service`
    try{
      const res = await fetch(url,{
        method: 'GET'
      })
      if(!res.ok){
        return
      }
      const data = await res.json()
      data.results.forEach((e: any)=>{
        this.categories.push(new Category(e.id,e.code,e.name,e.type,e.description))
      })
      return
    }
    catch(error){
      return
    }
  }
  async getAllStatus(){
    this.status = []
    const url = `${this.apiUrl}master/status?type=medical_form`
    try{
      const res = await fetch(url,{
        method:"GET"
      })
      if(!res.ok){
        return
      }
      const data = await res.json()
      data.results.forEach((e: any)=>{
        this.status.push(new Status(e.id,e.name,e.code,e.type,e.description,e.created_at,e.updated_at))
      })
      return
    }
    catch(error){
      return
    }
  }
  public formatDate(date: string){
    const strs = date.split(" ")
    if(strs.length>0){
      const dates = strs[0].split("-")
      dates.reverse()
      return `${dates[0]}-${dates[1]}-${dates[2]}`
    }
    return "2002-02-02"
  }
  public async getAllPatient() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    const res = await fetch(`${this.apiUrl}patient/alls?page=${1}&pageSize=${30}`, {
      headers: headers
    })
    try {
      if (!res.ok)
        return 

      const data = await res.json()
      data.results.results.forEach((e: any) => {
        this.listPatients.push(new Patient(`${e.id}`, e.insuranceNumber, e.name, e.phoneNumber, this.formatDate(e.birthday), e.gender, e.address))
      })
      return
    }
    catch (error) {
      return
    }
  }
  async initData(){
    await this.getAllUser()
    await this.getAllCategory()
    this.nameMEServices = []
    this.doctors = []
    this.categories.forEach((e: Category)=>{
      this.nameMEServices.push(e.name)
    })
    this.users.forEach(e=>{
      if(e.fullname!=undefined && e.role === Role.DOCTOR){
        this.doctors.push(e.fullname.toString())
      }
    })
  }
}
