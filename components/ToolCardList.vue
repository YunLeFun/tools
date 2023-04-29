<script lang="ts" setup>
const tools = ref([
  {
    path: '/midjourney',
    name: 'Midjourney',
  },
])
</script>

<template>
  <div>
    <ToolCard v-for="tool in tools" :key="tool.path" :tool="tool" />
  </div>
</template>
