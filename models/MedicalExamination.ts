import { CustomReflect } from '@/helpers/Decorator'
import { Type } from '@/constants/constants'

export class MedicalExamination {

  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label('STT')
  public id!: string

  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label('Mã ca khám')
  public idMedicalExam!: string

  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label('Họ và tên')
  public patientName!: string


  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label('Số điện thoại')
  public patientPhone!: string

  @CustomReflect.useCombobox("doctors")  
  @CustomReflect.label('Bác sĩ phụ trách')
  public doctorName!: string

  @CustomReflect.label('Ngày khám')
  public medicalExaminationDay!: string


  @CustomReflect.useCombobox("nameMEServices")
  @CustomReflect.label('Tên dịch vụ')
  public nameMEService!: string

  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label('Trạng thái')
  public status!: string

  @CustomReflect.disabledDatagrid(true)
  @CustomReflect.disabledInputForm(true)
  @CustomReflect.label("Trạng thái thanh toán")
  public paymentStatus!: string

  @CustomReflect.enableDeleteForm(true)
  @CustomReflect.defineMetadata(Type.TEXTAREA,true)
  @CustomReflect.label("Lý do khám")
  public reason!: string



  constructor(id?: string, idMedicalExam?: string, patientName?: string, patientPhone?: string, doctorName?: string, medicalExaminationDay?: string, nameMEService?: string, status?: string,reason?: string,paymentStatus?: string) {
    this.id = id !== undefined ? id : ''
    this.idMedicalExam = idMedicalExam !== undefined ? idMedicalExam : ''
    this.patientName = patientName !== undefined ? patientName : ''
    this.patientPhone = patientPhone !== undefined ? patientPhone : ''
    this.doctorName = doctorName !== undefined ? doctorName : ''
    this.medicalExaminationDay = medicalExaminationDay !== undefined ? medicalExaminationDay : ''
    this.nameMEService = nameMEService !== undefined ? nameMEService : ''
    this.status = status !== undefined ? status : ''
    this.paymentStatus = paymentStatus !== undefined ? paymentStatus : ''
    this.reason = reason !== undefined ? reason : ''
  }
}
