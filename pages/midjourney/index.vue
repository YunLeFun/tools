<script lang="ts" setup>
import consola from 'consola'
import { useStorage } from '@vueuse/core'
import type { Midjourney } from 'midjourney'
import { createClient } from '~/utils/midjourney'

const SERVER_ID = useStorage('midjourney-server-id', '')
const CHANNEL_ID = useStorage('midjourney-channel-id', '')
const SALAI_TOKEN = useStorage('midjourney-salai-token', '')

const client = ref<Midjourney>()

const midjourneyKeywords = useStorage('midjourney-keywords', {
  common: '',
  x: '',
  y: '',
  z: '',
})

async function create() {
  if (!SERVER_ID.value || !CHANNEL_ID.value || !SALAI_TOKEN.value) {
    ElMessage.error('SERVER_ID, CHANNEL_ID, SALAI_TOKEN is required')
    return
  }

  client.value?.Close()
  client.value = await createClient({
    SERVER_ID: SERVER_ID.value,
    CHANNEL_ID: CHANNEL_ID.value,
    SALAI_TOKEN: SALAI_TOKEN.value,
  })
}

onMounted(() => {
  create()
})

/**
 * The keyword that was sent
 */
const sentInfo = ref<{
  prompt: string
  uri: string
}[]>([])

async function imagine(prompt: string) {
  const midjourney = client.value
  const msg = await midjourney.Imagine(prompt, (uri: string) => {
    const item = sentInfo.value.find(info => info.prompt === prompt)
    if (item) {
      item.uri = uri
    }
    else {
      sentInfo.value.push({
        prompt,
        uri,
      })
    }
  })
  consola.info({ msg })
}

const customExtendOptions = useStorage('midjourney-custom-extend-options', {
  interval: 10,
})

async function imagineAll() {
  const keywords = midjourneyKeywords.value
  const xKeywords = keywords.x.split(',').map(k => k.trim())
  const yKeywords = keywords.y.split(',').map(k => k.trim())
  const zKeywords = keywords.z.split(',').map(k => k.trim())

  let index = 0
  xKeywords.forEach((x) => {
    yKeywords.forEach((y) => {
      zKeywords.forEach((z) => {
        const xyzKeys = [x, y, z].filter(k => k).join(',')
        setTimeout(() => {
          ElNotification({
            title: 'Imagine',
            message: `${xyzKeys},${keywords.common}`,
          })
          imagine(`${xyzKeys},${keywords.common}`)
        }, customExtendOptions.value.interval * index * 1000)
        index += 1
      })
    })
  })
}
</script>

<template>
  <div px="5">
    <el-form label-width="auto">
      <el-form-item label="Server ID" prop="pass">
        <el-input v-model="SERVER_ID" type="password" show-password />
      </el-form-item>
      <el-form-item label="Channel ID" prop="pass">
        <el-input v-model="CHANNEL_ID" type="password" show-password />
      </el-form-item>
      <el-form-item label="Salai Token" prop="pass">
        <el-input v-model="SALAI_TOKEN" type="password" show-password />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="create">
          Create Client
        </el-button>
      </el-form-item>
    </el-form>

    <div class="py-4" />

    <div my="2">
      <el-input v-model="midjourneyKeywords.common" placeholder="COMMON" />
    </div>

    <div my="2">
      <el-input v-model="midjourneyKeywords.x" placeholder="X" />
    </div>

    <div my="2">
      <el-input v-model="midjourneyKeywords.y" placeholder="Y" />
    </div>

    <div my="2">
      <el-input v-model="midjourneyKeywords.z" placeholder="Z" />
    </div>

    <div my="2">
      时间间隔（秒）<el-input v-model="customExtendOptions.interval" placeholder="Z" />
    </div>

    <el-button type="primary" @click="imagineAll">
      Imagine All
    </el-button>

    <div>
      <ul>
        <li v-for="info in sentInfo" :key="info.uri" my="2" text="center">
          {{ info.prompt }}
          <img :src="info.uri" w="20" m="auto">
        </li>
      </ul>
    </div>
  </div>
</template>
