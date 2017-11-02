<template>
<div id="app">
<div class="home-header">
  <commonHeader ref="header"  atindex='1'></commonHeader>
  <div class="header-bloger">
    <img src="../../assets/images/nameblog.png"></img>
  </div>
</div>
<sliderView ref="slider" v-bind:slideImages='sliderImgList'></sliderView>
<div class="content-box">
  <div v-for="(imgUrl,index) in listItems" class="single">
    <div  :class="['picture',index%2==0 ? 'left' : 'right']">
      <img :src="testImge" />
    </div>
    <div :class="['text-content',index%2==0 ? 'left' : 'right']">
      <div class="title">闲话古诗词</div>
      <p class="description">
            天涯也有江南信，梅破知春近。夜阑风细得香迟，不道晓来开遍向南枝。</br>
            玉台弄粉花应妒，飘到眉心住。平生个里愿怀深，去过十年老尽少年心。
      </p>
      <router-link :to="{name:'article'}" class="more-btn">更多古诗词>></router-link>
    </div>
  </div>
</div>
<div class="footer-box"></div>
</div>
</template>

<script>
require('assets/scss/home.scss');
var testImg = require('assets/images/pic1.png'),
sliderImg1 = require('assets/images/slider/1.png'),
sliderImg2 = require('assets/images/slider/2.png'),
sliderImg3 = require('assets/images/slider/3.png'),
sliderImg4 = require('assets/images/slider/4.png'),
sliderImg5 = require('assets/images/slider/5.png');

export default {
  data () {
    return {
      sliderImgList:[sliderImg5,sliderImg1,sliderImg2,sliderImg3,sliderImg4,sliderImg5,sliderImg1],
      listItems:['','',''],
      testImge:testImg
      //userName:'',
      //age:''
    }
  },
  created () {
    // var that = this;
    // this.axios.get('http://localhost:3002/api/home/list', {
    //       params: {
    //         ID: 12345
    //       }
    //     })
    //     .then(function (response) {
    //       console.log(response.data.data)
    //       that.userName = response.data.data.username;
    //       that.age = response.data.data.age;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
  },
  mounted () {

  },
  methods:{
     
  },
  components: {
            commonHeader: require('components/header'),
            sliderView: require('components/slider')
        }
}
</script>
