<template>

<div class="clickable-bar">
  <button>Guarda più tardi</button>
  <div class="popup">

    <div class="card" v-for="(el,index) in elementsAdded" :key="`el${index}`">
      <div class="logo">
        <img v-if="el.poster_path != null" :src="`${ImageUrl}${el.poster_path}`" alt="immagine queryElement">
        <img v-else src="https://yify-subs.net/images/default_thumbnail.svg" alt="immagine placeholder">
      </div>
      <div class="title">
        <h3>{{el.title || el.name}}</h3>
      </div>
    </div>

  </div>
</div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'WatchLaterComp',
  data(){
    return{
      elementsAdded: [],
      ImageUrl: 'https://image.tmdb.org/t/p/w500'
    }
  },
  mounted(){
    axios.get('http://localhost:3000/user1')
    .then(r=>{
      this.elementsAdded = r.data;
      console.log('film da guardare',this.elementsAdded);
    })
  }
}
</script>

<style lang="scss" scoped>

  .clickable-bar{
    height: 40px;
    position: fixed;
    bottom: 0;
    right: 10px;
    width: 14vw;
    text-align: center;
    line-height: 40px;
    transition: all .3s linear;
    cursor: pointer;
    &:focus-within{
      bottom: 80vh;
      right: 10px;
    }
    button{
      width: 100%;
      height: 100%;
      border: 1px solid black;
      background-color: #286dff;
      font-size: 18px;
    }
    .popup{
      color: white;
      height: 78vh;
      overflow-y: auto;
      width: 99%;
      background-color: white;
    }
    .card{
      position: relative;
      height: 150px;
      margin-bottom: 5px;
      transition: all 1s ease;
      .logo{
        height: 100%;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .title{
        position: absolute;
        font-size: 13px;
        line-height: 15px;
        bottom: 0;
        left: 3vw;
        width: 150px;
        color: white;
        background-color: rgba($color: #000000, $alpha: 0.5);
        border: 1px solid black;
      }
      &:hover{
        height: 350px;
      }
    }
  }

</style>