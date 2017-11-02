<template>
<div class="slider-box">
	<div class="content" @mouseover="stopAnimation" @mouseout="playAnimation">
		<div class="list">
    		<img :src="imgUrl" v-for="(imgUrl,index) in slideImages" :alt="index"></img>
  		</div>
	    <div class="buttons">
	  		<span  v-for="n in picNum" :index="n" :class="{ 'on': n==index }"  @click.stop="clickBtn(n)"></span>
	    </div>
	    <a href="javascript:;" class="arrow prev" @click="goPrev">&lt;</a>
	    <a href="javascript:;" class="arrow next" @click="goNext">&gt;</a>	
	</div>
</div>
</template>

<script>
export default {
 name:'slider',
  props: {
  	slideImages:{
  		type:Array,
  		default:null
  	}
  },
  data () {
    return {
	  picNum:1,
	  listBox:'',
	  pointBtns:'',
	  picW:1000,
	  index:1,
	  isAnimating:false,
	  timmer:'',
	
    }
  },
  created () {

  },
  mounted () {
  	this.picNum = this.slideImages.length -2;
  	this.listBox = $('.slider-box .list');
  	this.picW = this.listBox.width()/this.slideImages.length;
  	this.playAnimation();
  },
  methods:{
  	goPrev(){
  		this.index -= 1;
  		if(this.index<1){
  			this.index = 5;;
  		}
  		this.animate(this.picW);  			
  	},
  	goNext(){
  		this.index += 1;
  		if(this.index>5){
  			this.index = 1;;
  		}
  		this.animate(-this.picW); 	
  	},
  	animate(offset){
  		if(this.isAnimating){
  			return;
  		}
  		this.isAnimating = true;
  		var changeW = parseInt(this.listBox.css('left'))+offset+'px';
  		changeW = parseInt(changeW);
  		if(changeW > -this.picW){
			this.isAnimating = false;
  			this.listBox.css("left",-this.picNum*this.picW + 'px');

  		}else if(changeW < -this.picNum*this.picW){	
  			this.isAnimating = false;
  			this.listBox.css("left",-this.picW + 'px');

  		}else{
  			var that = this;
  			this.listBox.animate(
	  				{'left':changeW},
	  				100,
	  				"linear",
	  				function(){
	  					that.isAnimating = false;
	  				}
  				)
  		}
  	},
  	playAnimation(){
  		var that =this;
  		this.timmer = setInterval(function(){
  			that.goNext();
  		},2500)
  	},
  	stopAnimation(){
  		clearInterval(this.timmer);
  	},
  	clickBtn(index){
  		this.index = index;
  		this.listBox.css("left",-this.picW*index + 'px');
  	}
  	
  },

}
</script>
