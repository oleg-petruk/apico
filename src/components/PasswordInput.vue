<template>
  <div class="pass-input-wrapper">
    <input
      :id="id"
      :type="view ? 'text' : 'password'"
      name="password"
      required
      v-model="value"
      minlength="6"
    />
    <div class="pass-icon" @click="togleView">
      <font-awesome-icon v-if="view" :icon="['far', 'eye-slash']"/>
      <font-awesome-icon v-else :icon="['far', 'eye']"/>
    </div>
  
  </div>

</template>
<script>
  export default {
    name: 'PasswordInput',
    data() {
      return {
        view: false
      }
    },
    props: {
      modelValue: String,
      id: String,
      name: String,
    },
    computed: {
      value: {
        get () { return this.modelValue },
        set (value) { this.$emit('update:modelValue', value) },
      },
    },
    methods: {
      togleView() {
        this.view = !this.view;
      }
    }
  };
</script>
<style lang="scss">
  .pass-input-wrapper {
    position: relative;
    
    input {
      padding-right: 40px;
    }
  
    .pass-icon {
      position: absolute;
      top: calc(50% - 9px);
      right: 15px;
      cursor: pointer;
    }
  }
</style>