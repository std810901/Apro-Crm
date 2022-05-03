import { apiRequest } from '@/axios/axios'
const generalApi = {
  // 登入
  async login (loginData) {
    try {
      const url = '/api/admin/login'
      const res = await apiRequest.post(url, loginData)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  // 登出
  async logout () {
    try {
      const url = '/api/admin/logout'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  }
}

export default generalApi
