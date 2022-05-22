<template>
  <header>

    <div class="logo">
      <img src="../assets/img/logo.png" alt="">
    </div>

    <div class="inputs">
      <input placeholder="Cerca film o serie TV" type="text" v-model="queryByUser" @keyup.enter="$emit('userQuery', queryByUser)">
      <button @click="$emit('userQuery', queryByUser)">Cerca</button>
      <button @click="queryByUser = '' ">Reset</button>
      <select name="" id="">
        <option value="all">All</option>
        <option value="film">Film</option>
        <option value="serieTV">Serie TV</option>
      </select>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainTop',
  data(){
    return{
      queryByUser: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  header{
    height: 70px;
    display: flex;
    justify-content: space-between;
    background-color: brown;
    padding: 10px 10px;
    background-image: linear-gradient(black, $primary-color);
    img{
      width: 75%;
      height: 100%;
    }
    .inputs{
      display: flex;
      align-items: center;
      & *{
        margin: 0 5px;
      }
      input{
        width: 300px;
        height: 80%;
      }
      button{
        width: 60px;
        height: 80%;
      }
      select{
        height: 80%;
      }
    }
  }

</style>