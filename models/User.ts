import { CustomReflect } from '@/helpers/Decorator'

export class User {
  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label('STT')
  public id?: number;

  @CustomReflect.label('Họ và tên')
  public fullname?: String;
  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label('Số điện thoại')
  public phone?: String;

  @CustomReflect.label('Email')
  public email?: String;

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.label('Tên tài khoản')
  public username?: String;

  @CustomReflect.disabledDatagrid(true)
  
  @CustomReflect.label('Ngày sinh')
  public birthday?: string;

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.label('Địa chỉ')
  public address?: string;
  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.label('Chức vụ')
  public role?: string;

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.disabledInputForm(true)
  public created_at?: string;

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.disabledInputForm(true)
  public update_at?: string;

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.disabledInputForm(true)
  public status_id?: string;

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.disabledInputForm(true)
  public permission?: string[];

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.disabledInputForm(true)
  public confirmPassword?: String;

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.label('Mật khẩu')
  public password?: String;
  constructor(
    id?: number,
    fullname?: string,
    email?: string,
    phone?: string,
    username?: string,
    birthday?: string,
    address?: string,
    role?: string,
    create_at?: string,
    update_at?: string,
    status_id?: string,
    password?: string,
    confirmPassword?: string
  ) {
    this.id = id != undefined ? id: 0
    this.username = username != undefined ? username: '';
    this.password = password != undefined ? password: '';
    this.fullname = fullname != undefined ? fullname: '';
    this.phone = phone != undefined ? phone: '';
    this.email = email != undefined ? email: '';
    this.birthday = birthday != undefined ? birthday: '';
    this.address = address != undefined ? address: '';
    this.confirmPassword = confirmPassword != undefined ? confirmPassword: '';
    this.role = role != undefined ? role: '';
    this.created_at = create_at != undefined ? create_at: '';
    this.update_at = update_at != undefined ? update_at: '';
    this.status_id = status_id != undefined ? status_id: '';
  }
  public toString(): string {
    return `${this.id}-${this.fullname}-${this.email}-${this.phone}-${this.username}-${this.birthday}-${this.address}-${this.role}`;
  }
}
