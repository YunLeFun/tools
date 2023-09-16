<script lang="ts" setup>
import { ref } from 'vue'
import consola from 'consola'

const isCollapse = ref(true)
function handleOpen(key: string, keyPath: string[]) {
  consola.log(key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  consola.log(key, keyPath)
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'i-ri-dashboard-line',
    index: '/',
  },
  // {
  //   title: 'Test',
  //   icon: 'i-ri-global-line',
  //   index: '/test',
  // },
  // {
  //   title: 'Script Node Editor',
  //   icon: 'i-ri-node-tree',
  //   index: '/node-editor',
  // },
  {
    title: 'URL',
    icon: 'i-ri-qr-code-line',
    index: '/url',
  },
  {
    title: 'TS',
    icon: 'i-vscode-icons:file-type-typescript',
    index: '/ts',
  },
  {
    title: 'Settings',
    icon: 'i-ri-settings-line',
    index: '/settings',
  },
]
</script>

<template>
  <el-menu
    default-active="/"
    :collapse="isCollapse"
    router
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">
      <el-icon>
        <div :class="item.icon" />
      </el-icon>
      <template #title>
        {{ item.title }}
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
