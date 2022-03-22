import { apiRequest } from '@/axios/axios'

const authApi = {
  async login (loginData) {
    const url = '/api/admin/login'
    const res = await apiRequest.post(url, loginData)
    console.log(res)
    return res.data
  },
  async logout () {
    const url = '/api/admin/logout'
    const res = await apiRequest.get(url)
    console.log(res)
    return res.data
  }
}

export default authApi
