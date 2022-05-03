import { apiRequest } from '@/axios/axios'
const questionApi = {
  // 獲取列表資料
  async fcGetTableList (param) {
    try {
      const url = '/api/admin/question/list'
      const res = await apiRequest.get(url, { param })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 下拉選單資料
  async fcDropDownData () {
    try {
      const url = '/api/admin/option/category/all'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response.data
    }
  },
  // 新增資料
  async fcAddData (data) {
    try {
      const url = '/api/admin/question/store'
      const res = await apiRequest.post(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 編輯資料
  async fcEditData (id, data) {
    try {
      const url = '/api/admin/question/update/' + id
      const res = await apiRequest.put(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 刪除資料
  async fcDeleteData (id) {
    try {
      const url = '/api/admin/question/delete/' + id
      const res = await apiRequest.delete(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲得log資料
  async fcGetLogList (params) {
    try {
      const url = '/api/admin/log/question/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  }
}
export default questionApi
