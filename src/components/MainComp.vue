<template>
  <main>
    <div v-if="isLoaded">
      <MainTop 
        @userQuery="queryString" 
        @itemChanger="itemSelector"
        @movieGenreChanger="movieGenreSelector"
        @tvGenreChanger="tvGenreSelector"
        :movieGenres="movieGenres"
        :tvGenres="tvGenres"
      />
    
      <div class="container">

        <QueryTitleComp title="Film" v-if="selectedItem === 'all' || selectedItem === 'film'" />

        <div class="film-cards" v-if="films.length > 0 && (selectedItem === 'all' || selectedItem === 'film')" >
          <CardComp 
            v-for="film in movieWithGenre" 
            :key="film.id" 
            :queryElement="film"
            :elementImageUrl="ImageUrl"
            typeOfSearch="film"
            :apiUrlBase="apiUrlBase"
            :api_key="apiParams.api_key"
            :language="apiParams.language"
          />
        </div>

        <div v-if="(films.length === 0 || movieWithGenre.length === 0) && (selectedItem === 'all' || selectedItem === 'film')">
          <h2>Non è stato trovato nessun film</h2>
        </div>

        <QueryTitleComp title="Serie TV" v-if="selectedItem === 'all' || selectedItem === 'serieTV'" />

        <div class="tvSeries-cards" v-if="tvSeries.length > 0 && (selectedItem === 'all' || selectedItem === 'serieTV')">
          <CardComp 
            v-for="serie in tvWithGenre" 
            :key="serie.id" 
            :queryElement="serie"
            :elementImageUrl="ImageUrl"
            typeOfSearch="serieTV"
            :apiUrlBase="apiUrlBase"
            :api_key="apiParams.api_key"
            :language="apiParams.language"
          />
        </div>

        <div v-if="(tvSeries.length === 0 || tvWithGenre.length === 0) && (selectedItem === 'all' || selectedItem === 'serieTV')">
          <h2>Non è stata trovata nessuna serie TV</h2>
        </div>

      </div>
    </div>

    <div v-else class="loading">
      <img src="../assets/img/logo.png" alt="">
      <h1>{{referenceSelector(0, filmReference.default.length)}}</h1>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  </main>
</template>

<script>
  import MainTop from './MainTop.vue';
  import CardComp from './CardComp.vue';
  import axios from 'axios';
  import QueryTitleComp from './QueryTitleComp.vue';

  export default {
    name: "MainComp",
    components: { MainTop, CardComp, QueryTitleComp },
    data(){
      return{
        apiUrlBase: 'https://api.themoviedb.org/3',
        apiUrlSearch: 'https://api.themoviedb.org/3/search',
        trendingUrl: 'https://api.themoviedb.org/3',
        apiParams:{
          api_key: '1f779dcaa67f2a9b43bc653638990b2f',
          language: 'it-IT',
          query: 'harry potter'
        },
        films: [],
        tvSeries: [],
        movieGenres: [],
        tvGenres: [],
        ImageUrl: 'https://image.tmdb.org/t/p/w500',
        selectedItem: 'all',
        selectedMovieGenre: 'all',
        selectedTVGenre: 'all',
        isLoaded: false,
        filmReference: require('../assets/script/filmReference.js')
      }
    },
    methods:{
      getApi(string){
        axios.get(this.apiUrlSearch + string, {params: this.apiParams})
        .then(response =>{
          if(string === '/movie'){
            this.films = response.data.results;
            console.log('film ricercati', this.films);
            this.isLoaded = true;
          }else{
            this.tvSeries = response.data.results;
            console.log('serieTV ricercate', this.tvSeries);
            this.isLoaded = true;
          }
        })
        .catch(error =>{
          console.log(error);
        })
      },
      getTrending(string){
        axios.get(this.trendingUrl + string + '/popular', {
          params: {
            api_key: this.apiParams.api_key
          }
        })
        .then(response =>{
          if(string === '/movie'){
            this.films = response.data.results;
            console.log('film popolari', this.films);
            this.isLoaded = true;
          }else{
            this.tvSeries = response.data.results;
            console.log('serieTV popolari', this.tvSeries);
            this.isLoaded = true;
          }
        })
        .catch(error =>{
          console.log(error);
        })
      },
      getAllGenreList(string){
      axios.get(`${this.apiUrlBase}/genre${string}/list`, {
        params: {
          api_key: this.apiParams.api_key,
          language: this.apiParams.language
        }
      })
      .then(response =>{
        if(string === '/movie'){
          this.movieGenres = response.data.genres;
          console.log('generi film', this.movieGenres);
        }else{
          this.tvGenres = response.data.genres;
          console.log('generi tv', this.tvGenres);
        }
      })
      .catch(error =>{
        console.log(error);
      })
    },
      queryString(string){
        this.apiParams.query = string;
        this.isLoaded = false
        if(this.apiParams.query === ''){
          this.getTrending('/movie');
          this.getTrending('/tv');
          this.selectedMovieGenre = 'all';
          this.selectedTVGenre = 'all';
        } else{
          this.getApi('/movie')
          this.getApi('/tv')
        }  
      },
      itemSelector(string){
        this.selectedItem = string
      },
      movieGenreSelector(string){
        this.selectedMovieGenre = string
      },
      tvGenreSelector(string){
        this.selectedTVGenre = string
      },
      referenceSelector(min, max){
        return  this.filmReference.default[Math.floor(Math.random() * (max - min + 1) + min)]
      }
    },
    computed:{
      movieWithGenre(){
        let movieCompatiblesGenres = this.films;

        if(this.selectedMovieGenre !== 'all'){
          let selectedGenre = this.movieGenres.filter(genre => genre.name === this.selectedMovieGenre);
          console.log('genere selezionato', selectedGenre[0].id);
          movieCompatiblesGenres = this.films.filter(film => film.genre_ids.includes(selectedGenre[0].id));
          console.log('film con genere selezionato', movieCompatiblesGenres);
        }
        return movieCompatiblesGenres
      },
      tvWithGenre(){
        let tvCompatiblesGenres = this.tvSeries;

        if(this.selectedTVGenre !== 'all'){
          let selectedGenre = this.tvGenres.filter(genre => genre.name === this.selectedTVGenre);
          console.log('genere selezionato', selectedGenre[0].id);
          tvCompatiblesGenres = this.tvSeries.filter(serie => serie.genre_ids.includes(selectedGenre[0].id));
          console.log('serieTv con genere selezionato', tvCompatiblesGenres);
        }
        return tvCompatiblesGenres
      }
    },

    mounted(){
      this.getTrending('/movie');
      this.getTrending('/tv');
      this.getAllGenreList('/movie');
      this.getAllGenreList('/tv');
      console.log('array delle reference', this.filmReference);
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  main{
    background-color: $primary-color;
    min-height: 100vh;
    .container{
      padding-top: 5px;
      display: flex;
      flex-direction: column;
      width: 70%;
      margin: 0 auto;
      .film-cards,
      .tvSeries-cards{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 40px;
      }
      h2{
        color: white;
        margin-bottom: 50px;
      }
    }
    .loading{
      color: red;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: black;
      padding: 10px;
      & *{
        margin-bottom: 10px;
      }
      img{
        margin-bottom: 60px;
        width: 500px;
      }
    }

    // loading
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid red;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: red transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

</style>