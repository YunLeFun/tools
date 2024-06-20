<script lang="ts" setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'
import * as monaco from 'monaco-editor'
import type { ParamItem, UrlItem } from '~/types'

import urlTypeRawContent from '~/types/url?raw'

const props = defineProps<{
  urlItem: UrlItem
}>()

const curParams = computed(() => props.urlItem.params)

const content = urlTypeRawContent.replaceAll('export ', '')
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  content,
  'url.d.ts',
)

const url = computed(() => {
  const params = new URLSearchParams()

  curParams.value.forEach((item) => {
    if (typeof item.visible === 'undefined' || item.visible)
      params.append(item.key, item.value.toString())

    //   params.append(item.key, item.value)
    // console.log(item)

    // else if (typeof item.visible === 'undefined' || item.visible)
    //   params.append(item.key, item.value)
  })

  return `${props.urlItem.url}?${params.toString()}`
})

function toggleParamItemVisible(paramItem: ParamItem) {
  if (typeof paramItem.visible === 'undefined')
    paramItem.visible = false
  else
    paramItem.visible = !paramItem.visible
}

const { copy } = useClipboard({ source: url })

function copyUrl() {
  copy()
  ElMessage.success('复制成功')
}

// `qrcode` will be a ref of data URL
const qrcode = useQRCode(url)
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div flex px-2 gap="2" style="height: calc(100vh - 80px);">
    <div class="relative w-1/2">
      <h2 font="bold">
        {{ props.urlItem?.name }}
      </h2>
      <figure mb-6 mt-2 text-center flex="~ col">
        <div m-auto mb-4 h-50 w-50 flex items-center justify-center shadow>
          <img v-if="qrcode" h-full w-full :src="qrcode" alt="QR Code">
        </div>
        <div op="70" m-auto w-full flex justify-center text-xs>
          <span>{{ url }}</span>
          <div i-ri-file-copy-line active:i-ri-file-copy-fill ml-2 cursor-pointer @click="copyUrl()" />
        </div>
      </figure>

      <div class="action" absolute right-2 top-2>
        <a href="https://github.com/YunLeFun/tools/blob/main/types/url.ts" target="_blank" shadow>
          <div i-vscode-icons:file-type-typescript-official />
        </a>
      </div>

      <el-form class="w-1/2">
        <el-form-item label="URL">
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <el-input v-model="urlItem.url" />
        </el-form-item>
        <el-form-item v-for="paramItem in curParams" :key="paramItem.key">
          <template #label>
            <div flex items-center justify-center>
              <div
                cursor-pointer
                :class="(typeof paramItem.visible === 'undefined' || paramItem.visible) ? 'i-ri-eye-line' : 'i-ri-eye-off-line'"
                @click="toggleParamItemVisible(paramItem)"
              />
              <span mx-2>{{ paramItem.label }}</span>
              <el-tag>{{ paramItem.key }}</el-tag>
            </div>
          </template>
          <el-checkbox v-if="paramItem.type === 'boolean'" v-model="paramItem.value">
            <!-- {{ paramItem.label }} -->
          </el-checkbox>
          <el-date-picker
            v-else-if="paramItem.type === 'datetime'"
            v-model="paramItem.value"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetime"
          />
          <el-input
            v-else-if="paramItem.type === 'string'"
            v-model="paramItem.value"
            placeholder="请输入网址"
          />
          <div
            v-if="paramItem.type !== 'boolean' && paramItem.choices"
            mx-2 flex items-center justify-center
          >
            <el-radio-group v-model="paramItem.value">
              <el-radio
                v-for="choice in paramItem.choices" :key="choice.value"
                :label="choice.value"
              >
                {{ choice.label }}
              </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="h-full w-1/2">
      <MonacoEditor
        v-model="urlItem.script"
        class="h-full w-full border text-left"
        lang="typescript"
        :options="{ tabSize: 2, formatOnType: true, formatOnPaste: true }"
      />
    </div>
  </div>
</template>
