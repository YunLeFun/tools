<script lang="ts" setup>
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript'
import consola from 'consola'

const route = useRoute()

const { tableData } = useUrlStore()

const urlItem = ref(tableData.find(i => i.url === route.query.url))

const compilerOptions = {
  target: ScriptTarget.ESNext,
  module: ModuleKind.ESNext,
}

watch(() => urlItem.value?.script, (script) => {
  if (!script)
    return

  const jsScript = transpileModule(script, { compilerOptions }).outputText
  try {
    const dataUri = `data:text/javascript;charset=utf-8,${encodeURIComponent(jsScript)}`
    import(/* @vite-ignore */dataUri).then((
      jsResult: any,
    ) => {
      const params = jsResult.params
      if (Array.isArray(params)) {
        if (urlItem.value) {
          urlItem.value.params = params

          if (jsResult.name)
            urlItem.value.name = jsResult.name

          if (jsResult.url)
            urlItem.value.url = jsResult.url
        }
      }
    }).catch((e) => {
      // parse error
      if (import.meta.env.DEV)
        consola.log(e)
    })
  }
  catch {
    consola.log('compile error')
  }
})
</script>

<template>
  <div>
    <ParamForm :url-item="urlItem" />
  </div>
</template>
