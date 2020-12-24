<template>
  <div class="container">
    <div class="form -big">
      <div class="form__title">
        Add product
      </div>
      <form action="#" @submit.prevent="submit">
        
        <div class="form__group">
          <label for="title">title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="For example: Iron man suit"
            required
            autofocus
            v-model="form.title"
          />
        </div>
        
        <div class="form__group">
          <label for="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="For example: Los Angeles, CA"
            required
            autofocus
            v-model="form.location"
          />
        </div>
        
        <div class="form__group">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="For example: Iron man suit"
            required
            autofocus
            v-model="form.description"
          />
        </div>
  
        <div class="form__group">
          <label>photos</label>
          <div class="form__files">
            <div v-for="photo in form.photos">
              <img :src="photo" alt="">
            </div>
            
            <label for="upload" class="add-btn">
              <font-awesome-icon icon="plus"/>
              <input
                name="image"
                id="upload"
                type="file"
                accept="image/*"
                @change="addFile($event.target.name, $event.target.files)"
                style="display: none"
              >
            </label>
            
          </div>
        </div>
        
        <div class="form__group">
          <label for="price">Price</label>
          <input
            v-model="form.price"
            id="price"
            type="number"
            name="price"
            placeholder="For example: 200"
            required
            autofocus
          />
        </div>
        
        
        <button type="submit" class="btn btn-large">SUBMIT</button>
        <div v-if="error" class="form__error">{{error}}</div>
      </form>
    </div>
  
  </div>
</template>

<script>
  import firebase from 'firebase/app' ;
  import 'firebase/database';
  import PasswordInput from '@/components/PasswordInput.vue'

  export default {
    components: {
      PasswordInput,
    },
    data() {
      return {
        form: {
          title: '',
          location: '',
          description: '',
          price: '',
          photos: []
        },
        error: null
      };
    },
    methods: {
      submit() {
        //const userId = firebase.auth().currentUser.uid;
        //console.log(userId);
        if(this.form.photos.length == 0){
          this.error = 'Photo require';
          return
        }
        firebase
        .database()
        .ref('products')
        .push(this.form)
        .then(() => {
          this.$router.replace({name: "home"});
        }).catch((error) => {
          console.log(error);
        });
      },
      addFile(fieldName, fileList) {
        if (!fileList.length) return;
        const reader = new FileReader();
        reader.onload = e => {
          this.form.photos.push(e.target.result);
          console.log(this.form.photos)
        };
        reader.readAsDataURL(fileList[0])
      },
    }
  };
</script>