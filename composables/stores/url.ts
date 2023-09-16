import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import type { UrlItem } from '~/types'

export const useUrlStore = defineStore('url', () => {
  const tableData = useStorage<UrlItem[]>('ylf:tools:url:table', [
    {
      name: '示例',
      url: 'https://example.com',
      params: [
        {
          label: '时间节点',
          key: 'timeNode',
          type: 'datetime',
          value: '2023-09-15 00:00:00',
          choices: [
            {
              label: '交换礼物日',
              value: '2023-08-01 06:00:00',
            },
            {
              label: '小云生日',
              value: '2022-07-30 00:00:00',
            },
          ],
        },
        {
          label: '你今天开心吗',
          key: 'happy',
          type: 'boolean',
          value: false,
        },
        {
          label: '博客地址',
          key: 'blog',
          type: 'string',
          value: 'https://yunyoujun.cn',
        },
      ],
      script: `
export const name = '示例'
export const url = 'https://example.com'
export const params = [
  {
    label: '时间节点',
    key: 'timeNode',
    type: 'datetime',
    value: '2023-09-15 00:00:00',
    choices: [
      {
        label: '交换礼物日',
        value: '2023-08-01 06:00:00',
      },
      {
        label: '小云生日',
        value: '2022-07-30 00:00:00',
      },
    ],
  },
  {
    label: '你今天开心吗',
    key: 'happy',
    type: 'boolean',
    value: false,
  },
  {
    label: '博客地址',
    key: 'blog',
    type: 'string',
    value: 'https://yunyoujun.cn',
  },
]
`,
    },
  ])

  // const tableData = useStorage<ResourceItem[]>('stardew:res:tableData', [
  //   {
  //     source: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
  //     target: 'https://yunyoujun.cn/images/avatar.jpg',
  //   },
  // ])

  function addItem() {
    let order = 1
    while (tableData.value.findIndex(item => item.name === `Untitled-${order}`) !== -1)
      order++

    tableData.value.push({
      name: `Untitled-${order}`,
      url: `https://example.com/${order}`,
      params: [],
      script: '',
    })
  }

  function removeItem(index: number) {
    tableData.value.splice(index, 1)
  }

  return {
    tableData,
    // previewUrl,
    // tableData,

    addItem,
    removeItem,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUrlStore, import.meta.hot))
