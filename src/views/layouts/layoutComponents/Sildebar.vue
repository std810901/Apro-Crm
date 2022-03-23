<template>
  <div>
    <nav id="sidebar" class="">
      <div class="menu">
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
            <ul class="list-unstyled collapse" id="settingsMenu" style="">
              <li>
                <a href="#">權限管理</a>
              </li>
              <li>
                <a href="#">用戶管理</a>
              </li>
              <li>
                <a href="#">主要設定</a>
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
            <ul class="list-unstyled collapse" id="questionMenu" style="">
              <li>
                <a href="#">標籤選項管理</a>
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
            <ul class="list-unstyled collapse" id="templateMenu" style="">
              <li>
                <a href="#">模組管理</a>
              </li>
              <li>
                <a href="#">首頁管理</a>
              </li>
              <li>
                <a href="#">內頁管理</a>
              </li>
            </ul>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
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
