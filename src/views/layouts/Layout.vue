<template>
  <div class="wrapper">
    <Sildebar />
    <Header />
    <Container />
  </div>
</template>

<script>
import Sildebar from '@/views/layouts/layoutComponents/Sildebar.vue'
import Container from '@/views/layouts/layoutComponents/Container.vue'
import Header from '@/views/layouts/layoutComponents/Header.vue'
export default {
  components: {
    Sildebar,
    Container,
    Header
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  overflow: hidden;
}
</style>
