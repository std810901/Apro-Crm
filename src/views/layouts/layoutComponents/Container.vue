<template>
  <div id="content" class="content">
    <div class="container-fluid">
      <Breadcrumb class="my-3" :home="home" :model="items" />
    </div>
    <router-view />
  </div>
</template>

<script>
import Breadcrumb from 'primevue/breadcrumb'
export default {
  data () {
    return {
      home: { icon: 'pi pi-home', to: '/', label: ' 首頁' },
      items: []
    }
  },
  components: {
    Breadcrumb
  },
  watch: {
    $route: {
      handler: function (route) {
        this.items = route.matched.map(m => {
          return {
            to: m.path,
            label: m.name
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
.content {
  margin-left: 300px;
  padding-top: 60px;
  width: calc(100% - 300px);
  transition: all 0.3s;
  @media screen and (max-width: 1440px) {
    width: 100%;
    margin-left: 0px;
  }
  &.active {
    margin-left: unset;
    width: 100%;
  }
}
</style>
