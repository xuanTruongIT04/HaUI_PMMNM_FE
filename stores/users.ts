import type { User, UserGeneralInfoForm } from '~/types'

export const useUsersStore = defineStore('users', () => {
  const { $api } = useNuxtApp()
  const users = ref<User[]>([])
  const user = ref<User | null>(null)

  const authStore = useAuthStore()
  const { accessToken } = storeToRefs(authStore)

  const fetchUsers = async () => {
    const response = await $api<User[]>('/api/v1/users', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    users.value = response
  }

  const updateUser = async (
    userId: number,
    updateUserDto: UserGeneralInfoForm,
  ) => {
    const response = await $api<User>(`/api/v1/users/${userId}`, {
      method: 'PUT',
      body: updateUserDto,
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    user.value = response
  }

  const filterUsersByGeneration = (generation: number) => {
    return users.value.filter(user => user.generation === generation)
  }

  return { users, fetchUsers, updateUser, filterUsersByGeneration, user }
})
