<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img src="@/assets/透明logo.png" alt="Logo" class="logo" />
        <h1 class="login-title">{{ $t('app.title') }}</h1>
        <p class="login-subtitle">{{ $t('app.welcome') }}</p>
      </div>

      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 0 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="login-form"
      >
        <a-form-item name="userAccount" :rules="[{ required: true, message: $t('validation.accountRequired') }]">
          <a-input
            v-model:value="formState.userAccount"
            :placeholder="$t('user.account')"
            size="large"
            class="login-input"
          />
        </a-form-item>

        <a-form-item name="userPassword" :rules="[{ required: true, message: $t('validation.passwordRequired') }]">
          <a-input-password
            v-model:value="formState.userPassword"
            :placeholder="$t('user.password')"
            size="large"
            class="login-input"
          />
        </a-form-item>

        <a-form-item class="form-options">
          <div class="options-wrapper">
            <a-checkbox v-model:checked="formState.remember" class="remember-checkbox">
              {{ $t('user.rememberMe') }}
            </a-checkbox>
            <a href="#" class="forgot-password">{{ $t('user.forgotPassword') }}</a>
          </div>
        </a-form-item>

        <a-form-item class="submit-wrapper">
          <a-button type="primary" html-type="submit" size="large" block class="login-button">
            {{ $t('user.login') }}
          </a-button>
        </a-form-item>

        <div class="register-link">
          {{ $t('user.noAccount') }}
          <a-button type="link" class="register-button" @click="goToRegister">{{ $t('user.registerNow') }}</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { userLogin } from '../../api/userController'
import { message } from 'ant-design-vue'
import { useLoginUserStore } from '../../stores/loginUser'

const router = useRouter()
const { t } = useI18n()
const loginUserStore = useLoginUserStore()

interface FormState {
  userAccount: string
  userPassword: string
  remember: boolean
}

const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
  remember: true,
})

//用户登录
const onFinish = async (values: any) => {
  //发请求
  const res = await userLogin(values)
  if (res.data.code === 0 && res.data.data) {
    loginUserStore.loginUser = res.data.data
    router.push('/')
    message.info('登录成功')
  }else {
    message.error('登录失败')
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const goToRegister = () => {
  router.push('/user/register')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1890ff 0%, #40a9ff 100%);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
}

.login-title {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: #262626;
}

.login-subtitle {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: #8c8c8c;
}

.login-form {
  width: 100%;
}

.login-input {
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

.login-input:hover {
  border-color: #40a9ff;
}

.login-input:focus,
.login-input.ant-input-focused {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.form-options {
  margin-bottom: 24px;
}

.options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-checkbox {
  font-size: 14px;
  color: #595959;
}

.forgot-password {
  font-size: 14px;
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #40a9ff;
}

.submit-wrapper {
  margin-bottom: 24px;
}

.login-button {
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(90deg, #1890ff 0%, #40a9ff 100%);
  border: none;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: linear-gradient(90deg, #40a9ff 0%, #69c0ff 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(24, 144, 255, 0.3);
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: #8c8c8c;
}

.register-button {
  padding: 0;
  font-size: 14px;
  color: #1890ff;
  font-weight: 500;
}

.register-button:hover {
  color: #40a9ff;
}

/* Form item spacing */
.ant-form-item {
  margin-bottom: 20px;
}

.ant-form-item:last-child {
  margin-bottom: 0;
}

/* Input focus states */
.ant-input:focus,
.ant-input-focused,
.ant-input-password:focus,
.ant-input-password-focused {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

/* Checkbox styling */
.ant-checkbox-wrapper {
  color: #595959;
}

.ant-checkbox-checked .ant-checkbox-inner {
  background-color: #1890ff;
  border-color: #1890ff;
}

/* Responsive design */
@media (max-width: 480px) {
  .login-container {
    padding: 16px;
  }

  .login-card {
    padding: 32px 24px;
    max-width: 100%;
  }

  .login-title {
    font-size: 24px;
  }

  .options-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

/* Loading state */
.login-button.ant-btn-loading {
  background: linear-gradient(90deg, #91d5ff 0%, #bae7ff 100%);
}

/* Error state for inputs */
.ant-form-item-has-error .ant-input,
.ant-form-item-has-error .ant-input-password {
  border-color: #ff4d4f;
}

.ant-form-item-has-error .ant-input:focus,
.ant-form-item-has-error .ant-input-password:focus {
  border-color: #ff4d4f;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
}
</style>
