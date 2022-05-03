import { apiRequest } from '@/axios/axios'

const accountApi = {
  // 獲取列表資料
  async fcGetTableList (params) {
    try {
      const url = '/api/admin/user/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲得選單列表
  async fcGetMenuList () {
    try {
      const url = '/api/admin/menu/all'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 新增資料
  async fcAddData (data) {
    try {
      const url = '/api/admin/user/store'
      const res = await apiRequest.post(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 編輯資料
  async fcEditData (id, data) {
    try {
      const url = '/api/admin/user/update/' + id
      const res = await apiRequest.put(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 刪除資料
  async fcDeleteData (id) {
    try {
      const url = '/api/admin/user/delete/' + id
      const res = await apiRequest.delete(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 獲得log資料
  async fcGetLogList (params) {
    try {
      const url = '/api/admin/log/admin_user/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 下拉選單資料
  async fcDropDownData () {
    try {
      const url = '/api/admin/group/all'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response.data
    }
  }
}

export default accountApi
