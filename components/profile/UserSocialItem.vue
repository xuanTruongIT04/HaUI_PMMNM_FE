<script setup lang="ts">
defineProps<{
  name: string
  value: string
}>()
</script>

<template>
  <li>
    <div class="social-item">
      <div class="social-icon">
        <Icon :name="`uil:${name}`" class="icon" />
      </div>
      <div class="social-info">
        <span class="company">
          {{ capitalizeFirstLetter(name) }} account
        </span>
        <a
          v-if="value"
          :href="value"
          target="_blank"
          class="link"
        >
          {{ value }}
        </a>
        <span v-else class="alternative-text">Not connected!</span>
      </div>
      <div class="social-actions">
        <button
          v-if="value"
          type="button"
          class="disconnect"
        >
          <Icon name="uil:trash" />  Disconnect
        </button>
        <button
          v-else
          type="button"
          class="connect"
        >
          <Icon name="uil:plus" /> Connect
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.social-item {
  @apply flex items-center space-x-4 py-1;

  > .social-icon {
    @apply flex-shrink-0;

    > .icon {
      @apply w-5 h-5;
    }
  }

  > .social-info {
    @apply flex-1 min-w-0;

    > .company {
      @apply block text-base font-semibold text-gray-900 truncate
    }

    > .link {
      @apply block text-sm font-normal truncate text-blue-700 hover:underline;
    }

    > .alternative-text {
      @apply block text-sm font-normal truncate text-gray-500;
    }
  }

  > .social-actions {
    @apply flex items-center;

    > .disconnect {
      @apply flex items-center gap-1 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100
    }

    > .connect {
      @apply flex items-center gap-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-500 hover:bg-primary-600;
    }
  }
}
</style>
