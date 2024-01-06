import type { CreateNotificationData, Notification } from '~/types'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])

  const addNotification = (notification: CreateNotificationData) => {
    notifications.value.push({
      id: useUniqueId(),
      message: notification.message,
      type: notification.type || 'success',
    })
  }

  const removeNotification = (notificationId: string) => {
    notifications.value = notifications.value.filter(
      ({ id }) => id !== notificationId,
    )
  }

  return { addNotification, removeNotification, notifications }
})
