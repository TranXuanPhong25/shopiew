<template>
  <n-dropdown trigger="click">
    <n-button circle quaternary size="medium">
      <n-icon size="28">
        <BellIcon />
      </n-icon>
    </n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import {

  NotificationsOutline as BellIcon,
} from '@vicons/ionicons5'

</script>
