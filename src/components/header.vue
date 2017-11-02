<template>
<div class="header-box">
	<div class="header-top">
		<div class="header-left">
				<ul>
				    <li><router-link :to="{name:'home'}" :class="{ 'active': '1'==atindex }" >Home</router-link></li>
				    <li><router-link :to="{name:'about'}" :class="{ 'active': '2'==atindex }" >About Me</router-link></li>
				    <li><router-link :to="{name:'article'}" :class="{ 'active': '3'==atindex}">Articles</router-link></li>
				    <li><router-link :to="{name:'contact'}" :class="{ 'active': '4'==atindex}">Contact Me</router-link></li>
				 </ul>
		</div>
		<div class="header-right" >
				<img src="../assets/images/topheart.png"></img>
		</div>
</div>
</div>
</template>

<script>
export default {
  name:'header',
  props: {
  		
		atindex:''
  },
  created () {
  	
  },
  mounted () {
  	// var that = this;
  	// $('.header-left ul').on('click','li a',function(){
  	// 	console.log($(this).attr('index'));
  	// 	that.index=$(this).attr('index');
  	// })

  },
  methods:{
  	// clickIndex(indexNum){
  		
  	// 	this.index=indexNum;

  	// }
  }

}
</script>
