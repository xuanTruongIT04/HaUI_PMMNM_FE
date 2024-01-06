<script setup lang="ts">
import { BaseEnable } from '~/assets/ts/template'

const { getUser, logout } = useAuthStore()
await getUser()
</script>

<script lang="ts">
export default {
  mounted() {
    this.$nextTick(() => {
      this.onResize()
    })
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
    },
  },
}
</script>

<template>
  <div class="dashboard-layout">
    <LayoutDashboardNavbar @logout="logout" />
    <LayoutDashboardSidebar />
    <main id="main" class="main" :style="{ marginLeft: BaseEnable.main_margin_left }">
      <section class="section">
        <slot />
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import url('~/assets/scss/main.scss');
</style>
