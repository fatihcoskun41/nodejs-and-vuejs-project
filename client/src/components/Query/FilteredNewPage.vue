<template>
  <div class="container">
    <div class="row">
       <div class="col-2 filter-page">
<query-filter-page ></query-filter-page>
    </div>
    <div class="col-10 list-page">
       <query-page ></query-page>
     
  </div>
  </div>
  </div>
</template>

<script>


import QueryPage from '../Query/QueryPage'
import QueryFilterPage from './QueryFilterPage.vue'
export default {
  data() {
    return {
       val:[],
    }
  },
  components:{
    QueryPage,
    QueryFilterPage
  },
  

}
</script>

<style>

</style>