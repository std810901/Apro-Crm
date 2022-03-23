<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container-fluid p-0">
        <a class="navbar-brand" href="#" @click="activeSidebar()">
          <span
            class="material-icons-round "
            :class="{ close: menuSwitcher }"
          >
            chevron_left
          </span>
        </a>
        <button class="btn d-block d-md-none" type="button">
          <span class="material-icons-round">
            menu
          </span>
        </button>
        <div class="dropstart d-none d-md-flex">
          <a
            href="#"
            class="text-dark me-4"
            id="changeLang"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="material-icons-round">
              language
            </span>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="changeLang"
          >
            <li>
              <a class="dropdown-item" @click="changeLang('tw')">中文</a>
            </li>
            <li>
              <a class="dropdown-item" @click="changeLang('en')">English</a>
            </li>
          </ul>
          <a
            href="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/std810901.png"
              alt="hugenerd"
              width="30"
              height="30"
              class="rounded-circle"
            />
          </a>
          <ul
            class="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" @click="logout()">Sign out</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import authApi from '@/api/authApi'
import VueCookies from 'vue-cookies'
import i18n from '@/plugins/i18n'
import { apiRequest } from '@/axios/axios'
export default {
  props: {},
  mounted () {},
  data () {
    return {
      menuSwitcher: false
    }
  },
  methods: {
    activeSidebar () {
      this.menuSwitcher = !this.menuSwitcher
      if (this.menuSwitcher) {
        document.getElementById('sidebar').classList.add('active')
      } else {
        document.getElementById('sidebar').classList.remove('active')
      }
    },
    changeLang (lang) {
      i18n.locale = lang
      localStorage.setItem('language', lang)
      apiRequest.defaults.headers.common.language = lang
    },
    logout () {
      authApi
        .logout()
        .then(res => {
          console.log(res)
          VueCookies.remove('token')
          this.$router.push('/login')
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.material-icons-round {
  vertical-align: middle;
  font-size: 30px;
  &.close {
    transform: rotate(900deg);
    transition: transform 0.5s;
  }
}
</style>
