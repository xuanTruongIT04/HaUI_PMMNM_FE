<script>
import { auth } from '~/assets/ts/auth'

export default {
  data() {
    return {
      auth,
    }
  },
}
</script>

<template>
  <div class="auth-layout pt-2">
    <div class="container-lg">
      <div class="row">
        <div
          class="col-lg-6 background_login text-center mb-right-minus-70 d-flex justify-content-center align-items-center"
        >
          <img
            src="~/assets/images/background-login.png"
            class="img-fluid"
            style="height=100%;"
          >
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-12 d-flex flex-row mb-3 justify-content-end">
              <img src="~/assets/images/logo.svg" class="logo" style="width: 60px;">
              <img src="~/assets/images/medicare_logo.svg" class="logo ms-3" style="width: 150px;">
            </div>
          </div>
          <div class="row py-4">
            <div class="col-lg-12">
              <h1 class="text-center fw-bold text-dark">
                {{ auth.title }}
              </h1>
            </div>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("~/assets/scss/auth.scss");
</style>
