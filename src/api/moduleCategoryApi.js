import { apiRequest } from '@/axios/axios'
const moduleCategoryApi = {
  async fcGetTableList () {
    try {
      const url = '/api/admin/module/list'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 新增資料
  async fcAddData (data) {
    try {
      const url = '/api/admin/module/store'
      const res = await apiRequest.post(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 編輯資料
  async fcEditData (id, data) {
    try {
      const url = '/api/admin/module/update/' + id
      const res = await apiRequest.put(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 刪除資料
  //   async fcDeleteData (id) {
  //     try {
  //       const url = '/api/admin/module/delete/' + id
  //       const res = await apiRequest.delete(url)
  //       return res.data
  //     } catch (error) {
  //       throw error.response
  //     }
  //   },
  // 獲得log資料
  async fcGetLogList (params) {
    try {
      const url = '/api/admin/log/module/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 下拉選單資料
  async fcDropDownData () {
    try {
      const url = '/api/admin/module/type'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response.data
    }
  }
}
export default moduleCategoryApi
