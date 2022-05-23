<template>
  <div>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'QueryTitleComp',
  props:{
    title: String
  }
}
</script>

<style lang="scss" scoped>
h1{
  color: white;
  margin-bottom: 10px;
}
</style>