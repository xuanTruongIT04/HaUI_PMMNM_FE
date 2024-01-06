import { User } from '~/models/User';
import { errMessages, slogan } from '~/assets/ts/auth';
import { BaseObjectManager } from './BaseObjectManager';
import { toast, type ToastOptions } from 'vue3-toastify';

export class UserManager extends BaseObjectManager {
    public user: User = new User();
    public showPassword: Boolean = false;
    public showConfirmPassword: Boolean = false;
    public UserManager(user: User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }

    public generatePermission() {
        this.user.permission = ['Bác sĩ', 'Y tá', 'Lễ tân'];
    }

    public validUsername() {
        if (!this.user.username) {
            errMessages.content = '';
            errMessages.textColor = 'red';
            errMessages.errorUsername = 'Tên đăng nhập không được để trống!';
            return;
        }

        const regex = /[a-zA-Z]/;
        if (!regex.test(this.user.username.toString())) {
            errMessages.content = '';
            errMessages.textColor = 'red';
            errMessages.errorUsername =
                'Tên đăng nhập phải bắt đầu bằng ký tự!';
            return false;
        }

        const regex2 = /^[a-zA-Z0-9]{6,}$/;
        if (!regex2.test(this.user.username.toString())) {
            errMessages.content = '';
            errMessages.textColor = 'red';
            errMessages.errorUsername =
                'Tên đăng nhập phải có độ dài nhiều hoặc hoặc bằng 6 ký tự';
            return false;
        }

        errMessages.content = slogan;
        errMessages.textColor = 'white';
        errMessages.errorUsername = '';
        return true;
    }

    public validPassword() {
        if (!this.user.password) {
            errMessages.textColor = 'red';
            errMessages.errorPassword = 'Mật khẩu không được để trống!';
            return false;
        }

        const regex = /^[a-zA-Z0-9]{8,}$/;
        if (!regex.test(this.user.password.toString())) {
            errMessages.textColor = 'red';
            errMessages.errorPassword =
                'Mật khẩu phải có độ dài nhiều hoặc hoặc bằng 8 ký tự';
            return false;
        }

        errMessages.textColor = 'red';
        errMessages.errorPassword = '';
        return true;
    }

    public validConfirmPassword() {
        if (!this.user.confirmPassword) {
            errMessages.textColor = 'red';
            errMessages.errorConfirmPassword =
                'Xác nhận mật khẩu không được để trống!';
            return false;
        }
        const regex = /^[a-zA-Z0-9]{8,}$/;
        if (!regex.test(this.user.confirmPassword.toString())) {
            errMessages.textColor = 'red';
            errMessages.errorConfirmPassword =
                'Xác nhận mật khẩu phải có độ dài nhiều hơn hoặc bằng 8 ký tự';
            return false;
        }

        if (this.user.confirmPassword !== this.user.password) {
            errMessages.textColor = 'red';
            errMessages.errorConfirmPassword =
                'Xác nhận mật khẩu không khớp mật khẩu';
            return false;
        }

        errMessages.textColor = 'white';
        errMessages.errorConfirmPassword = '';
        return true;
    }

    public validEmail() {
        if (!this.user.email) {
            errMessages.textColor = 'red';
            errMessages.errorEmail = 'Email không được để trống!';
            return false;
        }
        const regex = /^[a-zA-Z][a-zA-Z0-9]{5,}@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(this.user.email.toString())) {
            errMessages.textColor = 'red';
            errMessages.errorEmail = 'Email chưa đúng định dạng!';
            return false;
        }
        errMessages.textColor = 'white';
        errMessages.errorEmail = '';
        return true;
    }

    public checkLogin = () => {
        let isLogin = localStorage.getItem('token');
        if (isLogin) return true;
        return false;
    };

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
              this.users.push(new User(e.id,e.fullname,e.email, e.role))
            })
          return
        }
        catch(error){
          return
        }
    }

    public getInformation = async () => {
        try {
            const url = `${this.apiUrl}auth/me`;

            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            return data.results || {};
        } catch (error) {
            console.error('Error:', error);
            return {};
        }
    };

    async updateUser(user: User) {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const url = `${this.apiUrl}auth/update-user/${user.id}`;

            const dataUpdate = {
                id: user.id,
                name: user.fullname,
                birthday: user.birthday,
                phoneNumber: user.phone,
                address: user.address,
                role: user.role,
            };

            const { data, error } = await useFetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dataUpdate),
            });

            const dataUser: any = data.value;

            if (error.value) {
                console.error(`Error: ${error.value}`);
                return false;
            }
            return dataUser;
        } catch (error) {
            console.error(`Error: ${error}`);
            return false;
        }
    }

    async updatePassword(user: any) {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const url = `${this.apiUrl}auth/change-password`;

            const { data, error } = await useFetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(user),
            });

            const dataUser: any = data.value;

            if (error.value) {
                if (error.value.statusCode == 422) {
                    toast.error('Thông tin người dùng chưa đúng', {
                        autoClose: 1000,
                    });
                } else {
                    toast.error(`Cập nhật thất bại: ` + error.value?.message, {
                        autoClose: 1000,
                    });
                }
            }
            return dataUser;
        } catch (error) {
            toast.error(`Cập nhật thất bại: ` + error, {
                autoClose: 1000,
            });
            return false;
        }
    }

    public logout = async () => {
        try {
            const url = `${this.apiUrl}auth/logout`;

            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
            });

            if (!response.ok) {
                console.error('Error:', response.statusText);
                return false;
            }
            return true;
        } catch (error) {
            console.error(`Error: ${error}`);
            return false;
        }
    };
}
