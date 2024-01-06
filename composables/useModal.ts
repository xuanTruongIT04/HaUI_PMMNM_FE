export function useModal(initialValue = false) {
  const isVisible = ref(initialValue)

  const toggleModal = () => {
    isVisible.value = !isVisible.value
  }

  const closeModal = () => {
    isVisible.value = false
  }

  const openModal = () => {
    isVisible.value = true
  }

  return {
    isVisible,
    toggleModal,
    closeModal,
    openModal,
  }
}
