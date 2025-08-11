<template>
  <a-dropdown placement="bottomRight">
    <a-button type="text" class="language-switch">
      <global-outlined />
      {{ currentLanguageText }}
      <down-outlined />
    </a-button>
    
    <template #overlay>
      <a-menu @click="handleLanguageChange" :selected-keys="[currentLocale]">
        <a-menu-item key="zh">
          <span class="language-item">
            🇨🇳 简体中文
          </span>
        </a-menu-item>
        <a-menu-item key="en">
          <span class="language-item">
            🇺🇸 English
          </span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { GlobalOutlined, DownOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const { locale } = useI18n()

// 当前语言
const currentLocale = computed(() => locale.value)

// 当前语言显示文本
const currentLanguageText = computed(() => {
  return locale.value === 'zh' ? '中文' : 'EN'
})

// 语言切换处理
const handleLanguageChange = ({ key }: { key: string }) => {
  if (key !== locale.value) {
    locale.value = key
    localStorage.setItem('language', key)
    
    // 显示切换成功提示
    const messageText = key === 'zh' ? '语言已切换为中文' : 'Language switched to English'
    message.success(messageText)
    
    // 可选：刷新页面以应用所有更改
    // window.location.reload()
  }
}
</script>

<style scoped>
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

:deep(.ant-dropdown-menu-item) {
  padding: 8px 16px;
}

:deep(.ant-dropdown-menu-item:hover) {
  background-color: #f5f5f5;
}

:deep(.ant-dropdown-menu-item-selected) {
  background-color: #e6f7ff;
  color: #1890ff;
}
</style> 