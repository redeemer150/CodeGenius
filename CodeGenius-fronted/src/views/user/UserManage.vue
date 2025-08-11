<template>
  <div class="user-manage-container">
    <!-- 页面标题和操作区域 -->
    <div class="page-header">
      <h1 class="page-title">{{ $t('userManage.title') }}</h1>
      <div class="header-actions">
        <a-button type="primary" @click="showAddModal">
          <plus-outlined />
          {{ $t('userManage.addUser') }}
        </a-button>
        <a-button @click="refreshData">
          <reload-outlined />
          {{ $t('common.refresh') }}
        </a-button>
      </div>
    </div>

        <!-- 搜索表单 -->
    <div class="search-form">
      <a-form layout="inline" :model="searchForm" @finish="handleSearch">
        <a-form-item :label="$t('user.username')" name="userName">
          <a-input 
            v-model:value="searchForm.userName" 
            :placeholder="$t('userManage.searchByName')" 
            allow-clear
            style="width: 180px"
          />
        </a-form-item>
        <a-form-item :label="$t('user.account')" name="userAccount">
          <a-input 
            v-model:value="searchForm.userAccount" 
            :placeholder="$t('userManage.searchByAccount')" 
            allow-clear
            style="width: 180px"
          />
        </a-form-item>
        <a-form-item :label="$t('user.role')" name="userRole">
          <a-select 
            v-model:value="searchForm.userRole" 
            :placeholder="$t('userManage.selectRole')"
            allow-clear
            style="width: 120px"
          >
            <a-select-option value="user">{{ $t('role.user') }}</a-select-option>
            <a-select-option value="admin">{{ $t('role.admin') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading">
            <search-outlined />
            {{ $t('common.search') }}
          </a-button>
          <a-button @click="resetSearch" style="margin-left: 8px">{{ $t('common.reset') }}</a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- 用户表格 -->
    <div class="table-container">
      <a-table
        :columns="columns"
        :data-source="userList"
        :loading="loading"
        :pagination="paginationConfig"
        @change="handleTableChange"
        :scroll="{ x: 1200 }"
        row-key="id"
      >
        <!-- 头像列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'userAvatar'">
            <a-avatar :src="record.userAvatar" :size="40">
              <template #icon>
                <user-outlined />
              </template>
              {{ record.userName?.charAt(0).toUpperCase() }}
            </a-avatar>
          </template>

          <!-- 角色列 -->
          <template v-else-if="column.key === 'userRole'">
            <a-tag :color="record.userRole === 'admin' ? 'red' : 'blue'">
              {{ getRoleText(record.userRole) }}
            </a-tag>
          </template>

          <!-- 创建时间列 -->
          <template v-else-if="column.key === 'createTime'">
            {{ formatDateTime(record.createTime) }}
          </template>

                    <!-- 操作列 -->
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">
                <edit-outlined />
                {{ $t('common.edit') }}
              </a-button>
              <a-button 
                type="link" 
                size="small" 
                danger 
                @click="handleDelete(record)"
                :disabled="record.userRole === 'admin' && record.id === currentUser?.id"
              >
                <delete-outlined />
                {{ $t('common.delete') }}
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 用户编辑/添加弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalType === 'add' ? $t('userManage.addUser') : $t('userManage.editUser')"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      :confirm-loading="modalLoading"
      width="600px"
    >
      <a-form
        ref="userFormRef"
        :model="userForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
                <a-form-item
          :label="$t('user.username')"
          name="userName"
          :rules="[{ required: true, message: $t('validation.usernameRequired') }]"
        >
          <a-input v-model:value="userForm.userName" :placeholder="$t('validation.usernameRequired')" />
        </a-form-item>
        
        <a-form-item
          :label="$t('user.account')"
          name="userAccount"
          :rules="[
            { required: true, message: $t('validation.accountRequired') },
            { min: 4, message: $t('validation.accountMinLength') },
          ]"
        >
          <a-input 
            v-model:value="userForm.userAccount" 
            :placeholder="$t('validation.accountRequired')"
            :disabled="modalType === 'edit'"
          />
        </a-form-item>
        
        <a-form-item :label="$t('user.avatar')" name="userAvatar">
          <a-input v-model:value="userForm.userAvatar" :placeholder="$t('user.avatar')" />
        </a-form-item>
        
        <a-form-item :label="$t('user.profile')" name="userProfile">
          <a-textarea v-model:value="userForm.userProfile" :placeholder="$t('user.profile')" :rows="3" />
        </a-form-item>
        
        <a-form-item
          :label="$t('user.role')"
          name="userRole"
          :rules="[{ required: true, message: $t('validation.roleRequired') }]"
        >
          <a-select v-model:value="userForm.userRole" :placeholder="$t('validation.roleRequired')">
            <a-select-option value="user">{{ $t('role.user') }}</a-select-option>
            <a-select-option value="admin">{{ $t('role.admin') }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { TableColumnsType, TableProps } from 'ant-design-vue'
import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue'
import { listUserVoByPage, addUser, updateUser, deleteUser } from '../../api/userController'
import { useLoginUserStore } from '../../stores/loginUser'

// 登录用户信息
const loginUserStore = useLoginUserStore()
const currentUser = computed(() => loginUserStore.loginUser)

// 国际化
const { t } = useI18n()

// 响应式数据
const loading = ref(false)
const userList = ref<any[]>([])
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref<'add' | 'edit'>('add')
const userFormRef = ref()

// 搜索表单
const searchForm = reactive<any>({
  pageNum: 1,
  pageSize: 10,
  userName: '',
  userAccount: '',
  userRole: undefined,
})

// 用户表单
const userForm = reactive({
  id: undefined as number | undefined,
  userName: '',
  userAccount: '',
  userAvatar: '',
  userProfile: '',
  userRole: 'user' as string,
})

// 分页配置
const paginationConfig = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => t('pagination.total', { total }),
  pageSizeOptions: ['10', '20', '50', '100'],
})

// 表格列配置
const columns = computed<TableColumnsType>(() => [
  {
    title: t('userManage.id'),
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: true,
  },
  {
    title: t('userManage.userAvatar'),
    dataIndex: 'userAvatar',
    key: 'userAvatar',
    width: 80,
    align: 'center',
  },
  {
    title: t('userManage.userName'),
    dataIndex: 'userName',
    key: 'userName',
    width: 120,
    ellipsis: true,
  },
  {
    title: t('userManage.userAccount'),
    dataIndex: 'userAccount',
    key: 'userAccount',
    width: 150,
    ellipsis: true,
  },
  {
    title: t('userManage.userProfile'),
    dataIndex: 'userProfile',
    key: 'userProfile',
    width: 200,
    ellipsis: true,
  },
  {
    title: t('userManage.userRole'),
    dataIndex: 'userRole',
    key: 'userRole',
    width: 100,
    align: 'center',
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
    sorter: true,
  },
  {
    title: t('common.operation'),
    key: 'action',
    width: 120,
    fixed: 'right',
    align: 'center',
  },
])

// 获取用户列表
const fetchUserList = async () => {
  loading.value = true
  try {
    const response = await listUserVoByPage(searchForm)
    if (response.data.code === 0 && response.data.data) {
      const { records, pageNumber, pageSize, totalRow } = response.data.data
      userList.value = records || []
      paginationConfig.current = pageNumber || 1
      paginationConfig.pageSize = pageSize || 10
      paginationConfig.total = totalRow || 0
    } else {
      message.error(response.data.message || t('userManage.fetchListFailed'))
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    message.error(t('userManage.fetchListFailed'))
  } finally {
    loading.value = false
  }
}

// 表格分页/排序变化处理
const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  if (pagination) {
    searchForm.pageNum = pagination.current || 1
    searchForm.pageSize = pagination.pageSize || 10
    paginationConfig.current = pagination.current || 1
    paginationConfig.pageSize = pagination.pageSize || 10
  }

  // 处理排序
  if (sorter && !Array.isArray(sorter)) {
    searchForm.sortField = sorter.field as string
    searchForm.sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc'
  }

  fetchUserList()
}

// 搜索处理
const handleSearch = () => {
  searchForm.pageNum = 1
  paginationConfig.current = 1
  fetchUserList()
}

// 重置搜索
const resetSearch = () => {
  Object.assign(searchForm, {
    pageNum: 1,
    pageSize: 10,
    userName: '',
    userAccount: '',
    userRole: undefined,
    sortField: undefined,
    sortOrder: undefined,
  })
  paginationConfig.current = 1
  fetchUserList()
}

// 刷新数据
const refreshData = () => {
  fetchUserList()
}

// 显示添加用户弹窗
const showAddModal = () => {
  modalType.value = 'add'
  resetUserForm()
  modalVisible.value = true
}

// 重置用户表单
const resetUserForm = () => {
  Object.assign(userForm, {
    id: undefined,
    userName: '',
    userAccount: '',
    userAvatar: '',
    userProfile: '',
    userRole: 'user',
  })
  userFormRef.value?.clearValidate()
}

// 编辑用户
const handleEdit = (record: any) => {
  modalType.value = 'edit'
  Object.assign(userForm, {
    id: record.id,
    userName: record.userName || '',
    userAccount: record.userAccount || '',
    userAvatar: record.userAvatar || '',
    userProfile: record.userProfile || '',
    userRole: record.userRole || 'user',
  })
  modalVisible.value = true
}

// 删除用户
const handleDelete = (record: any) => {
  Modal.confirm({
    title: t('userManage.confirmDelete'),
    content: t('userManage.deleteConfirmText', { userName: record.userName }),
    okText: t('common.confirm'),
    cancelText: t('common.cancel'),
    okType: 'danger',
    onOk: async () => {
      try {
        const response = await deleteUser({ id: record.id })
        if (response.data.code === 0) {
          message.success(t('userManage.deleteSuccess'))
          await fetchUserList()
        } else {
          message.error(response.data.message || t('userManage.operationFailed'))
        }
      } catch (error) {
        console.error('删除用户失败:', error)
        message.error(t('userManage.operationFailed'))
      }
    },
  })
}

// 弹窗确定
const handleModalOk = async () => {
  try {
    await userFormRef.value?.validate()
    modalLoading.value = true

    let response
    if (modalType.value === 'add') {
      response = await addUser(userForm)
    } else {
      response = await updateUser(userForm)
    }

    if (response.data.code === 0) {
      message.success(modalType.value === 'add' ? t('userManage.addSuccess') : t('userManage.updateSuccess'))
      modalVisible.value = false
      await fetchUserList()
    } else {
      message.error(response.data.message || t('userManage.operationFailed'))
    }
  } catch (error) {
    console.error('用户操作失败:', error)
    message.error(t('userManage.operationFailed'))
  } finally {
    modalLoading.value = false
  }
}

// 弹窗取消
const handleModalCancel = () => {
  modalVisible.value = false
  resetUserForm()
}

// 获取角色文本
const getRoleText = (role?: string) => {
  switch (role) {
    case 'admin':
      return t('role.admin')
    case 'user':
      return t('role.user')
    default:
      return t('role.unknown')
  }
}

// 格式化日期时间
const formatDateTime = (dateTime?: string) => {
  if (!dateTime) return '-'
  return new Date(dateTime).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 页面加载时获取数据
onMounted(() => {
  fetchUserList()
})
</script>

<style scoped>
.user-manage-container {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #262626;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.search-form {
  margin-bottom: 24px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 6px;
}

.table-container {
  margin-top: 16px;
}

/* 表格样式优化 */
:deep(.ant-table-thead > tr > th) {
  background-color: #fafafa;
  font-weight: 600;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f5f7fa;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-manage-container {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .search-form {
    padding: 16px;
  }

  .search-form :deep(.ant-form-item) {
    margin-bottom: 16px;
  }
}
</style>
