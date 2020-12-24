<template>
  <div class="card">
    <div class="card__img-wrapper">
      <img class="card__img" :src="product.photos ? product.photos[0] : ''" alt="">
      <div class="card__heart" @click="addToFavourites">
        <font-awesome-icon
          v-if="favourites"
          class="active"
          :icon="['fas', 'heart']"
          size="lg" />
        <font-awesome-icon
          v-else
          :icon="['far', 'heart']"
          size="lg" />
      </div>
    </div>
    
    <div class="card__description">
      {{product.title}}
      <div class="card__price">
        ${{product.price}}
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'SingleCard',
    data() {
      return {
        favourites: false
      };
    },
    props: {
      product: Object
    },
    computed: {},
    methods: {
      addToFavourites() {
        this.favourites = !this.favourites;
      }
    }
  }
</script>
<style lang="scss">
  .card {
    width: 100%;
    background-color: white;
    border: 1px solid #E4E4E4;
    box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.0527344);
    border-radius: 4px;
    padding: 2px;
    font-size: 15px;
    line-height: 17px;
    color: #373738;
    &__img-wrapper {
      position: relative;
    }
    &__img {
      height: 150px;
      object-fit: cover;
      border-radius: 4px 4px 0px 0px;
    }
    &__description {
      padding: 12px;
    }
    &__price {
      font-size: 18px;
      line-height: 21px;
      color: #101010;
      margin-top: 7px;
      font-weight: bold;
    }
    &__heart {
      width: 30px;
      height: 30px;
      position: absolute;
      bottom: -15px;
      right: 4px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.163407);
      cursor: pointer;
      
      .active {
        color: #349A89;
      }
    }
  }
</style>