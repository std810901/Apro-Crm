import { apiRequest } from '@/axios/axios'
const settingApi = {
  // 獲取語言資料
  async fcGetLanguageTableList () {
    try {
      const url = '/api/admin/language/list'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 編輯語言資料
  async fcUpdateLanguageTableList (languages) {
    try {
      const url = '/api/admin/language/update'
      const res = await apiRequest.put(url, { languages })
      return res.data
    } catch (error) {
      throw error.response
    }
  }
}

export default settingApi
