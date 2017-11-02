(function($){
	function Preload(imgs,options){
		this.imgs = (typeof imgs === 'string')?[imgs]:imgs;
		this.opts = $.extend({},Preload.DEFAULTS,options);
		if(this.opts.order==='ordered'){
			this._ordered();
		}else{
			this._unoredered();
		}
	}
	Preload.DEFAULTS={
		order:'unordered',//无序加载
		each:null,//每张图片加载完成后执行
		all:null//所有图片加载完成后执行
	}
	Preload.prototype._oredered = function(){
		var imgs = this.imgs,
		opts = this.opts,
		count =0,
		len = imgs.length;
		$(imgObj).on('load',function(){
			opts.each && opts.each(count);
		if(count >= len){
			//所有图片加载完毕
		 opts.all && opts.all();
		}else{
			load();
		}
		count++;
	});
	imgObj.src = imgs[count];
	};
	Preload.prototype._unoredered = function(){//无序加载
		var imgs = this.imgs,
		opts = this.opts,
		count =0,
		len = imgs.length;

		$each(imgs,function(i,src){
			if(typeof src != 'string') return;
			var imgObj = new Image();

			$(imgObj).on('load',function(){
				opts.each() && opts.each(count);

				if(count >= len-1){
					opts.all && opts.all();

				}
				count++;
				});
			imgObj.src = src;
		});
	};
	// $.fn.extend -> $('img').preload();
	// $extend -> $.preload();
	
	$.extend({
		preload:function(imgs,opts){
			new Preload(imgs,opts);
		}
	})

})($)
//使用
// $.preload(imgs,{
// 	each:function(count){
// 		$progress.html(Math.round((count+1)/len*100)+'%');
// 	},
// 	all:function(){
// 		$('.load').hide();
// 			document.title='1/'+len;
// 	}