<template>
  <div>
    <Header />
    <Sildebar />
    <Footer />
  </div>
</template>

<script>
import Header from '@/views/layouts/layoutComponents/Header.vue'
import Sildebar from '@/views/layouts/layoutComponents/Sildebar.vue'

import Footer from '@/views/layouts/layoutComponents/Footer.vue'
export default {
  components: {
    Header,
    Sildebar,
    Footer
  }
}
</script>

<style></style>
