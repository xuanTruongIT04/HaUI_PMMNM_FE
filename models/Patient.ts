import { CustomReflect } from '@/helpers/Decorator'

export class Patient {
  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label('STT')
  public id!: String
  
  @CustomReflect.label('Số thẻ BHYT')
  public healthInsuranceNumber!: String

  @CustomReflect.label('Họ và tên')
  public fullname!: String
  
  @CustomReflect.label('Số điện thoại')
  public phone!: String
  
  @CustomReflect.label('Ngày sinh')
  public birthday!: String
  
  @CustomReflect.label('Giới tính')
  public gender!: String

  @CustomReflect.label('Địa chỉ')
  public address!: String

  constructor(id?: string, health?: string, fullname?: string, phone?: string, birthday?: string, gender?: string, address?: string) {
    this.id = id !== undefined ? id : ''
    this.healthInsuranceNumber = health !== undefined ? health : ''
    this.fullname = fullname !== undefined ? fullname : ''
    this.phone = phone !== undefined ? phone : ''
    this.birthday = birthday !== undefined ? birthday : ''
    this.gender = gender !== undefined ? gender : ''
    this.address = address !== undefined ? address : ''
  }
}
