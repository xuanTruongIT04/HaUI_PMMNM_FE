export function useNotification(notification: CreateNotificationData) {
  const notificationStore = useNotificationStore()
  const { addNotification } = notificationStore

  return addNotification(notification)
}
