<script lang="ts" setup>
export interface ToolItem {
  path: string
  name: string
}

defineProps<{
  tool: ToolItem
}>()
</script>

<template>
  <div>
    <RouterLink :to="tool.path" border>
      {{ tool.name }}
    </RouterLink>
  </div>
</template>
