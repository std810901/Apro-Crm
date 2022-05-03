import { apiRequest } from '@/axios/axios'

const notificationApi = {
  // 獲得log資料
  async fcGetLogList (params) {
    try {
      const url = '/api/admin/log/news_category/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲取列表資料
  async fcGetTableList (params) {
    try {
      const url = '/api/admin/news/category/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲得分頁單筆內容
  async fcGetMenuList (id) {
    try {
      const url = '/api/admin/news/category/detail/' + id
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 新增資料
  async fcAddData (data) {
    try {
      const url = '/api/admin/news/category/store'
      const res = await apiRequest.post(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 編輯資料
  async fcEditData (id, data) {
    try {
      const url = '/api/admin/news/category/update/' + id
      const res = await apiRequest.put(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 刪除資料
  async fcDeleteData (id) {
    try {
      const url = '/api/admin/news/category/delete/' + id
      const res = await apiRequest.delete(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  }
}

export default notificationApi
