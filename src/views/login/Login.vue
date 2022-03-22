<template>
  <div class="login">
    <div class="container-fluid h-100">
      <div class="row h-100 align-items-center">
        <div class="col-6">
          <img class="card-img-top" alt="Login Image" height="100" />
        </div>
        <div class="col-6">
          <h1>COSMO</h1>
          <h4>Login</h4>
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-6">
                <form class="text-start">
                  <div class="mb-3">
                    <label for="InputUserName" class="form-label">帳號</label>
                    <input
                      type="text"
                      class="form-control"
                      id="InputUserName"
                      v-model="userName"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="InputPassword" class="form-label">密碼</label>
                    <input
                      type="password"
                      class="form-control"
                      id="InputPassword"
                      v-model="password"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="selectLang" class="form-label">網站語系</label>
                    <select class="form-select" v-model="language">
                      <option selected disabled value="">請選擇語系</option>
                      <option value="tw">中文</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="remberMyAccount"
                      v-model="remberMyAccount"
                    />
                    <label class="form-check-label" for="remberMyAccount"
                      >記住我的帳號</label
                    >
                  </div>
                  <a type="submit" class="btn btn-primary" @click="login()"
                    >提交</a
                  >
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authApi from '@/api/authApi'
import { apiRequest } from '@/axios/axios'
import VueCookies from 'vue-cookies'
export default {
  data () {
    return {
      userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
      password: '',
      language: '',
      remberMyAccount: false
    }
  },
  mounted () {
    if (localStorage.getItem('userName')) this.remberMyAccount = true
    if (localStorage.getItem('language')) this.language = localStorage.getItem('language')
  },
  methods: {
    login () {
      // preset info
      localStorage.setItem('language', this.language)
      apiRequest.defaults.headers.common.language = this.language
      if (this.remberMyAccount) localStorage.setItem('userName', this.userName)

      const loginData = {
        username: this.userName,
        password: this.password
      }
      authApi
        .login(loginData)
        .then(res => {
          console.log(res)
          VueCookies.set('token', res.data.access_token, 86400)
          location.replace(location.protocol + '//' + location.host)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
}
</style>
