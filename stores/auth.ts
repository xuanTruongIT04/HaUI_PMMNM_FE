import type { LoginResponse, User, UserCredentials } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  const user = ref<User>()
  const accessToken = useLocalStorage('accessToken', '')

  const login = async (userCredentials: UserCredentials) => {
    const response = await $api<LoginResponse>('/auth/sign-in', {
      method: 'POST',
      body: userCredentials,
    })

    if (response) {
      accessToken.value = response.accessToken
      useNotification({
        message: 'Welcome to Medicare!',
      })
      return navigateTo('/dashboard')
    }
  }

  const getUser = async () => {
    const authUser = await $api<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    user.value = authUser
  }

  const logout = async () => {
    const authUser = await $api<User>('/auth/logout', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })
  }

  const isAuthenticated = computed(() => !!user.value || accessToken.value)

  return { login, getUser, logout, user, isAuthenticated, accessToken }
})
