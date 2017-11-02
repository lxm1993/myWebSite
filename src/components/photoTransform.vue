<template>
<div class="photo-box">
	<ul>
		<li v-for="(photo,index) in photoList[0]"><img :src="photo" /></li>
	</ul>
	<a href="javascript:;" class="arrow prev" @click="goPrev">&lt;</a>
	<a href="javascript:;" class="arrow next" @click="goNext">&gt;</a>
	<h2>啦啦啦。。。</h2>	
</div>
</template>

<script>
//require('libs/jquery.transform-0.9.1.min.js');
export default {
  name:'photo',
  data () {
    return {
	  btnLeft:null,
	  btnRight:null,
	  imgList:null,
	  imgAll:null,
      imgArrIndex:0,
      origin:'160px 200px',
      imgOrign : '140px 700px',
      imgAng : 45,
      imgTime : 100,//初始时间
      rotating : false,//初始旋转状态
      autoTime : null,//存储定时器
      autoInterval : 3000//自动播放时间间隔
	
    }
  },
  props: {
  	photoList:{
  		type:Array,
  		default:null
  	},
  	
  },
  created () {
  	
  },
  mounted () {
  		 this.bthLeft = $('.photo-box .prev');
         this.btnRight = $('.photo-box .next');
         this.imgList = $('.photo-box ul li');
         this.imgAll = this.creteImg(this.photoList);
         console.log(this.imgAll);
         this.initPosition();
         this.autoGo(1);
  },
  
  methods:{
	  	goPrev(){
	  		this.anigo(-1);
	  	},
	  	goNext(){
	  		this.anigo(1);
	  	},
	  	initPosition(){
	  		var ang = 8,
	  			aint = -8;
	  		this.imgList.css('transform-origin', this.origin);
	  		this.imgList.each(function(i){
	        		var $this = $(this),
	        		rotateDeg = aint+(i*ang)+'deg'
	        		$this.css('transform', 'rotate('+rotateDeg+')');


	        	});
	  	},
	  	autoStop(){
	  		 clearInterval(this.autoTime)
	  	},
	  	autoGo(){
	  		var that =this;
	  		 clearInterval(this.autoTime);
	         this.anigo(1);
	         this.autoTime = setInterval(function(){
	            that.anigo(1);
	         },this.autoInterval)
	  	},
	  	creteImg(arr){
	  		var imgArr = [];
	        for(var i in arr){
	            imgArr[i] = [];
	            for(var j in arr[i]){
	                imgArr[i][j] = new Image();
	                imgArr[i][j].src = arr[i][j];
	            }
	        }
	        return imgArr;
	  	},
	  	anigo(d){
	  		var that = this;
	  		if(this.rotating) return false;//若动画在执行直接return
	        this.rotating = true;
	        this.imgArrIndex+=d;
	        if(this.imgArrIndex>this.imgAll.length-1){
	            this.imgArrIndex = 0;
	        }else if (this.imgArrIndex<0) {
	            this.imgArrIndex = this.imgAll.length-1;
	        };
	        this.imgList.each(function(i){
	            var $thisItem = $(this);//遍历出的li
	            var $thisimg = $thisItem.children("img");//li 下面原始img
	            var $targetImg=$(that.imgAll[that.imgArrIndex][i]);//取出图片
	            var thisTime=(d===1)?that.imgTime*i:that.imgTime*(that.imgList.length-1-i);//往右转i=3的延迟时间最长，往左转i=0的延迟时间最长；
	            $thisItem.append($targetImg);//替换图片
	            $thisimg.css('transform-origin', this.imgOrign);
	            $targetImg.css('transform-origin', this.imgOrign);
	            $targetImg.css('transform', 'rotate('+(0-d)*that.imgAng+')');

	            setTimeout(function() {
	                $thisimg.animate({rotate:that.imgAng*d + "deg"});
	                $targetImg.animate({rotate:"0deg"},500,function(){
	                    $thisimg.remove();
	                    if(thisTime==((that.imgList.length-1)*that.imgTime)){
	                        that.rotating = false;
	                    }
	                });
	            },thisTime)    
	        })
	  	}
      

	}
}
</script>
