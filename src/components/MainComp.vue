<template>
  <main>

    <MainTop @userQuery="queryString" />
    
    <div class="container">
      <h1>Film</h1>

      <div class="cards">
        <CardComp 
          :key="film.id" 
          v-for="film in films" 
          :filmImage="`${filmPoster}${film.poster_path}`" 
          :FilmLanguage="film.original_language" 
          :filmOriginalTitle="film.original_title" 
          :filmTranslatedTitle="film.title" 
          :FilmValutation="film.vote_average" 
        />
      </div>

    </div>

  </main>
</template>

<script>
  import MainTop from './MainTop.vue';
  import CardComp from './CardComp.vue';
  import axios from 'axios';

  export default {
    name: "MainComp",
    components: { MainTop, CardComp },
    data(){
      return{
        apiUrl: 'https://api.themoviedb.org/3/search/movie',
        trendingFilms: 'https://api.themoviedb.org/3/movie/popular',
        apiParams:{
          api_key: '1f779dcaa67f2a9b43bc653638990b2f',
          language: 'it-IT',
          query: 'harry potter'
        },
        films: [],
        filmPoster: 'https://image.tmdb.org/t/p/w500'
      }
    },
    methods:{
      getApi(){
        axios.get(this.apiUrl, {params: this.apiParams})
        .then(response =>{
          console.log(response.data);
          this.films = response.data.results;
          console.log('film ricercati', this.films);
        })
        .catch(error =>{
          console.log(error);
        })
      },
      getTrendingFilms(){
        axios.get(this.trendingFilms, {
          params: {
            api_key: this.apiParams.api_key
          }
        })
        .then(response =>{
          console.log(response.data);
          this.films = response.data.results;
          console.log('film popolari', this.films);
        })
        .catch(error =>{
          console.log(error);
        })
      },
      queryString(string){
        this.apiParams.query = string;
        this.getApi();
      }
    },

    mounted(){
      this.getTrendingFilms();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/variables.scss';
  @import '../assets/style/mixin.scss';

  main{
    background-color: $primary-color;
    min-height: 100vh;
    .container{
      display: flex;
      flex-direction: column;
      width: 70%;
      margin: 0 auto;
      h1{
        color: grey;
      }
      .cards{
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

</style>