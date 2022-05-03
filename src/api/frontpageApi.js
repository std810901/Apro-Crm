import { apiRequest } from '@/axios/axios'

const frontpageApi = {
  async fcGetLogList (params) {
    try {
      const url = '/api/admin/log/template/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲取列表資料
  async fcGetTableList (params) {
    try {
      const url = '/api/admin/template/index/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲得分頁單筆內容
  async fcGetMenuList (id) {
    try {
      const url = '/api/admin/template/index/detail/' + id
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 新增資料
  async fcAddData (data) {
    try {
      const url = '/api/admin/template/index/store'
      const res = await apiRequest.post(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 編輯資料
  async fcEditData (id, data) {
    try {
      const url = '/api/admin/template/index/update/' + id
      const res = await apiRequest.put(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 刪除資料
  async fcDeleteData (id) {
    try {
      const url = '/api/admin/template/delete/' + id
      const res = await apiRequest.delete(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲取多選下拉資料
  async fcGetSelectList () {
    try {
      const url = '/api/admin/option/all'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  }
}

export default frontpageApi
