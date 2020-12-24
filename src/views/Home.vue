<template>
  <div class="container">
    <div class="products products__container">
      <div class="products__filter">
        <Multiselect
          v-model="location"
          :options="optionsLocation"
        />
        <div class="price-filter">
          <input
            v-model="priceFrom"
            class="filter-input"
            type="number"
            placeholder="Price from (USD)"
            step=".01"
          >
          -
          <input
            v-model="priceTo"
            class="filter-input"
            type="number"
            placeholder="Price to (USD)"
            step=".01"
          >
        </div>
      </div>
      <div class="products__wrapper">
        <SingleCard class="" v-for="product in filteredProducts" :product="product"/>
      </div>
    </div>
  </div>
</template>
<script>
  import SingleCard from '@/components/SingleCard.vue'
  import {mapGetters} from "vuex";
  import firebase from 'firebase/app' ;
  import 'firebase/database';
  import Multiselect from '@vueform/multiselect'

  export default {
    components: {
      SingleCard,
      Multiselect
    },
    data() {
      return {
        products: [],
        location: 0,
        optionsLocation: ['All'],
        priceFrom: '',
        priceTo: ''
      };
    },
    computed: {
      ...mapGetters(['isAuth']),
      filteredProducts(){
        return this.products.filter(el=> {
          let returned = true;
          if( this.location != 0 && this.optionsLocation[this.location] != el.location) {
            returned = false
          }
          
          let from = parseInt(this.priceFrom);
          let to = parseInt(this.priceTo);
          let price = parseInt(el.price);

          if( (from && from > price) || (to && to < price) ) {
            returned = false
          }
          
          return returned;
        });
      }
    },
    mounted() {
      firebase.database().ref('products').once('value').then((snapshot) => {
        
        for (let key in snapshot.val()) {
          this.products.push(snapshot.val()[key]);
        }
        
        this.products.forEach(el=>{
          this.optionsLocation.find(x=> x == el.location) ? '' :
            this.optionsLocation.push(el.location)
        });
        
      });
    }
  };
</script>
<style lang="scss">
  @import '~@vueform/multiselect/themes/default.css';
  
  .products {
    &__container {
      max-width: 855px;
      margin: auto;
      margin-top: 20px;
    }
    &__filter {
      max-width: 100%;
      background-color: white;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.217111);
      border-radius: 4px;
      padding: 12px;
      display: flex;
  
      @media (max-width: 600px) {
        flex-wrap: wrap;
      }
      
      .multiselect {
        width: 280px;
        background: #F9FAFB;
        border: 1px solid #DEDEE0;
        box-sizing: border-box;
        border-radius: 5px;
        height: 40px;
        margin: 0;
  
        @media (max-width: 600px) {
          width: 100%;
          margin: 0 10px;
        }
        
        input {
          border: none;
        }
      }
    }
    &__wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      margin-top: 20px;
      grid-gap: 10px;
  
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @media (max-width: 580px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 420px) {
        grid-template-columns: 1fr;
      }
    }
    .price-filter {
      display: flex;
      align-items: center;
      color: #DEDEE0;
      max-width: 300px;
      margin: 0 10px;
  
      @media (max-width: 600px) {
        margin: 0;
        margin-top: 15px;
      }
      
      .filter-input {
        margin: 0 8px;
        background: #F9FAFB;
        border: 1px solid #DEDEE0;
        box-sizing: border-box;
        border-radius: 5px;
        height: 40px;
        width: 100%;
        padding: 0 8px;
      }
    }
  }
</style>