<template>
<div class="commontab-box">
<remote-js src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></remote-js>
	<ul class="tab-nav">
		<li :class="{ 'active': current==index }" v-for="(item,index) in itemList" @click="clickTap(index)"><a href="javascript:;">{{item}}</a></li>
	</ul>
	<div class="content-wrap">
		<div v-for="(item,index) in itemList" :class="['content-item',current==index ? 'cur' : '']">
			<transition-group
			    name="staggered-fade"
			    tag="ul"
			    v-bind:css="false"
			    v-on:before-enter="beforeEnter"
			    v-on:enter="enter"
			    v-on:leave="leave"
		  	>
		    <li
		      v-for="(item, index) in contentItemList"
		      v-bind:key="item"
		      v-bind:data-index="index"
		    >
		    {{ item }}
		    </li>
		    </transition-group>
		</div>
	</div>
</div>
</template>
<script>

export default {
  name:'header',
  data(){
  	return{
  		current:0,
  		contentItemList:['126','23'],
  	}
  },
  props: {
		// current:{
		// 	type:Number,
		// 	default:0,
		// },
		itemList:{
			type:Array,
		    default: function () {
		        return ['诗词','美术','技术','其他']
		      }
		},
		effect:{
			type:String,
			default:'default'
		}
  },
  created () {
  	this.getAtricles(this.itemList[0]);
  },
  mounted () {
  	
  },
  methods:{
  	getAtricles(typename){
  		var that = this;
    	this.axios.get('http://localhost:3002/api/articles/typelist', {
          params: {
            type: typename
          }
        })
        .then(function (response) {
          console.log(response.data)
          that.contentItemList = response.data.data.list;
        })
        .catch(function (error) {
          console.log(error);
        });
  	},
  	clickTap(index){
  		if(index != this.current){
  			this.contentItemList = [];
  			this.getAtricles(this.itemList[index]);
  			this.current = index;
  		}
  	},
  	beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '35px' },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  },
  components: {
  //Vue引入远程JS文件
   'remote-js': {
	    render(createElement) {
	      return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
	    },
	    props: {
	      src: { type: String, required: true },
	    },
  	},
  },

}
</script>
