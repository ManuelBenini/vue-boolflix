<template>
  <div class="flip-card">

    <div class="flip-card-inner">

      <div class="flip-card-front">
        <img :src="filmImage" alt="immagine film">
      </div>

      <div class="flip-card-back">
        <h2>Titolo originale: {{filmOriginalTitle}}</h2>
        <span>Titolo tradotto: {{filmTranslatedTitle}}</span>
        <span>Lingua: {{FilmLanguage}}</span>
        <span>Voto: {{FilmValutation}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComp',
  props:{
    filmImage: String,
    filmTranslatedTitle: String,
    filmOriginalTitle: String,
    FilmValutation: Number,
    FilmLanguage: String
  }
}
</script>

<style lang="scss" scoped>

  .flip-card{
    width: calc(100% / 4 - 10px);
    height: 400px;
    perspective: 1000px;
    border: 1px solid black;
    margin-right: 10px;
    margin-bottom: 10px;
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    &:active .flip-card-inner {
      transform: rotateY(180deg);
    }
    .flip-card-front, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    .flip-card-back {
      background-color: grey;
      color: white;
      transform: rotateY(180deg);
    }

    img{
      height: 100%;
      width: 100%;
    }
  }

</style>