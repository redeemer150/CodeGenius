<template>
  <a-layout-header class="header">
    <a-row :wrap="false">
      <!-- 左侧：Logo和标题 -->
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="header-left">
            <img class="logo" src="@/assets/logo1.png" alt="Logo" />
            <h1 class="site-title">CodeGenius</h1>
          </div>
        </RouterLink>
      </a-col>
      <!-- 中间：导航菜单 -->
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
          :items="menuItems"
          @click="handleMenuClick"
        />
      </a-col>
      <!-- 右侧：用户操作区域 -->
      <a-col>
        <div class="user-actions">
          <!-- 语言切换 -->
          <a-dropdown placement="bottomRight">
            <a-button type="text" class="language-switch">
              <global-outlined />
              {{ currentLanguageText }}
              <down-outlined />
            </a-button>

            <template #overlay>
              <a-menu @click="handleLanguageChange" :selected-keys="[locale]">
                <a-menu-item key="zh">
                  <span class="language-item"> 🇨🇳 简体中文 </span>
                </a-menu-item>
                <a-menu-item key="en">
                  <span class="language-item"> 🇺🇸 English </span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>

          <!-- 用户登录状态 -->
          <div class="user-login-status">
            <div v-if="loginUserStore.loginUser.id">
              <a-dropdown>
                <a-space>
                  <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                  {{ loginUserStore.loginUser.userName ?? '无名' }}
                </a-space>
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="userCenterSetting">
                      <UserOutlined />
                      {{ $t('user.personalCenter') }}
                    </a-menu-item>
                    <a-menu-item @click="doLogout">
                      <LogoutOutlined />
                      {{ $t('user.logout') }}
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div v-else>
              <a-button type="primary" href="/user/login">{{ $t('user.login') }}</a-button>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { type MenuProps, message } from 'ant-design-vue'
import { useLoginUserStore } from '../../stores/loginUser'
import { userLogout } from '../../api/userController'
import {
  LogoutOutlined,
  HomeOutlined,
  GlobalOutlined,
  DownOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import checkAccess from '@/access/checkAccess.ts'
import accessEnum from '@/access/accessEnum.ts'

const loginUserStore = useLoginUserStore()
const router = useRouter()
const { locale, t } = useI18n()

// 当前选中菜单
const selectedKeys = ref<string[]>(['/'])

// 语言切换相关
const currentLanguageText = computed(() => {
  return locale.value === 'zh' ? '中文' : 'EN'
})

const handleLanguageChange = ({ key }: { key: string }) => {
  if (key !== locale.value) {
    locale.value = key
    localStorage.setItem('language', key)
    const messageText = key === 'zh' ? '语言已切换为中文' : 'Language switched to English'
    message.success(messageText)
  }
}
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path]
})

// 菜单配置项
const originItems = computed(() => [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: t('menu.home'),
    title: t('menu.home'),
  },
  {
    key: '/admin/userManage',
    label: t('menu.userManage'),
    title: t('menu.userManage'),
  },
  {
    key: '/admin/appManage',
    label: t('menu.appManage'),
    title: t('menu.appManage'),
  },
  {
    key: 'others',
    label: h(
      'a',
      { href: 'https://github.com/redeemer150/CodeGenius', target: '_blank' },
      'CodeGenius',
    ),
    title: 'CodeGenius',
  },
])

// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    const menuKey = menu?.key as string
    if (menuKey?.startsWith('/admin')) {
      return  checkAccess(loginUserStore.loginUser,accessEnum.ADMIN)
    }else {
      return true;
    }

  })
}

// 展示在菜单的路由数组
const menuItems = computed<MenuProps['items']>(() => filterMenus(originItems.value))

// 处理菜单点击
const handleMenuClick: MenuProps['onClick'] = (e) => {
  const key = e.key as string
  selectedKeys.value = [key]
  // 跳转到对应页面
  if (key.startsWith('/')) {
    router.push(key)
  }
}

// 退出登录
const doLogout = async () => {
  const res = await userLogout()
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/user/login')
  } else {
    message.error('退出登录失败，' + res.data.message)
  }
}

const userCenterSetting = async () => {
  await router.push('/user/center')
}
</script>

<style scoped>
.header {
  background: #fff;
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 48px;
  width: 48px;
}

.site-title {
  margin: 0;
  font-size: 18px;
  color: #1890ff;
}

.ant-menu-horizontal {
  border-bottom: none !important;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.language-switch {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  color: #595959;
  transition: all 0.3s;
}

.language-switch:hover {
  color: #1890ff;
  background-color: #f5f5f5;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
</style>
