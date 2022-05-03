<script>
import VueCookies from 'vue-cookies'
export default {
  data () {
    return {}
  },
  methods: {
    apiHandle (data, showSuccessMsg = true) {
      if (data && data.status > 200) {
        // 發生錯誤時處理
        this.$toast.add({
          severity: 'error',
          summary: data.status,
          detail: data.statusText,
          life: 5000
        })
        switch (data.status) {
          case 401:
            // Token失效直接登出
            VueCookies.remove('token')
            this.$router.push('/login')
            break
          case 404:
            this.$router.push('/404')
            break
          case 500:
            this.$router.push('/500')
            this.$toast.add({
              severity: 'error',
              summary: '伺服器發生錯誤',
              detail: '請通知系統管理員',
              life: 5000
            })
            break
          default:
            console.error(data)
            break
        }
      } else if (data && data.code) {
        switch (data.code) {
          case 200:
            // 成功回傳訊息
            if (showSuccessMsg) {
              this.$toast.add({
                severity: 'success',
                summary: '成功',
                detail: 'Success',
                life: 3000
              })
            }
            break
          case 400:
            this.$toast.add({
              severity: 'warn',
              summary: '請求出錯',
              detail: data.message,
              life: 5000
            })
            break
          // 沒有權限，停留原頁，並秀訊息
          case 403:
            this.$toast.add({
              severity: 'warn',
              summary: '未授權',
              detail: data.message,
              life: 5000
            })
            this.$router.go(-1)
            break
          default:
            break
        }
      }
    }
  }
}
</script>
