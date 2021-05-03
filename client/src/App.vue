<template>
<div>
  <div>
  <router-link to="/">
  
  </router-link>
<router-link to="/query"> 


</router-link>

  </div>

  <router-view/>
</div>





 
</template>

<script>








export default {
  data() {
    return {

      
    }
  },
  name: 'App',
 
 
}
</script>

<style>
.list-page {
  margin: 0 auto;
  width: 50%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.filter-page{
  margin:20% 0;
  width: 20%;
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
