<script lang="ts" setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'
import type { BaseParamItem, UrlItem } from '~/types'

const props = defineProps<{
  urlItem: UrlItem
}>()

const curParams = computed(() => props.urlItem.params)

const url = computed(() => {
  const params = new URLSearchParams()

  curParams.value.forEach((item) => {
    if (typeof item.visible === 'undefined' || item.visible)
      params.append(item.key, item.value)

    //   params.append(item.key, item.value)
    // console.log(item)

    // else if (typeof item.visible === 'undefined' || item.visible)
    //   params.append(item.key, item.value)
  })

  return `${props.urlItem.url}?${params.toString()}`
})

function toggleParamItemVisible(paramItem: BaseParamItem) {
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
  <div>
    <h2 font="bold">
      {{ props.urlItem?.name }}
    </h2>

    <figure mb-6 mt-2 text-center flex="~ col">
      <div m-auto mb-4 h-50 w-50 flex items-center justify-center shadow>
        <img v-if="qrcode" :src="qrcode" alt="QR Code">
      </div>
      <div op="70" m-auto w-full flex justify-center text-xs>
        <span>{{ url }}</span>
        <div i-ri-file-copy-line active:i-ri-file-copy-fill ml-2 cursor-pointer @click="copyUrl()" />
      </div>
    </figure>
    <!-- <img class="w-50" m-auto my-4 :src="qrcode" alt="QR Code"> -->

    <div flex px-2 gap="2">
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
            type="datetime"
          />
          <el-input
            v-else-if="paramItem.type === 'string'"
            v-model="paramItem.value"
            placeholder="请输入网址"
          />
          <div v-if="paramItem.choices" m-2 flex items-center justify-center>
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

      <MonacoEditor
        v-model="urlItem.script"
        class="h-800px w-1/2 border text-left"
        lang="typescript"
        :options="{ tabSize: 2 }"
      />
    </div>

    <!-- <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      open
    </el-button>

    <el-drawer v-model="drawer" title="I am the title" class="!w-800px">
      <MonacoEditor
        v-model="value"
        :options="{ theme: 'vs-dark' }"
        class="!h-300px"
        lang="typescript"
      />
    </el-drawer> -->
  </div>
</template>
