import { apiRequest } from '@/axios/axios'

const personalApi = {
  async ApiGetPersonData () {
    try {
      const url = '/api/admin/profile'
      const res = await apiRequest.get(url)
      return res.data
    } catch (error) {
      throw error.response
    }
  },
  async ApiUpdatePersonData (data) {
    try {
      const url = '/api/admin/profile/update'
      const res = await apiRequest.put(url, data)
      return res.data
    } catch (error) {
      throw error.response
    }
  }
}
export default personalApi
