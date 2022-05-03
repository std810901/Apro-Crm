<template>
  <div class="sidebar">
    <nav id="sidebar" class="">
      <div class="menu">
        <h1>架站後台</h1>
        <a
          href="#"
          class="img logo rounded-circle mb-3"
          style="background-image: url('https://github.com/std810901.png');"
        ></a>
        <h3>{{ $t('__welecome') }}, Vince</h3>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a href="#" data-bs-toggle="collapse" data-bs-target="#settingsMenu"
              ><span class="material-icons-round me-3">
                settings
              </span>
              系統管理</a
            >
            <ul class="list-unstyled collapse show" id="settingsMenu" style="">
              <li>
                <router-link to="/system/auth-management">權限管理</router-link>
              </li>
              <li>
                <router-link to="/system/account-management"
                  >用戶管理</router-link
                >
              </li>
              <li>
                <router-link to="/system/main-setting">主要設定</router-link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" data-bs-toggle="collapse" data-bs-target="#questionMenu"
              ><span class="material-icons-round me-3">
                help
              </span>
              問題管理</a
            >
            <ul class="list-unstyled collapse show" id="questionMenu" style="">
              <li>
                <router-link to="/question-management">問題</router-link>
              </li>
              <li>
                <router-link to="/question-management/tag-category-management"
                  >標籤選項管理</router-link
                >
              </li>
            </ul>
          </li>
          <li>
            <a href="#" data-bs-toggle="collapse" data-bs-target="#templateMenu"
              ><span class="material-icons-round me-3">
                devices
              </span>
              版型管理</a
            >
            <ul class="list-unstyled collapse show" id="templateMenu" style="">
              <li>
                <router-link
                  to="/template-management/module-category-management"
                  >模組管理</router-link
                >
              </li>
              <li>
                <router-link to="/template-management/frontpage-management"
                  >首頁管理</router-link
                >
              </li>
              <li>
                <router-link to="/template-management/innerpage-management"
                  >內頁管理</router-link
                >
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#substationMenu"
              ><span class="material-icons-round">
                notifications
              </span>
              子站管理</a
            >
            <ul
              class="list-unstyled collapse show"
              id="substationMenu"
              style=""
            >
              <li>
                <router-link to="/substation">會員帳號</router-link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#notificationMenu"
              ><span class="material-icons-round">
                notifications
              </span>
              通知中心管理</a
            >
            <ul
              class="list-unstyled collapse show"
              id="notificationMenu"
              style=""
            >
              <li>
                <router-link to="/notification">通知分類</router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/personal">
              <span class="material-icons-round me-3">
                person
              </span>
              個人設定</router-link
            >
          </li>
        </ul>
      </div>
      <div class="footer">
        <p>
          Copyright © {{ getYear() }}
          All rights reserved
        </p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    getYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  z-index: 1;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 300px;
  min-height: 100vh;
  background: #090808;
  color: #fff;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  &.active {
    margin-left: -300px;
  }
  ul {
    max-height: 60vh;
    overflow-y: auto;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */
    &::-webkit-scrollbar {
      display: none; /* Chrome、Edage */
    }
    li {
      a {
        color: white;
        text-decoration: none;
        padding: 15px 0px;
        display: block;
        text-align: start;
        &:hover {
          color: #f8b739;
          transition: color ease-in-out 0.5s;
        }
      }
    }
    &.components {
      padding: 0;
    }
  }
  .logo {
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  .img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .rounded-circle {
    border-radius: 50%;
  }
  .menu {
    padding-top: 20px;
  }
}
</style>
