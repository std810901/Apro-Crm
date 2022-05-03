import { apiRequest } from '@/axios/axios'
const tagApi = {
  // 獲取列表資料
  async fcGetTableList (params) {
    try {
      const url = '/api/admin/option/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 新增資料
  async fcAddData (data) {
    try {
      const url = '/api/admin/option/store'
      const res = await apiRequest.post(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 編輯資料
  async fcEditData (id, data) {
    try {
      const url = '/api/admin/option/update/' + id
      const res = await apiRequest.put(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 刪除資料
  async fcDeleteData (id) {
    try {
      const url = '/api/admin/option/delete/' + id
      const res = await apiRequest.delete(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲得log資料
  async fcGetLogList (params) {
    try {
      const url = '/api/admin/log/option/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  }
}
export default tagApi
