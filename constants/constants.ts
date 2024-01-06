export class TitlePage {
    static readonly LOGIN_PAGE = 'Đăng nhập';
    static readonly REGISTER = 'Đăng ký';
    static readonly FORGOT_PASSWORD = 'Quên mật khẩu';
    static readonly AUTH_ACCOUNT = 'Xác nhận mật khẩu';
    static readonly RESET_PASSWORD = 'Đổi mật khẩu';
    static readonly SETTING_ACCOUNT = 'Cài đặt tài khoản';
    static readonly PATIENT_RECORDS = 'Hồ sơ bệnh nhân';
    static readonly MEDICINES = 'Thuốc';
    static readonly SERVICES = 'Dịch vụ';
    static readonly CONFIRM_EMAIL = 'Kiểm tra email';
    static readonly MEDICAL_EXAMINATION_RECEPTIONIST = 'Lễ tân';
    static readonly MEDICAL_EXAMINATION_DOCTOR = 'Bác sĩ';
    static readonly DETAIL_MEDICAL_EXAMINATION = 'Chi tiết ca khám';
    static readonly USERS = 'Tài khoản';
    static readonly LIST_ACCOUNT = 'Danh sách tài khoản';
}
export class RedirectPage {
    static readonly HOME = '/admin/home';
    static readonly EDIT_USER = '/admin/edit-user';
    static readonly PATIENT_RECORDS = '/admin/patient-records';
    static readonly MEDICINES = '/admin/medicines';
    static readonly MEDICAL_EXAM = '/admin/medical-examination-receptionist';
    static readonly DETAIL_MEDICAL_EXAM = '/admin/detail-medical-examination';
    static readonly LOGIN = '/auth/login';
    static readonly RERGISTER = '/auth/register';
    static readonly FORGOT_PASSWORD = '/auth/forgot-password';
    static readonly AUTH_ACCOUNT = '/auth/authentication-account';
    static readonly RESET_PASSWORD = '/auth/reset-password';
    static readonly CONFIRM_EMAIL = '/auth/confirm-email';
    static readonly URL_GMAIL_PAGE = 'https://mail.google.com/';
}

export class ResponseStatus {
    static readonly HTTP_OK = 200;
    static readonly HTTP_UNAUTHORIZED = 401;
    static readonly HTTP_PAYMENT_REQUIRED = 402;
    static readonly HTTP_FORBIDDEN = 403;
    static readonly HTTP_NOT_FOUND = 404;
    static readonly HTTP_UNPROCESSABLE_ENTITY = 422;
    static readonly HTTP_INTERNAL_SERVER_ERROR = 500;
    static readonly HTTP_BAD_GATEWAY = 502;
}
export class CustomAction {
    static readonly ADD = 'ADD';
    static readonly EDIT = 'EDIT';
    static readonly DELETE = 'DELETE';
}
export class TitleForm {
    static readonly PATIENT = 'Thông tin bệnh nhân';
    static readonly MEDICAL_EXAM = 'Thông tin ca khám';
    static readonly ACCOUNT = 'Thông tin tài khoản';
    static readonly MEDICINE = 'Thông tin thuốc';
    static readonly SERVICE = 'Thông tin dịch vụ';
    static readonly USER = 'Thông tin tài khoản';
}
export class TitleModal {
    static readonly ADD_PATITENT = 'Thêm mới bệnh nhân';
    static readonly EDIT_PATIENT = 'Sửa thông tin bệnh nhân';
    static readonly ADD_MEDICINE = 'Thêm mới thuốc';
    static readonly EDIT_MEDICINE = 'Sửa thông tin thuốc';
    static readonly ADD_SERVICE = 'Thêm mới dịch vụ';
    static readonly EDIT_SERVICE = 'Sửa thông tin dịch vụ';
    static readonly ADD_MEDICAL_EXAM = 'Thêm mới ca khám';
    static readonly EDIT_MEDICAL_EXAM = 'Sửa ca khám';
    static readonly DELETE_PATIENT = 'Bạn có chắc muốn xóa bệnh nhân không?';
    static readonly DELETE_MEDICINE = 'Bạn có chắc muốn xóa thuốc không?';
    static readonly DELETE_SERVICE = 'Bạn có chắc muốn xóa dịch vụ không?';
    static readonly DELETE_MEDICAL_EXAM = 'Bạn có chắc muốn hủy ca khám không?';
    static readonly CONFIRM_MEDICAL_EXAM =
        'Bạn có chắc muốn tiếp nhận ca khám không?';
    static readonly ADD_USER = 'Thêm mới tài khoản';
    static readonly EDIT_USER = 'Sửa thông tin tài khoản';
}
export class TypeModal {
    static readonly ADD_PATIENT = 'ADD_PATIENT';
    static readonly ADD_ACCOUNT = 'ADD_ACCOUNT';
    static readonly ADD_MEDICINE = 'ADD_MEDICINE';
    static readonly ADD_MEDICAL_EXAM = 'ADD_MEDICAL_EXAM';
    static readonly ADD_SERVICE = 'ADD_SERVICE';
    static readonly ADD_USER = 'ADD_USER';
    static readonly EDIT_PATIENT = 'EDIT_PATIENT';
    static readonly EDIT_ACCOUNT = 'EDIT_ACCOUNT';
    static readonly EDIT_MEDICINE = 'EDIT_MEDICINE';
    static readonly EDIT_SERVICE = 'EDIT_SERVICE';
    static readonly EDIT_MEDICAL_EXAM = 'EDIT_MEDICINE';
    static readonly EDIT_USER = 'EDIT_USER';
    static readonly DELETE_PATIENT = 'DELETE_PATIENT';
    static readonly DELETE_ACCOUNT = 'DELETE_ACCOUNT';
    static readonly DELETE_MEDICINE = 'DELETE_MEDICINE';
    static readonly DELETE_SERVICE = 'DELETE_SERVICE';
    static readonly DELETE_MEDICAL_EXAM = 'DELETE_MEDICAL_EXAM';
    static readonly DELETE_USER = 'DELETE_USER';
    static readonly CONFIRM_EXAMINATION = 'CONFIRM_EXAMINATION';
}
export class ButtonContent {
    static readonly ADD = 'Thêm';
    static readonly EXIT = 'Thoát';
    static readonly NEXT = 'Tiếp tục';
    static readonly UPDATE = 'Cập nhật';
    static readonly DELETE = 'Xóa';
    static readonly CLOSE = 'Đóng';
    static readonly ACCEPT = 'Tiếp nhận';
}
export class Location {
    static readonly TOP = '0px';
    static readonly LEFT = '-325px';
    static readonly RIGHT = '-25px';
    static readonly BOTTOM = '-644px';
}
export class ResultType {
    static readonly SUCCESS = 'Thành công';
    static readonly ERROR = 'Thất bại';
}
export class Messages {
    static readonly ADD_PATIENT_SUCCESS = 'Thêm bệnh nhân thành công';
    static readonly ADD_PATIENT_FAIL = 'Thêm bệnh nhân thất bại';
    static readonly ADD_MEDICINE_SUCCESS = 'Thêm thuốc thành công';
    static readonly ADD_MEDICINE_FAIL = 'Thêm thuốc thất bại';
    static readonly ADD_SERVICE_SUCCESS = 'Thêm dịch vụ thành công';
    static readonly ADD_SERVICE_FAIL = 'Thêm dịch vụ thất bại';
    static readonly ADD_MEDICAL_EXAM = 'Thêm ca khám thành công';
    static readonly ADD_MEDICAL_FAIL = 'Thêm ca khám thất bại';
    static readonly EDIT_PATIENT_SUCCESS = 'Sửa bệnh nhân thành công';
    static readonly EDIT_PATIENT_FAIL = 'Sửa bệnh nhân thất bại';
    static readonly EDIT_MEDICINE_SUCCESS = 'Sửa thuốc thành công';
    static readonly EDIT_MEDICINE_FAIL = 'Sửa thuốc thất bại';
    static readonly EDIT_SERVICE_SUCCESS = 'Sửa dịch vụ thành công';
    static readonly EDIT_SERVICE_FAIL = 'Sửa dịch vụ thất bại';
    static readonly EDIT_MEDICAL_EXAM_SUCCESS = 'Sửa ca khám thành công';
    static readonly EDIT_MEDICAL_EXAM_FAIL = 'Sửa ca khám thất bại';
    static readonly DELETE_PATIENT_SUCCESS = 'Xóa bệnh nhân thành công';
    static readonly DELETE_PATIENT_FAIL = 'Xóa bệnh nhân thất bại';
    static readonly DELETE_MEDICINE_SUCCESS = 'Xóa thuốc thành công';
    static readonly DELETE_MEDICINE_FAIL = 'Xóa thuốc thất bại';
    static readonly DELETE_SERVICE_SUCCESS = 'Xóa dịch vụ thành công';
    static readonly DELETE_SERVICE_FAIL = 'Xóa dịch vụ thất bại';
    static readonly LOGOUT_SUCCESS = 'Đăng xuất thành công';
    static readonly LOGOUT_FAIL = 'Đăng xuất thất bại';
    static readonly UPDATE_USER_SUCCESS = 'Cập nhật thông tin thành công';
    static readonly UPDATE_USER_FAIL = 'Cập nhật thông tin thất bại';
    static readonly UPDATE_USER_PASSWORD_SUCCESS =
        'Cập nhật mật khẩu thành công';
    static readonly UPDATE_USER_PASSWORD_FAIL = 'Cập nhật mật khẩu thất bại';
    static readonly UPDATE_STATUS_SUCCESS = 'Cập nhật trạng thái thành công'
    static readonly UPDATE_STATUS_FAIL = 'Cập nhật trạng thái thất bại'
}
export class Color {
    static readonly RED = 'red';
    static readonly GREEN = 'green';
    static readonly YELLOW = 'yellow';
}
export class Type {
    static readonly TEXT = 'text';
    static readonly NUMBER = 'number';
    static readonly DATE = 'date';
    static readonly SELECT = 'select';
    static readonly BUTTON = 'button';
    static readonly FILE = 'file';
    static readonly TEXTAREA = 'textarea';
}
export class Status {
    static readonly CHECKING = 'checking';
    static readonly WAITING = 'waiting';
    static readonly COMPLETE = 'complete';
    static readonly CANCEL = 'cancel';
}

export class Role {
    static readonly RECEPTIONIST = 'le_tan';
    static readonly DOCTOR = 'bac_si';
    static readonly ADMIN_SYS = 'admin_sys';
}
