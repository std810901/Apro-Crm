<template>
  <div class="w-100">
    <Header />
    <router-view/>
    <Footer v-if="false" />
  </div>
</template>

<script>
import Header from '@/views/layouts/layoutComponents/Header.vue'
import Footer from '@/views/layouts/layoutComponents/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
</style>
