<script lang="ts" setup>
import consola from 'consola'

const activeIndex = ref('1')
function handleSelect(key: string, keyPath: string[]) {
  consola.log(key, keyPath)
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="navbar"
    mode="horizontal"
    :ellipsis="false"
    router
    @select="handleSelect"
  >
    <el-menu-item index="/" style="width:60px">
      <el-icon>
        <div i-ri-cloud-line />
      </el-icon>
    </el-menu-item>
    <div class="flex-grow" />
    <a class="inline-flex items-center justify-center" h-full w-15 href="https://github.com/YunLeFun/tools" target="_blank">
      <div i-ri-github-line />
    </a>
    <!-- <el-sub-menu index="2">
      <template #title>
        Workspace
      </template>
      <el-menu-item index="2-1">
        item one
      </el-menu-item>
      <el-menu-item index="2-2">
        item two
      </el-menu-item>
      <el-menu-item index="2-3">
        item three
      </el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>
          item four
        </template>
        <el-menu-item index="2-4-1">
          item one
        </el-menu-item>
        <el-menu-item index="2-4-2">
          item two
        </el-menu-item>
        <el-menu-item index="2-4-3">
          item three
        </el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->
  </el-menu>
</template>

<style lang="scss">
// https://github.com/element-plus/element-plus/pull/14307
.el-menu-horizontal {

}

.navbar {
  z-index: 1;
  background-image: radial-gradient(transparent 1px,var(--el-bg-color) 1px);
  backdrop-filter: saturate(50%) blur(4px);

  height: 60px;
}
</style>
