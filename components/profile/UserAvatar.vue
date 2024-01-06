<script setup lang="ts">
import hitAvatar from '~/assets/images/logoHIT.png'

defineProps<{
  avatar: string | null
}>()
</script>

<template>
  <div class="user-avatar">
    <div class="content-wrapper">
      <img class="avatar" :src="avatar || hitAvatar" alt="HITer avatar">
      <div class="card">
        <h3 class="title">
          Profile picture
        </h3>
        <div class="description">
          JPG, GIF or PNG. Max size of 800K
        </div>
        <div class="actions">
          <button type="button" class="upload">
            <Icon name="uil:upload" class="mr-1" />
            Upload picture
          </button>
          <button type="button" class="delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-avatar {
  > .content-wrapper {
    @apply items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4;

    > .avatar {
      @apply mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0;
    }

    > .card > .title {
      @apply mb-1 text-xl font-bold text-gray-900;
    }

    > .card > .description {
      @apply mb-4 text-sm text-gray-500;
    }

    > .card > .actions {
      @apply flex items-center space-x-4;
    }

    > .card > .actions > .upload {
      @apply inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-500 hover:bg-primary-600;
    }

    > .card > .actions > .delete {
      @apply py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-500 focus:z-10;
    }
  }
}
</style>
