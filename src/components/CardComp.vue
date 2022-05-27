<template>
  <div class="flip-card">

    <div class="flip-card-inner">

      <div class="flip-card-front">
        <img v-if="queryElement.poster_path != null" :src="`${elementImageUrl}${queryElement.poster_path}`" alt="immagine queryElement">
        <img v-else src="https://yify-subs.net/images/default_thumbnail.svg" alt="immagine placeholder">
      </div>

      <div class="flip-card-back" v-if="typeOfSearch === 'film' || typeOfSearch === 'serieTV'">
        <h2>{{queryElement.title || queryElement.name}}</h2>

        <p 
          v-if="queryElement.original_title != queryElement.title || 
          queryElement.original_name != queryElement.name"
        >
          titolo originale: {{queryElement.original_title || queryElement.original_name}}
        </p>

        <p 
          v-if="langFlag.default.includes(queryElement.original_language)" 
          class="flag">
          <lang-flag :iso="queryElement.original_language" 
          :squared="false" />
        </p>
        <p v-else>Lingua: {{queryElement.original_language}}</p>

        <p v-if="queryElement.release_date !== '' && queryElement.first_air_date !== '' ">{{queryElement.release_date || queryElement.first_air_date}}</p>
        <p v-else>Data di rilascio non disponibile</p>

        <p v-if="queryElement.vote_average !== 0">Voto: {{queryElement.vote_average}}</p>

        <div class="stars-and-toWatch" v-if="queryElement.vote_average !== 0">
          <div class="stars">
            <i v-for="a in Math.floor(Math.round(queryElement.vote_average)/2)" :key='`a${a}`' class="fa-solid fa-star"></i>
            <i v-if="Math.round(queryElement.vote_average) % 2" class="fa-regular fa-star-half-stroke"></i>
            <i v-for="b in (5 - Math.floor(Math.round(queryElement.vote_average)/2) - (Math.round(queryElement.vote_average) % 2))" :key='`b${b}`' class="fa-regular fa-star"></i>
          </div>

          <div class="toWatch">
            <button 
              :class="{'elementAdded' : toWatchAdded}"
              @click="toWatchAdded = !toWatchAdded , $emit('elementoSelezionato', index)" 
               >Watch list</button>
          </div>
        </div>

        <p v-else>Voto non disponbile</p>

        <div class="cast">
          <button class="castBtn" @click="getActorsApi('/movie', queryElement.id)">cast</button>
          <div class="actors">
            <div class="actor" v-for="actor in firstFiveActors" :key="actor.id">
              <h6>{{actor.name}}</h6>
              <div class="propic">
                <img v-if="actor.profile_path != null" :src="`${elementImageUrl}${actor.profile_path}`" alt="foto attore">
                <img v-else src="https://d3uscstcbhvk7k.cloudfront.net/static/images/slider-placeholder-2x.png" alt="immagine placeholder">
              </div>
            </div>
          </div>
        </div>

        <div class="genres">
          <button class="genreBtn" @click="getGenreList('/movie', queryElement.genre_ids)">generi</button>
          <div class="genre-container">
            <div class="genre" v-for="genre in elementGenres" :key="genre.id">
              <p>-{{genre.name}}</p>
            </div>
          </div>
        </div>

        <div class="description">
          <p v-if="queryElement.overview != ''">{{queryElement.overview}}</p>
          <p v-else>Nessuna descrizione.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CardComp',
  props:{
    queryElement: Object,
    elementImageUrl: String,
    typeOfSearch: String,
    apiUrlBase: String,
    api_key: String,
    language: String,
    index: Number
  },
  data(){
    return{
      firstFiveActors: [],
      elementGenres: [],
      langFlag: require('../assets/script/langFlag.js'),
      toWatchAdded: false,
    }
  },
  methods:{
    getActorsApi(string, id){
      axios.get(`${this.apiUrlBase}${string}/${id}/credits`, {
        params: {
          api_key: this.api_key
        }
      })
      .then(response =>{
        this.firstFiveActors = response.data.cast.filter(actor => actor.order < 5);
        console.log('primi 5 attori', this.firstFiveActors);
      })
      .catch(error =>{
        console.log(error);
      })
    },
    getGenreList(string, elementId){
      axios.get(`${this.apiUrlBase}/genre${string}/list`, {
        params: {
          api_key: this.api_key,
          language: this.language
        }
      })
      .then(response =>{
        this.elementGenres = response.data.genres.filter(genre => elementId.includes(genre.id))
        console.log('generi', this.elementGenres);
      })
      .catch(error =>{
        console.log(error);
      })
    },
  }
}
</script>

<style lang="scss" scoped>

  .flip-card {
    background-color: transparent;
    width: calc(100% / 4 - 10px);
    margin-right: 10px;
    margin-bottom: 10px;
    height: 30vw;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
    cursor: pointer;
  }

  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .flip-card-front {
    background-color: #bbb;
    color: black;
  }

  .flip-card-back {
    display: flex;
    flex-direction: column;
    background-color: rgba($color: #000000, $alpha: 0.6);
    color: white;
    transform: rotateY(180deg);
    padding: 10px;
    overflow: hidden;
    & *{
      margin-bottom: 10px;
    }
    h2{
      font-size: 40px;
      margin-bottom: 10px;
      text-align: center;
    }
    .flag{
      margin-top: 30px;
    }
    .stars-and-toWatch{
      position: relative;
      height: 20px;
      display: flex;
      justify-content: space-between;
      button{
        border: none;
        background-color: rgba($color: #000000, $alpha: 0.8);
        height: 50px;
        width: 50px;
        border-radius: 50%;
        color: white;
        position: absolute;
        right: 0;
        top: -20px;
        cursor: pointer;
      }
      .elementAdded{
        background-color: yellow;
        color: black;
      }
    }
    .cast{
      margin-top: 10px;
      position: relative;
      &:hover .actors{
        display: flex;
        z-index: 30;
      }
      button{
        background-color: rgba($color: #000000, $alpha: 0.5);
        color: white;
        width: 100%;
        font-weight: bold;
      }
      .actors{
        display: none;
        position: absolute;
        top: 20px;
        left: 0;
        border: 1px solid white;
        background-color: rgba($color: #000000, $alpha: 0.8);
        .actor{
          width: calc(100% / 5 - 5px);
          margin-right: 5px;
          h6{
            min-height: 50px;
          }
          .propic{
            height: 150px;
            img{
              object-fit: cover;
            }
          }
        }
      }
    }
    .genres{
      position: relative;
      &:hover .genre-container{
        display: flex;
      }
      button{
        background-color: rgba($color: #000000, $alpha: 0.5);
        color: white;
        width: 100%;
        font-weight: bold;
      }
      .genre-container{
        display: none;
        position: absolute;
        top: 20px;
        left: 0;
        border: 1px solid white;
        background-color: rgba($color: #000000, $alpha: 0.8);
        flex-wrap: wrap;
        & *{
          margin-right: 15px;
          flex-shrink: 0;
          width: calc(100% / 4);
        }
      }
    }
    .description{
      flex-grow: 1;
      overflow-y: scroll;
    }
  }

  img{
    height: 100%;
    width: 100%;
  }

</style>