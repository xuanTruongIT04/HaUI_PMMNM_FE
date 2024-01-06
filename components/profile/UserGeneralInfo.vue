<script setup lang="ts">
const authStore = useAuthStore()
const usersStore = useUsersStore()
const { user } = storeToRefs(authStore)

const editingMode = ref(false)
const enableEditMode = () => (editingMode.value = true)
const disableEditMode = () => (editingMode.value = false)

const nameInputRef = ref()
const isFocusedInput = ref(false)
onUpdated(() => {
  if (editingMode.value && !isFocusedInput.value) {
    nameInputRef.value.focus()
    isFocusedInput.value = true
  }
})

function cancelGeneralInfoUpdate() {
  resetGeneralInfoForm()
  isFocusedInput.value = false
  disableEditMode()
}

const generalInfoForm = reactive<UserGeneralInfoForm>({
  name: user.value?.name,
  email: user.value?.email,
  studentCode: user.value?.studentCode,
  phone: user.value?.phone,
  address: user.value?.address,
  bio: user.value?.bio,
  class: user.value?.class,
  generation: user.value?.generation,
  dateOfBirth: formatDate(user.value?.dateOfBirth),
})

const changedProperties = computed(() => {
  let changedProps = null
  const keys = Object.keys(generalInfoForm)

  for (const key of keys) {
    const formKey = key as keyof typeof generalInfoForm
    const initialValue
      = formKey === 'dateOfBirth'
        ? formatDate(user.value?.[formKey] as string)
        : (user.value?.[formKey] as string)

    if (generalInfoForm[formKey] !== initialValue) {
      changedProps = changedProps || {}
      changedProps[formKey]
        = formKey === 'dateOfBirth'
          ? new Date(generalInfoForm[formKey]).toISOString()
          : generalInfoForm[formKey]
    }
  }

  return changedProps
})

function resetGeneralInfoForm() {
  for (const key in changedProperties.value) {
    if (Reflect.has(generalInfoForm, key)) {
      const formKey = key as keyof typeof generalInfoForm
      const initialValue = user.value?.[formKey] as string

      if (generalInfoForm[formKey] !== initialValue) {
        generalInfoForm[formKey] = initialValue

        if (formKey === 'dateOfBirth')
          generalInfoForm[formKey] = formatDate(initialValue)
      }
    }
  }
}

async function updateUserGeneralInfo() {
  if (!changedProperties.value)
    return

  await usersStore.updateUser(user.value!.id, changedProperties.value)

  useNotification({
    message: 'Update information successfully',
  })

  isFocusedInput.value = false
  disableEditMode()
}
</script>

<template>
  <div class="general-info">
    <h3 class="title">
      General information
    </h3>
    <div class="toolbar">
      <Icon name="uil:edit-alt" class="edit" @click="enableEditMode" />
    </div>
    <form class="form">
      <fieldset class="fieldset" :disabled="!editingMode">
        <div class="form-item">
          <label for="name" class="label">Full Name</label>
          <input
            id="name"
            ref="nameInputRef"
            v-model="generalInfoForm.name"
            type="text"
            name="name"
            class="input"
          >
        </div>
        <div class="form-item">
          <label for="student-code" class="label">Student Code</label>
          <input
            id="student-code"
            v-model="generalInfoForm.studentCode"
            type="text"
            name="student-code"
            class="input"
          >
        </div>
        <div class="form-item">
          <label for="generation" class="label">Generation</label>
          <input
            id="generation"
            v-model="generalInfoForm.generation"
            type="text"
            name="generation"
            class="input"
          >
        </div>
        <div class="form-item">
          <label for="class" class="label">Class</label>
          <input
            id="class"
            v-model="generalInfoForm.class"
            name="class"
            class="input"
          >
        </div>
        <div class="form-item">
          <label for="email" class="label">Email</label>
          <input
            id="email"
            v-model="generalInfoForm.email"
            type="email"
            name="email"
            class="input"
          >
        </div>
        <div class="form-item">
          <label for="phone-number" class="label">Phone Number</label>
          <input
            id="phone-number"
            v-model="generalInfoForm.phone"
            type="text"
            name="phone-number"
            class="input"
          >
        </div>
        <div class="form-item">
          <label for="birthday" class="label">Birthday</label>
          <input
            id="birthday"
            v-model="generalInfoForm.dateOfBirth"
            type="date"
            name="birthday"
            class="input"
          >
        </div>
        <div class="form-item">
          <label for="address" class="label">Address</label>
          <input
            id="address"
            v-model="generalInfoForm.address"
            type="text"
            name="address"
            class="input"
          >
        </div>
        <div class="form-item -bio">
          <label for="bio" class="label">Bio</label>
          <textarea
            id="bio"
            v-model="generalInfoForm.bio"
            class="textarea"
            :rows="editingMode ? 2 : 5"
          />
        </div>
        <div v-if="editingMode" class="form-item -action">
          <button
            type="button"
            class="cancel-button"
            @click="cancelGeneralInfoUpdate"
          >
            Cancel
          </button>
          <button
            class="save-button"
            :class="{ '-disabled': !changedProperties }"
            type="button"
            :disabled="!changedProperties"
            @click="updateUserGeneralInfo"
          >
            Save changes
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped lang="scss">
.general-info {
  > .title {
    @apply mb-4 text-xl font-semibold;
  }

  > .toolbar {
    @apply absolute top-2 right-2 p-4;

    > .edit {
      @apply cursor-pointer text-primary-500 w-5 h-5;
    }
  }

  > .form {
    > .fieldset {
      @apply grid grid-cols-6 gap-6;
    }

    > .fieldset > .form-item {
      @apply col-span-6 sm:col-span-3;
    }

    > .fieldset > .form-item.-action {
      @apply sm:col-span-full text-right;
    }

    > .fieldset > .form-item.-bio {
      @apply sm:col-span-6;
    }

    > .fieldset > .form-item > .label {
      @apply block mb-2 text-sm font-medium text-gray-900;
    }
    > .fieldset > .form-item > .input {
      @apply shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 focus:outline-primary-500 block w-full p-2.5;
    }

    > .fieldset > .form-item > .textarea {
      @apply block px-2.5 py-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-primary-500;
    }

    > .fieldset > .form-item > .save-button {
      @apply bg-primary-500 hover:bg-primary-600 text-white focus:ring-4 focus:ring-blue-300 px-3 py-2 text-xs font-medium rounded-lg text-center;
    }

    > .fieldset > .form-item > .save-button.-disabled {
      @apply cursor-not-allowed bg-primary-300
    }

    > .fieldset > .form-item > .cancel-button {
      @apply text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 px-3 py-2 text-xs font-medium rounded-lg mr-2 mb-2;
    }
  }
}
</style>
