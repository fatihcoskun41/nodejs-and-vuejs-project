<template>
  <div class="itemlist">
    
    <div>
 <h3><b>Users Info</b></h3>
   
<div>
    <table  class="table">
      <thead>
        <tr>
          <th @click="sort('_id')" scope="col">_id</th>

          <th @click="sort('id')" scope="col">id</th>

          <th @click="sort('user_id')" scope="col">user_id</th>
          <th @click="sort('IP')" scope="col">Ip</th>
          <th @click="sort('name')" scope="col">Name</th>
          <th @click="sort('timestamp')" scope="col">TimeStamp</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="item in sortedPosts()" :key="item.id">
          <th scope="row">{{ item._id }}</th>
          <th>{{ item.id }}</th>
          <td>{{ item.user_id }}</td>
          <td>{{ item.IP }}</td>
          <td>{{ item.name }}</td>
          <td>{{moment(item.timestamp).format('DD.MM.YYYY [&nbsp;] HH:mm')  }}</td>
        </tr>
      </tbody>
       
    </table>
    

    <VueTailwindPagination
      :current="currentPage"
      :total="total"
      :per-page="perPage"
      @page-changed="pageChange($event)"
    ></VueTailwindPagination>
    </div>
   
</div>
   
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment';
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import "@ocrv/vue-tailwind-pagination/dist/style.css";

export default {
  name: "ItemListPage",
  components: {
    VueTailwindPagination,
  },
  created: function () {
    this.moment = moment;
 
   
   
     
  },
  
  data() {
    return {
      defaultMinId:0,
      changevalue:false,
      defaultMaxıd:18985536000,
      defaultMinDate:moment(0).format('YYYY-MM-DD'),
      defaultMaxDate:moment(1898553600000).format('YYYY-MM-DD'),
      posts: [],
   
      currentPage: 1,
      total: 100,
      perPage: 10,
      date: Date.now(),
      currentSort: "_id",
      currentSortDir: "asc",
    };
  },
  props:
    ['filtered'],
  methods: {
    sort: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    pageChange(pageNumber) {
      this.currentPage = pageNumber;
    this.getData()
    },
     async getData() {
      var response = await axios.get(
        "http://localhost:5000/",{params:{
          minId:this.defaultMinId,
          maxId:this.defaultMaxıd,
          minDate:this.defaultMinDate,
          maxDate:this.defaultMaxDate,
          page:this.currentPage
        }}
        )
      var responsedata = response.data;
      this.posts = responsedata.result
      this.total = responsedata.total;
      this.perPage = responsedata.pagination
     
      
    },
    
     sortedPosts: function () {
       return this.posts.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }); 
      
    }, 
     
  

   
   
 
  },
 
  mounted() {
    this.currentPage = 1;
   this.getData(this)
   
 
  },

  

 

 }
  

</script>

<style scoped>
.itemlist {
  margin-top: 5rem;
}
</style>