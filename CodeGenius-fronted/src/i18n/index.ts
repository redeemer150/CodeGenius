import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

// 获取当前语言设置
const getLanguage = (): string => {
  const stored = localStorage.getItem('language')
  if (stored) {
    return stored
  }
  
  // 检测浏览器语言
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.includes('zh')) {
    return 'zh'
  }
  return 'en'
}

const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: getLanguage(), // 默认语言
  fallbackLocale: 'zh', // 回退语言
  messages: {
    zh,
    en
  }
})

export default i18n 