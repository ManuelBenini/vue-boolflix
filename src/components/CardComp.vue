<template>
  <div class="flip-card">

    <div class="flip-card-inner">

      <div class="flip-card-front" >
        <img v-if="queryElement.poster_path != null" :src="`${elementImageUrl}${queryElement.poster_path}`" alt="immagine queryElement">
        <img v-else src="https://yify-subs.net/images/default_thumbnail.svg" alt="immagine placeholder">
      </div>

      <div class="flip-card-back" v-if="typeOfSearch === 'film'">
        <h2>{{queryElement.title}}</h2>
        <p v-if="queryElement.original_title != queryElement.title">titolo originale: {{queryElement.original_title}}</p>
        <p v-if="queryElement.original_language != '' " class="flag">
          <lang-flag :iso="queryElement.original_language" 
          :squared="false" />
        </p>
        <p v-else>La lingua non è disponibile</p>
        <p>Voto: {{queryElement.vote_average / 2}}</p>
        <div class="stars">
          <div class="star star-1" v-if="queryElement.vote_average / 2 > 1" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-1" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
          <div class="star star-2" v-if="queryElement.vote_average / 2 >= 1.5 && queryElement.vote_average / 2 < 2"><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>

          <div class="star star-2" v-if="queryElement.vote_average / 2 > 2" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-2" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
          <div class="star star-3" v-if="queryElement.vote_average / 2 >= 2.5 && queryElement.vote_average / 2 < 3" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>

          <div class="star star-3" v-if="queryElement.vote_average / 2 > 3" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-3" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
          <div class="star star-4" v-if="queryElement.vote_average / 2 >= 3.5 && queryElement.vote_average / 2 < 4" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>

          <div class="star star-4" v-if="queryElement.vote_average / 2 > 4" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-4" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
          <div class="star star-5" v-if="queryElement.vote_average / 2 >= 4.5 && queryElement.vote_average / 2 < 5" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>
          
          <div class="star star-5" v-if="queryElement.vote_average / 2 === 5" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-5" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
        </div>
        <div class="description">
          <p v-if="queryElement.overview != ''">{{queryElement.overview}}</p>
          <p v-else>Nessuna descrizione.</p>
        </div>
      </div>

      <div class="flip-card-back" v-if="typeOfSearch === 'serieTV'">
        <h2>{{queryElement.name}}</h2>
        <p v-if="queryElement.original_name != queryElement.name">titolo originale: {{queryElement.original_name}}</p>
        <p v-if="queryElement.original_language != '' " class="flag">
          <lang-flag :iso="queryElement.original_language" 
          :squared="false" />
        </p>
        <p v-else>La lingua non è disponibile</p>
        <p>Voto: {{queryElement.vote_average / 2}}</p>
        <div class="stars">
          <div class="star star-1" v-if="queryElement.vote_average / 2 > 1" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-1" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
          <div class="star star-2" v-if="queryElement.vote_average / 2 >= 1.5 && queryElement.vote_average / 2 < 2"><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>

          <div class="star star-2" v-if="queryElement.vote_average / 2 > 2" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-2" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
          <div class="star star-3" v-if="queryElement.vote_average / 2 >= 2.5 && queryElement.vote_average / 2 < 3" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>

          <div class="star star-3" v-if="queryElement.vote_average / 2 > 3" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-3" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
          <div class="star star-4" v-if="queryElement.vote_average / 2 >= 3.5 && queryElement.vote_average / 2 < 4" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>

          <div class="star star-4" v-if="queryElement.vote_average / 2 > 4" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-4" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
          <div class="star star-5" v-if="queryElement.vote_average / 2 >= 4.5 && queryElement.vote_average / 2 < 5" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>
          
          <div class="star star-5" v-if="queryElement.vote_average / 2 === 5" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star star-5" v-else><font-awesome-icon icon="fa-regular fa-star" /></div>
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
export default {
  name: 'CardComp',
  props:{
    queryElement: Object,
    elementImageUrl: String,
    typeOfSearch: String
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
    .stars{
      position: relative;
      height: 20px;
      .star{
        position: absolute;
      }
      .star-1{
        left: 0px;
      }
      .star-2{
        left: 20px;
      }
      .star-3{
        left: 40px;
      }
      .star-4{
        left: 60px;
      }
      .star-5{
        left: 80px;
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