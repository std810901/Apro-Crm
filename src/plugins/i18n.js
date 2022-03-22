// import { createI18n } from 'vue-i18n'
// // 載入語言
// import tw from '@/lang/tw.json'
// import en from '@/lang/en.json'

// const i18n = createI18n({
//   locale: 'zh-TW', // 設定語言
//   fallbackLocale: 'zh-TW', // 若選擇的語言缺少翻譯則退回的語言
//   messages: {
//     tw,
//     en
//   }
//   // 其他常用的配置
// })
// export default i18n
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
