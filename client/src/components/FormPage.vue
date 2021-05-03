<template>
  <div>
    <h3><b>Users Page</b></h3>

    <form>
      <div class="mb-3">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" />
      </div>
      <button @click="saveData($event)" type="submit" class="btn btn-primary">
        Submit
      </button>
      
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      posts: [],
    };
  },
  methods: {
    saveData(e) {
      if(!this.name){
        e.preventDefault();
        return false;
        
      }
      else{
 axios
        .post("http://localhost:5000/", {
          name: this.name,
        })
        .then((res) => console.log("başarıyla kaydedildi" + res.data))
        .catch((err) => console.log(err));
      }
     

      e.preventDefault();
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 30px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
