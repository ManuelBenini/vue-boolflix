<template>
  <main>

    <MainTop @userQuery="queryString" @optionChanger="optionSelector" />
    
    <div class="container" v-if="isLoaded">

      <QueryTitleComp title="Film" v-if="selectedOption === 'all' || selectedOption === 'film'" />

      <div class="film-cards" v-if="films.length > 0 && selectedOption === 'all' || selectedOption === 'film'" >
        <CardComp 
          v-for="film in films" 
          :key="film.id" 
          :queryElement="film"
          :elementImageUrl="ImageUrl"
          typeOfSearch="film"
        />
      </div>

      <div v-if="films.length === 0 && (selectedOption === 'all' || selectedOption === 'film')">
        <h2>Non è stato trovato nessun film</h2>
      </div>

      <QueryTitleComp title="Serie TV" v-if="selectedOption === 'all' || selectedOption === 'serieTV'" />

      <div class="tvSeries-cards" v-if="tvSeries.length > 0 && selectedOption === 'all' || selectedOption === 'serieTV'">
        <CardComp 
          v-for="serie in tvSeries" 
          :key="serie.id" 
          :queryElement="serie"
          :elementImageUrl="ImageUrl"
          typeOfSearch="serieTV"
        />
      </div>

      <div v-if="tvSeries.length === 0 && (selectedOption === 'all' || selectedOption === 'serieTV')">
        <h2>Non è stato trovata nessuna serie TV</h2>
      </div>

    </div>

    <div v-else class="loading">
      <h1>{{referenceSelector(0, filmReference.default.length)}}</h1>
      <div class="lds-heart">
        <div>
        </div>
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
        apiUrl: 'https://api.themoviedb.org/3/search',
        trendingUrl: 'https://api.themoviedb.org/3',
        apiParams:{
          api_key: '1f779dcaa67f2a9b43bc653638990b2f',
          language: 'it-IT',
          query: 'harry potter'
        },
        films: [],
        tvSeries: [],
        ImageUrl: 'https://image.tmdb.org/t/p/w500',
        selectedOption: 'all',
        isLoaded: false,
        filmReference: require('../assets/script/filmReference.js')
      }
    },
    methods:{
      getApi(string){
        axios.get(this.apiUrl + string, {params: this.apiParams})
        .then(response =>{
          console.log(response.data);
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
          console.log(response.data);
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
      queryString(string){
        this.apiParams.query = string;
        this.isLoaded = false
        if(this.apiParams.query === ''){
          this.getTrending('/movie');
          this.getTrending('/tv');
        } else{
          this.getApi('/movie')
          this.getApi('/tv')
        }  
      },
      optionSelector(string){
        this.selectedOption = string
      },
      referenceSelector(min, max){
        return  this.filmReference.default[Math.floor(Math.random() * (max - min + 1) + min)]
      }
    },

    mounted(){
      this.getTrending('/movie');
      this.getTrending('/tv');
      console.log(this.filmReference);
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
      color: white;
      text-align: center;
      margin-top: 50px;
    }




        .lds-heart {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
      transform: rotate(45deg);
      transform-origin: 40px 40px;
    }
    .lds-heart div {
      top: 32px;
      left: 32px;
      position: absolute;
      width: 32px;
      height: 32px;
      background: #fff;
      animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .lds-heart div:after,
    .lds-heart div:before {
      content: " ";
      position: absolute;
      display: block;
      width: 32px;
      height: 32px;
      background: #fff;
    }
    .lds-heart div:before {
      left: -24px;
      border-radius: 50% 0 0 50%;
    }
    .lds-heart div:after {
      top: -24px;
      border-radius: 50% 50% 0 0;
    }
    @keyframes lds-heart {
      0% {
        transform: scale(0.95);
      }
      5% {
        transform: scale(1.1);
      }
      39% {
        transform: scale(0.85);
      }
      45% {
        transform: scale(1);
      }
      60% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(0.9);
      }
    }
  }

</style>