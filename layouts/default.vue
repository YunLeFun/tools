<template>
  <div class="sticky" sticky left-0 right-0 top-0 w-full>
    <TheTopMenu />
  </div>

  <div class="main-container" flex="~" w-full>
    <TheLeftMenu class="h-full" />

    <main class="h-full w-full text-center" min-h="full" overflow="auto" p="2">
      <slot />
    </main>
  </div>
</template>

<style>
.main-container {
  height: calc(100vh - 60px);
}
</style>
