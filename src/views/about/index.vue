<template>
<div class="about-box">
  <div class="home-header">
    <commonHeader ref="header" atindex='2'></commonHeader>
  </div>

  <div class="about-content">
    <div class="content-left">
      <div class="title">嗨~大家好，我的名字是。。。</div>
      <div class="description">
        <pre>
          记得早先少年时 
          大家诚诚恳恳 
          说一句 是一句 
          　　 
          清早上火车站 
          长街黑暗无行人 
          卖豆浆的小店冒着热气 
          　　 
          从前的日色变得慢 
          车，马，邮件都慢 
          一生只够爱一个人 
          　　 
          从前的锁也好看 
          钥匙精美有样子 
          你锁了 人家就懂了 
        </pre>
      </div>
    </div>
    <div class="content-right"></div>
  </div>

  <div class="photo-content">
    <photoSlider ref="photo" :photoList='photoList'></photoSlider>
  </div>
</div>
</template>

<script>
require('assets/scss/about.scss');
var testImg = require('assets/images/pic1.png'),
sliderImg1 = require('assets/images/slider/1.png'),
sliderImg2 = require('assets/images/slider/2.png'),
sliderImg3 = require('assets/images/slider/3.png'),
sliderImg4 = require('assets/images/slider/4.png'),
sliderImg5 = require('assets/images/slider/5.png');
export default {
  data () {
    return {
      photoList:[[sliderImg5,sliderImg1,sliderImg2,sliderImg3],[sliderImg4,sliderImg5,sliderImg1,sliderImg5]]

    }
  },
  created () {
    
  },
  mounted () {

  },
  methods:{

     
   },
    
  components:{
      commonHeader: require('../../components/header'),
      photoSlider: require('../../components/photoTransform'),

  }
}
</script>
