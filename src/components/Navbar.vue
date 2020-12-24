<template>
  
  <header class="header" :class="theme">
    <div class="container">
      <router-link to="/">
        <div class="logo"/>
      </router-link>
      
      <div ref="menu" class="mobile-menu">
        <a href="#" class="hamburger" @click.prevent="mobileMenu = !mobileMenu" >
          <font-awesome-icon v-if="mobileMenu" icon="times" size="lg" />
          <font-awesome-icon v-else icon="bars" size="lg" />
        </a>
        
        <div v-show="!isMobile || mobileMenu" class="header__links">
          <router-link v-if="isAuth" to="/add" class="btn btn-small ">+ ADD</router-link>
          <router-link v-if="!isAuth" to="/login">LOGIN</router-link>
          <a v-else href="#" @click.prevent="signOut">LOGOUT</a>
          <router-link to="/favourites">
            <font-awesome-icon :icon="['far', 'heart']" size="lg" />
          </router-link>
        </div>
      </div>
      
    </div>
  </header>

</template>
<script>

  import firebase from 'firebase/app';
  import 'firebase/auth';
  import {mapGetters} from 'vuex';

  export default {
    name: 'Navbar',
    components: {},
    data() {
      return {
        mobileMenu: false,
        isMobile: false
      };
    },
    props: {
      theme: {
        type: String,
        default: 'light'
      }
    },
    computed: {
      ...mapGetters(['isAuth'])
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize(){
        this.mobileMenu = false;
        this.isMobile = window.innerWidth <= 992 ? true : false;
      },
      signOut() {
        firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
      }
    }
  }
</script>
<style lang="scss">
  .header {
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 18px;
      padding-bottom: 18px;
    }
    .logo {
      width: 100px;
      height: 40px;
      background: url('~@/assets/img/logofull_dark.png') center no-repeat;
      background-size: contain;
    }
    
    a {
      font-size: 12px;
      color: #2B2B2B;
      text-decoration: none;
    }
    
    &.dark {
      background: linear-gradient(180deg, #090810 0%, #171236 100%);
      .logo {
        background: url('~@/assets/img/logofull_white.png') center no-repeat;
        background-size: contain;
      }
      a {
        color: white;
      }
  
      .header__links a {
        @media (max-width: 992px) {
          color: #2B2B2B;
        }
      }
    }
    
    &__links {
      display: flex;
      align-items: center;
      a:not(:last-child) {
        margin-right: 20px;
      }
  
      @media (max-width: 992px) {
        position: absolute;
        top: 100%;
        right: 0;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 15px;
        background: white;
        box-shadow: 0px 2px 42px rgba(0, 0, 0, 0.111233);
        border-radius: 7px;
  
        a:not(:last-child)  {
          width: 70px;
          margin-right: 0;
          margin-bottom: 15px;
        }
      }
    }
    
    .mobile-menu {
      position: relative;
      .hamburger {
        display: none;
        
        @media (max-width: 992px) {
          display: block;
        }
      }
      
    }
  }
</style>