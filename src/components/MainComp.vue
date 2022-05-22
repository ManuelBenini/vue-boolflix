<template>
  <main>

    <MainTop @userQuery="queryString" />
    
    <div class="container">
      <h1>Film</h1>

      <div class="cards">
        <CardComp 
          v-for="film in films" 
          :key="film.id" 
          :film="film"
          :filmImageUrl="filmImageUrl"
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
        filmImageUrl: 'https://image.tmdb.org/t/p/w500'
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
        if(this.apiParams.query === ''){
          this.getTrendingFilms()
        } else{
          this.getApi()
        }  
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
      padding-top: 5px;
      display: flex;
      flex-direction: column;
      width: 70%;
      margin: 0 auto;
      h1{
        color: white;
        margin-bottom: 10px;
      }
      .cards{
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

</style>