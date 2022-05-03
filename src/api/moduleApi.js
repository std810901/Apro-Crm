import { apiRequest } from '@/axios/axios'
const moduleApi = {
  async fcGetTableList (params) {
    try {
      const url = '/api/admin/module/item/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 新增資料
  async fcAddData (data) {
    const formData = new FormData()
    formData.append('image', data.image)
    formData.append('language', data.language)
    formData.append('use_image', data.use_image)
    formData.append('config', data.config)
    formData.append('data', data.data)
    formData.append('status', data.status)
    formData.append('sort', data.sort)
    formData.append('code', data.code)
    formData.append('module', data.module)
    try {
      const url = '/api/admin/module/item/store'
      const res = await apiRequest.post(url, formData)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 編輯資料
  async fcEditData (id, data) {
    const formData = new FormData()
    formData.append('image', data.image)
    formData.append('language', data.language)
    formData.append('use_image', data.use_image)
    formData.append('config', data.config)
    formData.append('data', data.data)
    formData.append('status', data.status)
    formData.append('sort', data.sort)
    formData.append('code', data.code)
    try {
      const url = '/api/admin/module/item/update/' + id
      const res = await apiRequest.post(url, formData)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 刪除資料
  //   async fcDeleteData (id) {
  //     try {
  //       const url = '/api/admin/module/item/delete/' + id
  //       const res = await apiRequest.delete(url)
  //       return res.data
  //     } catch (error) {
  //       throw error.response
  //     }
  //   },
  // 獲得log資料
  async fcGetLogList (params) {
    try {
      const url = '/api/admin/log/module_item/list'
      const res = await apiRequest.get(url, { params })
      return res.data
    } catch (error) {
      throw error.response
    }
  }
}
export default moduleApi
