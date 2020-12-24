<template>
  <div id="" class="">
    <Navbar :theme="$route.meta.navbarTheme"/>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
    components: {
      Navbar,
    },
    computed: {},
    mounted(){}
  }
</script>

<style lang="scss" src="@/assets/styles/main.scss">
</style>
