<template>
  <div id="content" class="content">
    <router-view/>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-left: 300px;
  width: calc(100% - 300px);
  transition: all 0.3s;
  &.active {
    margin-left: unset;
    width: 100%;
  }
}

</style>
