<template>
<div class="contact-box">
  <div class="home-header">
    <commonHeader ref="header" atindex='4'></commonHeader>
  </div>
  <div class="contact-content"> 
    <router-link :to="{name:'mancheng'}" >mancheng</router-link>
  </div>
</div>
</template>

<script>
require('assets/scss/contact.scss');
export default {
  data () {
    return {
      
    }
  },
  created () {

   
  },
  mounted () {
   
  },
  methods:{
     
   },
   components:{
      commonHeader: require('components/header'),
  }
}
</script>
