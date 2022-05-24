<template>
  <header>

    <div 
      class="logo" 
      @click="queryByUser = '', 
      selectedGenreMovie = 'all', 
      selectedGenreTV = 'all', 
      $emit('userQuery', queryByUser)"
    >
      <img src="../assets/img/logo.png" alt="">
    </div>

    <div class="inputs">
      <input placeholder="Cerca film o serie TV" type="text" v-model="queryByUser" @keyup.enter="$emit('userQuery', queryByUser)">

      <button @click="$emit('userQuery', queryByUser)">Cerca</button>
      <button 
        @click="queryByUser = '', 
        selectedGenreMovie = 'all', 
        selectedGenreTV = 'all',  
        $emit('userQuery', queryByUser)"
      >Reset</button>

      <select v-model="selectedItem" @change="$emit('itemChanger', selectedItem)" >
        <option value="all">Film e serieTV</option>
        <option value="film">Film</option>
        <option value="serieTV">Serie TV</option>
      </select>

      <select v-model="selectedGenreMovie" @change="$emit('movieGenreChanger', selectedGenreMovie)" >
        <option value="all">(film) Tutti i generi</option>
        <option v-for="genre in movieGenres" :key="genre.id" :value="genre.name">{{genre.name}}</option>
      </select>

      <select v-model="selectedGenreTV" @change="$emit('tvGenreChanger', selectedGenreTV)" >
        <option value="all">(serieTV) Tutti i generi</option>
        <option v-for="genre in tvGenres" :key="genre.id" :value="genre.name">{{genre.name}}</option>
      </select>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainTop',
  props:{
    movieGenres: Array,
    tvGenres: Array
  },
  data(){
    return{
      queryByUser: '',
      selectedItem: 'all',
      selectedGenreMovie: 'all',
      selectedGenreTV: 'all'
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
    .logo{
      cursor: pointer;
      img{
        width: 150px;
        height: 100%;
      }
    }
    .inputs{
      display: flex;
      align-items: center;
      & *{
        margin: 0 5px;
        background-color: transparent;
        color: white;
        border: 1px solid white;
        cursor: pointer;
      }
      input{
        width: 300px;
        height: 80%;
        border: 1px solid white;
        padding-left: 30px;
        &::placeholder{
          color: grey;
        }
      }
      button{
        width: 60px;
        height: 80%;
      }
      select{
        height: 80%;
        option{
          background: black;
        }
      }
    }
  }

</style>