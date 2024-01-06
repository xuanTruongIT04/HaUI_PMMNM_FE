<script setup lang="ts">
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const userSocials = computed(() => {
  return {
    facebook: user.value?.facebook,
    linkedin: user.value?.linkedin,
    github: user.value?.github,
  }
})
</script>

<template>
  <div class="social-list">
    <div class="content">
      <h3 class="title">
        Social accounts
      </h3>
      <ul class="list">
        <ProfileUserSocialItem
          v-for="(value, key) in userSocials"
          :key="key"
          :name="key"
          :value="value"
          class="item"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.social-list {
  > .content {
    > .title {
      @apply text-xl font-semibold;
    }

    > .list {
      @apply divide-y divide-gray-200;
    }

    > .list > .item {
      @apply py-4;
    }
  }
}
</style>
