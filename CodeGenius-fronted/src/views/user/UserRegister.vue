<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <img src="@/assets/透明logo.png" alt="Logo" class="logo" />
        <h1 class="register-title">CodeGenius</h1>
        <p class="register-subtitle">创建您的账户，开始使用我们的服务</p>
      </div>

      <a-form
        :model="formState"
        name="register"
        :label-col="{ span: 0 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="register-form"
      >
        <a-form-item
          name="userAccount"
          :rules="[
            { required: true, message: '请输入用户名' },
            { min: 3, max: 20, message: '用户名长度应为3-20个字符' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' },
          ]"
        >
          <a-input
            v-model:value="formState.userAccount"
            placeholder="用户名"
            size="large"
            class="register-input"
          />
        </a-form-item>

        <a-form-item
          name="userPassword"
          :rules="[
            { required: true, message: '请输入密码' },
            { min: 8, message: '密码长度至少8个字符' },
            { validator: validatePassword },
          ]"
        >
          <a-input-password
            v-model:value="formState.userPassword"
            placeholder="密码"
            size="large"
            class="register-input"
          />
        </a-form-item>

        <a-form-item
          name="checkPassword"
          :rules="[
            { required: true, message: '请确认密码' },
            { validator: validateConfirmPassword },
          ]"
        >
          <a-input-password
            v-model:value="formState.checkPassword"
            placeholder="确认密码"
            size="large"
            class="register-input"
          />
        </a-form-item>

        <a-form-item class="form-options">
          <div class="options-wrapper">
            <a-checkbox v-model:checked="formState.agreeTerms" class="terms-checkbox">
              我已阅读并同意
              <a href="#" class="terms-link">《用户协议》</a>
              和
              <a href="#" class="terms-link">《隐私政策》</a>
            </a-checkbox>
          </div>
        </a-form-item>

        <a-form-item class="submit-wrapper">
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            class="register-button"
            :disabled="!formState.agreeTerms"
          >
            注册
          </a-button>
        </a-form-item>

        <div class="login-link">
          已有账户？
          <a-button type="link" class="login-button" @click="goToLogin"> 立即登录</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { Rule } from 'ant-design-vue/es/form'
import { userRegister } from '@/api/userController.ts'
import { message } from 'ant-design-vue'

const router = useRouter()

interface FormState {
  userAccount: string
  userPassword: string
  checkPassword: string
  agreeTerms: boolean
}

const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
  agreeTerms: false,
})

// 密码验证
const validatePassword = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请输入密码')
  }
  if (value.length < 8) {
    return Promise.reject('密码长度至少8个字符')
  }
  return Promise.resolve()
}

// 确认密码验证
const validateConfirmPassword = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请确认密码')
  }
  if (value !== formState.userPassword) {
    return Promise.reject('两次输入的密码不一致')
  }
  return Promise.resolve()
}

const onFinish = async (values: any) => {
  // 这里可以添加注册API调用
  const res= await userRegister(values);
  if(res.data.code===0&&res.data.data){
    router.push('/user/login');
    message.success('注册成功');
  }else {
    message.error('注册失败,'+res.data.message);
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('注册失败:', errorInfo)
}

const goToLogin = () => {
  router.push('/user/login')
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.register-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #52c41a 0%, #73d13d 100%);
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
}

.register-title {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: #262626;
}

.register-subtitle {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: #8c8c8c;
}

.register-form {
  width: 100%;
}

.register-input {
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

.register-input:hover {
  border-color: #40a9ff;
}

.register-input:focus,
.register-input.ant-input-focused {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.form-options {
  margin-bottom: 24px;
}

.options-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terms-checkbox {
  font-size: 14px;
  color: #595959;
  line-height: 1.5;
}

.terms-link {
  color: #1890ff;
  text-decoration: none;
  margin: 0 2px;
}

.terms-link:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.submit-wrapper {
  margin-bottom: 24px;
}

.register-button {
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(90deg, #52c41a 0%, #73d13d 100%);
  border: none;
  transition: all 0.3s ease;
}

.register-button:hover:not(:disabled) {
  background: linear-gradient(90deg, #73d13d 0%, #95de64 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(82, 196, 26, 0.3);
}

.register-button:disabled {
  background: #f5f5f5;
  border-color: #d9d9d9;
  color: #bfbfbf;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: #8c8c8c;
}

.login-button {
  padding: 0;
  font-size: 14px;
  color: #1890ff;
  font-weight: 500;
}

.login-button:hover {
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

/* Responsive design */
@media (max-width: 480px) {
  .register-container {
    padding: 16px;
  }

  .register-card {
    padding: 32px 24px;
    max-width: 100%;
  }

  .register-title {
    font-size: 24px;
  }

  .terms-checkbox {
    font-size: 12px;
  }
}

/* Loading state */
.register-button.ant-btn-loading {
  background: linear-gradient(90deg, #b7eb8f 0%, #d9f7be 100%);
}
</style>
