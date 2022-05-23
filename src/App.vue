<template>
  <div>
    <MainComp />
  </div>
</template>

<script>
  import MainComp from './components/MainComp.vue';

  export default {
    name: 'App',
    components: {
      MainComp
    }
  }
</script>

<style lang="scss">
  @import './assets/style/variables.scss';
  @import './assets/style/generals.scss';

</style>
