<template>
  <div class="container">
  <div class="row">
    <div class="col-2 filter-page">
<filter-page @filteredVal="filteredVal($event)"></filter-page>
<!-- <date-picker-page class="mt-5" @clickDate="filteredDate($event)"></date-picker-page> -->

    </div>
    <div class="col-10 list-page">
 <form-page></form-page>
  <item-list-page  :filtered="val"></item-list-page>

</div>
    </div>
  </div>

</template>

<script>
import FormPage from './FormPage';
import FilterPage from './FilterPage';
import ItemListPage from './ItemListPage'
export default {
    data() {
        return {
             val:[],
        }
    },
    components:{
     FormPage,
    ItemListPage,
    FilterPage,
    },
     methods: {
    filteredVal(val){
      this.changeValue = true
      return this.val=val;     
    },
    
  }

}
</script>

<style>

</style>