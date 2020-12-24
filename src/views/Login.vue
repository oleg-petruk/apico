<template>
  <div class="container">
    <div class="form
">
      <div class="form__title">
        Login
      </div>
      <form action="#" @submit.prevent="submit">
        
        <div class="form__group">
          <label for="email">EMAIL</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Example@gmail.com"
            required
            autofocus
            v-model="form.email"
          />
        </div>
  
        <div class="form__group">
          <label for="password" class="col-md-4 col-form-label text-md-right">PASSWORD</label>
          
          <PasswordInput
            v-model="form.password"
            :id="'password'"
            :name="'password'"
          />
          
        </div>
        
        <button type="submit" class="btn btn-large">Continue</button>
        <div v-if="error" class="form__error">{{error}}</div>
      </form>
    </div>
    <div class="form form-footer">
      I have no account,
      <router-link class="link" to="/register">REGISTER NOW</router-link>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app' ;
  import 'firebase/auth';
  import PasswordInput from '@/components/PasswordInput.vue'

  export default {
    components: {
      PasswordInput,
    },
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        error: null
      };
    },
    methods: {
      submit() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({name: "home"});
        })
        .catch(err => {
          this.error = err.message;
        });
      }
    }
  };
</script>