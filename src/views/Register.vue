<template>
  <div class="container">
    
    <div class="form">
      <div class="form__title">
        Register
      </div>
      
      <form action="#" @submit.prevent="submit">
        <div class="form__group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autofocus
            v-model="form.email"
          />
        </div>
        
        <div class="form__group">
          <label for="name">full name</label>
          <input
            id="name"
            type="name"
            name="name"
            minlength="6"
            required
            autofocus
            v-model="form.name"
          />
        </div>
        
        <div class="form__group">
          <label for="password">Password</label>
          <PasswordInput
            v-model="form.password"
            :id="'password'"
            :name="'password'"
          />
        </div>
  
        <div class="form__group">
          <label for="password_again">password again</label>
          <PasswordInput
            v-model="form.password_again"
            :id="'password_again'"
            :name="'password_again'"
          />
        </div>
        
        <button type="submit" class="btn btn-large">Register</button>
        <div v-if="error" class="form__error">{{error}}</div>
      </form>
    </div>
  
    <div class="form form-footer">
      I already have an account,
      <router-link class="link" to="/login">LOG IN</router-link>
    </div>
  
  </div>
</template>


<script>
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import PasswordInput from '@/components/PasswordInput.vue'

  export default {
    components: {
      PasswordInput,
    },
    data() {
      return {
        form: {
          name: "",
          email: "",
          password: "",
          password_again: "",
        },
        error: null
      };
    },
    methods: {
      submit() {
        if(this.form.password != this.form.password_again){
          this.error = 'Password mismatch';
          return
        }
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
          .updateProfile({
            displayName: this.form.name
          })
          .then(() => {
            this.$router.replace({name: "home"});
          });
        })
        .catch(err => {
          this.error = err.message;
        });
      }
    }
  };
</script>