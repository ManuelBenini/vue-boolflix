<template>
  <div class="flip-card">

    <div class="flip-card-inner">

      <div class="flip-card-front">
        <img :src="`${filmImageUrl}${film.poster_path}`" alt="immagine film">
      </div>

      <div class="flip-card-back">
        <h2>{{film.title}}</h2>
        <p>{{film.original_title}}</p>
        <p>Lingua: {{film.original_language}}</p>
        <p>Voto: {{film.vote_average / 2}}</p>
        <div class="stars">
          <div class="star" v-if="film.vote_average / 2 > 1" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star" v-if="film.vote_average / 2 >= 1.5 && film.vote_average / 2 < 2"><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>
          <!-- <div class="star" v-else><font-awesome-icon icon="fa-regular fa-star" /></div> -->

          <div class="star" v-if="film.vote_average / 2 > 2" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star" v-if="film.vote_average / 2 >= 2.5 && film.vote_average / 2 < 3" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>
          <!-- <div class="star" v-else><font-awesome-icon icon="fa-regular fa-star" /></div> -->

          <div class="star" v-if="film.vote_average / 2 > 3" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star" v-if="film.vote_average / 2 >= 3.5 && film.vote_average / 2 < 4" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>
          <!-- <div class="star" v-else><font-awesome-icon icon="fa-regular fa-star" /></div> -->

          <div class="star" v-if="film.vote_average / 2 > 4" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <div class="star" v-if="film.vote_average / 2 >= 4.5 && film.vote_average / 2 < 5" ><font-awesome-icon icon="fa-solid fa-star-half-stroke" /></div>
          <!-- <div class="star" v-else><font-awesome-icon icon="fa-regular fa-star" /></div> -->
          
          <div class="star" v-if="film.vote_average / 2 === 5" ><font-awesome-icon icon="fa-solid fa-star" /></div>
          <!-- <div class="star" v-else><font-awesome-icon icon="fa-regular fa-star" /></div> -->
        </div>
        <div class="description">
          <p>{{film.overview}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComp',
  props:{
    film: Object,
    filmImageUrl: String
  }
}
</script>

<style lang="scss" scoped>

  .flip-card{
    width: calc(100% / 4 - 10px);
    height: 30vw;
    perspective: 1000px;
    margin-right: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    &:hover .flip-card-inner {
      transform: rotateY(180deg);
      cursor: pointer;
    }
    .flip-card-front, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    .flip-card-back {
      padding: 10px;
      background-color: grey;
      color: white;
      transform: rotateY(180deg);
      & *{
        margin-bottom: 10px;
      }
      h2{
        font-size: 40px;
        margin-bottom: 10px;
        text-align: center;
      }
      .stars{
        display: flex;
        height: 20px;
      }
      .description{
        height: 200px;
        overflow-y: scroll;
      }
    }

    img{
      height: 100%;
      width: 100%;
    }
  }

</style>