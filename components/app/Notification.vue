<script>
import { Notification } from '@/helpers/Notification'

export default {
  name: 'NotificationView',
  props: {
    notificationProp: Notification,
    topProp: String,
    leftProp: String,
    bottomProp: String,
    rightProp: String,
  },
  data() {
    return {
      notification: new Notification(),
    }
  },
  mounted() {
    this.notification = this.notificationProp
  },
}
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%; z-index: 1000;" :hidden="notification.enabled">
    <div class="notification bg-primary-subtle d-flex flex-row" :style="{ top: topProp, left: leftProp, right: rightProp, bottom: bottomProp }">
      <div class="notification-icon text-center d-flex flex-column justify-content-center">
        <font-awesome-icon :icon="['fas', 'bell']" class="fs-4" :style="{ color: notification.color }" />
      </div>
      <div class="notification-content d-flex flex-column justify-content-center">
        <div>
          <h6 class="fw-bold">
            {{ notification.title }}
          </h6>
        </div>
        <div>
          <p>
            {{ notification.content }}
          </p>
        </div>
      </div>
      <div class="notification-btn-exit">
        <font-awesome-icon :icon="['fas', 'circle-xmark']" class="fs-5 mt-2" @click="enableNotification" />
      </div>
  </div>
  </div>
</template>

<style>
h6{
  margin: 0px;
}
.notification-icon{
  width: 20%;
}
.notification-btn-exit{
  width: 10%;
}
.notification-content{
  width: 70%;
}
.notification{
    width: 300px;
    height: 65px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid;
    display: none;
}
</style>
