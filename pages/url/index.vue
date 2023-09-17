<script lang="ts" setup>
import { ElDialog } from 'element-plus'

const url = useUrlStore()

const router = useRouter()

function handleEnter(scope: {
  $index: number
  row: any
}) {
  router.push({
    path: '/url/list',
    query: {
      url: scope.row.url,
    },
  })
}

const source = ref('')
const { copy } = useClipboard({ source })

function handleCopy(scope: {
  $index: number
  row: any
}) {
  source.value = scope.row.script
  copy()
  ElMessage.success('复制成功')
}
function handleDelete(scope: {
  $index: number
  row: any
}) {
  url.removeItem(scope.$index)
}
</script>

<template>
  <div text-right>
    <el-button type="primary" @click="url.addItem">
      <div i-ri-add-line mr-2 />
      新增
    </el-button>
  </div>

  <el-table :data="url.tableData">
    <!-- <el-table-column prop="key" label="Key" width="180" /> -->
    <el-table-column prop="name" label="Name" width="180">
      <template #default="scope">
        <!-- <el-input v-model="scope.row.name" /> -->
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column prop="url" label="URL">
      <template #default="scope">
        <!-- <el-input v-model="scope.row.url" /> -->
        {{ scope.row.url }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template #default="scope">
        <el-button type="success" @click="handleEnter(scope)">
          <div i-ri-edit-line />
        </el-button>
        <el-button type="primary" @click="handleCopy(scope)">
          <div i-ri-file-copy-2-line />
        </el-button>

        <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope)">
          <template #reference>
            <el-button type="danger">
              <div i-ri-delete-bin-line />
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>
