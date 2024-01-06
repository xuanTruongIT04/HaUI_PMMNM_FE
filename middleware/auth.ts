export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)

  if (!isAuthenticated.value)
    return navigateTo('/login')
})
