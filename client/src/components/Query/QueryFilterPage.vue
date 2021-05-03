<template>
<form>
    <div class="form-group">
  <div>
      <div class="row">
          <div class="col"><input type="text" name="minId" placeholder="Min Id" class="form-control" v-model="minId"></div>
          <div class="col"><input type="text" name="maxId" placeholder="Max Id" class="form-control" v-model="maxId"></div>
         
          
      </div>
      <div>
 <input type="date" v-model="minDate" name="minDate">
 
 
  </div>
  <div>
 <input type="date" v-model="maxDate" name="maxDate">
 
 
  </div>
      <div class="col mt-2">
<button @click="filteredClick()"  class="btn btn-success  ">Filtered</button>
    
      </div>
      
    
    
                   
      
  </div>
  </div>
  </form>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            minId:'',
            maxId:'',
            minDate:null,
            maxDate:null,
            filteredminId:'',
            filteredmaxId:'',
            filteredminDate:'',
            filteredmaxDate:''
        }
    },
    methods: {
        filteredClick(){
       
            
            this.filteredminId = isNaN(parseInt(this.minId))?0:parseInt(this.minId)
            this.filteredmaxId = isNaN(parseInt(this.maxId))?18985536000:parseInt(this.maxId)
           this.filteredminDate=  isNaN(this.minDate)?moment(0).format('YYYY-MM-DD'):this.minDate
           this.filteredmaxDate=  isNaN(this.maxDate)?moment(1899231774000).format('YYYY-MM-DD'):this.maxDate
            
            
            const object = [true,this.filteredminId,this.filteredmaxId,Date.parse(this.filteredminDate)-10800000,Date.parse(this.filteredmaxDate)+(79199000-3600000)]
            // this.$emit('filteredVal',object)
        
           
             this.$router.push({path:'/query',query:{minId:this.filteredminId,maxId:this.filteredmaxId,minDate:this.filteredminDate,maxDate:this.filteredmaxDate}})
           
          
            
            
        
            console.log(object)
           
            
           
            
            
           
            
        },
         
       
    },
}
</script>

<style>

</style>