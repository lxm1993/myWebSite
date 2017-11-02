<template>
<div class="article-box">
	<div class="home-header">
		<commonHeader ref="header" atindex='3'></commonHeader>
	</div>
	<div class="article-content"> 
	 <tapView ref="tab"></tapView>
     <header>
        <h1>后时代英语</h1>
        <nav>
          <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">活动</a></li>
            <li><a href="#">话题</a></li>
            <li><a href="#">社区</a></li>
          </ul>
        </nav>
      </header>
      <section id="idea">
        <div>
        <h2>后时代英语:</h2>
        <p>“是啊，你说胖子怎么会有爱情。我大概从未有过爱情，除了和你在一起心安理得的做一个饭桶时。”</p>
        </div>
      </section>
      <section id="activity">
        <div class="up">
          <div id="calendar" class="left_part">left_part</div>
          <div id="info" class="right_part">right_part</div>
          <div id="bulletin">
            <h3>公告栏</h3>
            <p>你说胖子怎么会有爱情。我大概从未有过爱情</p>
          </div>
        </div>
        <div class="down">
          <h2>发现活动</h2>
          <div class="act_slides"></div>
        </div>
      </section>
      <section id="post">
          <h3>发现活动</h3>
          <article id="posts">
            <article class="item">
              <figure><img src=""/></figure>
              <div class="header">
                <h4><a href="#"></a>发现活动发现活动</h4>
                <span>作者：Tom<time datetime="2013-10-12 19:03" pubdata>2013-10-12 19:03</time></span>
              </div>
              <div class="body"></div>
              <div class="footer"></div>
            </article>
          </article>
          <aside id="others">你说胖子怎么会有爱情。我大概从未有过爱情</aside>
      </section>
      <footer>
        <ul>
          
        </ul>
        <address></address>
      </footer>
	</div>
</div>
</template>

<script>
require('assets/scss/article.scss');
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
      tapView: require('components/newTab')
  }
}
</script>
