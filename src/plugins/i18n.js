import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tw from '@/lang/tw'
import en from '@/lang/en'

// 使用VueI18n插件
Vue.use(VueI18n)

// 取得預設語系
const locale = localStorage.getItem('language') || 'tw'

// 建立 VueI18n 實體
const i18n = new VueI18n({
  locale,
  fallbackLocale: 'tw', // 若選擇的語言缺少翻譯則退回的語言
  messages: {
    en,
    tw
  }
})

export default i18n
