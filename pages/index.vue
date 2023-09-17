<script setup lang="ts">
// const online = useOnline()
</script>

<template>
  <div>
    <YlfLogo />
    <Suspense>
      <ClientOnly>
        <!-- <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div> -->
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <h2 mt-4>
      TODO
    </h2>
    <InputEntry />
    <!-- <ToolCardList /> -->
  </div>
</template>
