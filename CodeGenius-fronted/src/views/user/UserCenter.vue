<template>
  <div class="user-center-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">{{ $t('userCenter.title') }}</h1>
      <p class="page-subtitle">{{ $t('userCenter.subtitle') }}</p>
    </div>

    <div class="center-content">
      <!-- 用户头像卡片 -->
      <div class="avatar-card">
        <div class="avatar-section">
          <a-avatar :size="120" :src="userForm.userAvatar" class="user-avatar">
            <template #icon>
              <user-outlined />
            </template>
            {{ userForm.userName?.charAt(0).toUpperCase() }}
          </a-avatar>
          <div class="avatar-info">
            <h2 class="user-name">{{ userForm.userName || $t('user.username') }}</h2>
            <p class="user-role">
              <a-tag :color="userForm.userRole === 'admin' ? 'red' : 'blue'">
                {{ getRoleText(userForm.userRole) }}
              </a-tag>
            </p>
          </div>
        </div>
      </div>

      <!-- 个人信息编辑卡片 -->
      <div class="info-card">
        <div class="card-header">
          <h3>{{ $t('userCenter.personalInfo') }}</h3>
          <div class="header-actions">
            <a-button v-if="!editMode" type="primary" @click="enableEdit">
              <edit-outlined />
              {{ $t('common.edit') }}
            </a-button>
            <a-space v-else>
              <a-button @click="cancelEdit">
                {{ $t('common.cancel') }}
              </a-button>
              <a-button type="primary" :loading="saveLoading" @click="saveUserInfo">
                <save-outlined />
                {{ $t('common.save') }}
              </a-button>
            </a-space>
          </div>
        </div>

        <div class="card-body">
          <a-form
            ref="userFormRef"
            :model="userForm"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            class="user-form"
          >
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item
                  :label="$t('user.username')"
                  name="userName"
                  :rules="[
                    { required: true, message: $t('validation.usernameRequired') },
                    { min: 2, max: 20, message: $t('validation.usernameLength') }
                  ]"
                >
                  <a-input 
                    v-model:value="userForm.userName" 
                    :placeholder="$t('validation.usernameRequired')"
                    :disabled="!editMode"
                  />
                </a-form-item>
              </a-col>
              
              <a-col :span="12">
                <a-form-item :label="$t('user.account')" name="userAccount">
                  <a-input 
                    v-model:value="userForm.userAccount" 
                    :disabled="true"
                    :placeholder="$t('user.account')"
                  />
                  <div class="field-tip">{{ $t('userCenter.accountTip') }}</div>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item :label="$t('user.avatar')" name="userAvatar">
                  <a-input 
                    v-model:value="userForm.userAvatar" 
                    :placeholder="$t('userCenter.avatarPlaceholder')"
                    :disabled="!editMode"
                  />
                </a-form-item>
              </a-col>
              
              <a-col :span="12">
                <a-form-item :label="$t('user.role')" name="userRole">
                  <a-select 
                    v-model:value="userForm.userRole" 
                    :disabled="true"
                    :placeholder="$t('user.role')"
                  >
                    <a-select-option value="user">{{ $t('role.user') }}</a-select-option>
                    <a-select-option value="admin">{{ $t('role.admin') }}</a-select-option>
                  </a-select>
                  <div class="field-tip">{{ $t('userCenter.roleTip') }}</div>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="24">
                <a-form-item 
                  :label="$t('user.profile')" 
                  name="userProfile"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 21 }"
                >
                  <a-textarea 
                    v-model:value="userForm.userProfile" 
                    :placeholder="$t('userCenter.profilePlaceholder')"
                    :disabled="!editMode"
                    :rows="4"
                    :maxlength="200"
                    show-count
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>

      <!-- 账户统计信息 -->
      <div class="stats-card">
        <div class="card-header">
          <h3>{{ $t('userCenter.accountStats') }}</h3>
        </div>
        <div class="card-body">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <calendar-outlined />
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ formatDateTime(currentUser?.createTime) }}</div>
                <div class="stat-label">{{ $t('userCenter.joinTime') }}</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <clock-circle-outlined />
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ formatDateTime(currentUser?.updateTime) }}</div>
                <div class="stat-label">{{ $t('userCenter.lastUpdate') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { 
  UserOutlined, 
  EditOutlined, 
  SaveOutlined,
  CalendarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons-vue'
import { useLoginUserStore } from '../../stores/loginUser'
import { updateUser } from '../../api/userController'

// 国际化
const { t } = useI18n()

// 登录用户状态
const loginUserStore = useLoginUserStore()
const currentUser = computed(() => loginUserStore.loginUser)

// 响应式数据
const editMode = ref(false)
const saveLoading = ref(false)
const userFormRef = ref()

// 用户表单数据
const userForm = reactive({
  id: 0,
  userName: '',
  userAccount: '',
  userAvatar: '',
  userProfile: '',
  userRole: 'user'
})

// 备份原始数据（用于取消编辑时恢复）
const originalUserData = reactive({
  userName: '',
  userAvatar: '',
  userProfile: ''
})

// 初始化用户数据
const initUserData = () => {
  if (currentUser.value) {
    userForm.id = currentUser.value.id || 0
    userForm.userName = currentUser.value.userName || ''
    userForm.userAccount = currentUser.value.userAccount || ''
    userForm.userAvatar = currentUser.value.userAvatar || ''
    userForm.userProfile = currentUser.value.userProfile || ''
    userForm.userRole = currentUser.value.userRole || 'user'
    
    // 备份原始数据
    originalUserData.userName = userForm.userName
    originalUserData.userAvatar = userForm.userAvatar
    originalUserData.userProfile = userForm.userProfile
  }
}

// 启用编辑模式
const enableEdit = () => {
  editMode.value = true
  // 重新备份当前数据
  originalUserData.userName = userForm.userName
  originalUserData.userAvatar = userForm.userAvatar
  originalUserData.userProfile = userForm.userProfile
}

// 取消编辑
const cancelEdit = () => {
  editMode.value = false
  // 恢复原始数据
  userForm.userName = originalUserData.userName
  userForm.userAvatar = originalUserData.userAvatar
  userForm.userProfile = originalUserData.userProfile
  // 清除表单验证
  userFormRef.value?.clearValidate()
}

// 保存用户信息
const saveUserInfo = async () => {
  try {
    // 表单验证
    await userFormRef.value?.validate()
    
    saveLoading.value = true
    
    const updateData = {
      id: userForm.id,
      userName: userForm.userName,
      userAvatar: userForm.userAvatar,
      userProfile: userForm.userProfile
    }
    
    const response = await updateUser(updateData)
    
    if (response.data.code === 0) {
      message.success(t('userCenter.updateSuccess'))
      
      // 更新store中的用户信息
      loginUserStore.setLoginUser({
        ...currentUser.value,
        userName: userForm.userName,
        userAvatar: userForm.userAvatar,
        userProfile: userForm.userProfile,
        updateTime: new Date().toISOString()
      })
      
      editMode.value = false
      
      // 重新备份数据
      originalUserData.userName = userForm.userName
      originalUserData.userAvatar = userForm.userAvatar
      originalUserData.userProfile = userForm.userProfile
      
    } else {
      message.error(response.data.message || t('userCenter.updateFailed'))
    }
  } catch (error) {
    console.error('更新用户信息失败:', error)
    if (error.errorFields && error.errorFields.length > 0) {
      message.error(t('validation.required'))
    } else {
      message.error(t('userCenter.updateFailed'))
    }
  } finally {
    saveLoading.value = false
  }
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
    minute: '2-digit'
  })
}

// 页面加载时初始化数据
onMounted(() => {
  initUserData()
})
</script>

<style scoped>
.user-center-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.page-title {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: #262626;
}

.page-subtitle {
  margin: 0;
  font-size: 16px;
  color: #8c8c8c;
}

.center-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.avatar-card,
.info-card,
.stats-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.avatar-card {
  padding: 32px;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 48px;
  font-weight: bold;
}

.avatar-info {
  flex: 1;
}

.user-name {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: #262626;
}

.user-role {
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #262626;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.card-body {
  padding: 24px;
}

.user-form {
  width: 100%;
}

.field-tip {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  font-size: 20px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #8c8c8c;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-center-container {
    padding: 16px;
  }
  
  .avatar-section {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .user-form .ant-col {
    margin-bottom: 0;
  }
}

/* 表单样式优化 */
:deep(.ant-form-item) {
  margin-bottom: 20px;
}

:deep(.ant-input:disabled) {
  background-color: #f5f5f5;
  color: #8c8c8c;
}

:deep(.ant-select-disabled .ant-select-selector) {
  background-color: #f5f5f5;
  color: #8c8c8c;
}

:deep(.ant-input:focus, .ant-input-focused) {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

:deep(.ant-btn-primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

:deep(.ant-btn-primary:hover) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}
</style>
