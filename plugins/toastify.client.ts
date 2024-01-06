import Vue3Toasity, { type ToastContainerOptions, type ToastOptions, toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import '@/assets/scss/main.scss'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toasity) as ToastContainerOptions
  return {
    provide: {
      toastify: {
        delay: 0,
        position: toast.POSITION.TOP_RIGHT,
        clearOnUrlChange: true,
        bodyClassName: 'body-toastify',
        success: (msg: string) => {
          toast(msg, {
            limit: 5,
            type: 'success',
            autoClose: 2000,
          } as ToastOptions)
        },
        error: (msg: string) => {
          toast(msg, {
            limit: 5,
            type: 'error',
            autoClose: 2000,
          } as ToastOptions)
        },
        info: (msg: string) => {
          toast(msg, {
            limit: 5,
            type: 'info',
            autoClose: 2000,
          } as ToastOptions)
        },
        warning: (msg: string) => {
          toast(msg, {
            limit: 5,
            type: 'warning',
            autoClose: 2000,
          } as ToastOptions)
        },
        successV2: (msg: string) => {
          toast(msg, {
            limit: 2,
            type: 'success',
            autoClose: 3000,
          } as ToastOptions)
        },
      },
    },
  }
})
