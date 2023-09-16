<script lang="ts" setup>
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript'

const editorValue = ref('')

const result = computed(() => {
  const compilerOptions = {
    target: ScriptTarget.ESNext,
    module: ModuleKind.ESNext,
  }

  return transpileModule(editorValue.value, { compilerOptions }).outputText
})
</script>

<template>
  <div flex>
    <div class="w-1/2 text-left">
      <h2 mb-2>
        <div i-vscode-icons:file-type-typescript-official />
      </h2>
      <MonacoEditor
        v-model="editorValue"
        class="editor border"
        lang="typescript"
      />
    </div>
    <div class="w-1/2 text-left">
      <h2 mb-2>
        <div i-vscode-icons:file-type-js-official />
      </h2>
      <MonacoEditor
        v-model="result"
        class="editor border"
        lang="javascript"
        :options="{ readOnly: true }"
      />
    </div>
  </div>
</template>

<style scoped>
.editor {
  height: calc(100vh - 120px);
}
</style>
