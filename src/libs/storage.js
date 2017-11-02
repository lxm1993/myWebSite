window.xhrfactory.prototype = function() {
	init:function(){
		this.xhr = this.create();

	};
	create:function(){
		var xhr = null;
		if(window.XHLHttpRequest){
			xhr = new XMLHttpRequest();//标准浏览器
		}else if(window.ActiveXobject){
			xhr = new ActiceXobject('Msml.Xmlhttp');//IE

		}else{
			xhr = new ActiveXobject('Microsoft.Xmlhttp');
		}
	};
	readystate:function(callback){
		this.xhr.onreadystatechange = function(){
			if(this.readystate === 4 && this.status === 200){
				callback(this.responseTest);
			}
		}
	};
	para:function(data){
		var datastr = '';
		if(data && Object.prototype.toString.call(data) === '[object object]'){
			for(var i in data){
				for(var i =0;i<length;i++){
					datastr += i+'='+data[i]+'&';
				}
			}
		}
	};
	get：function(url,data,callback){
		this.readystate(callback);
		var newurl = url;
		var datastr = this.para(data);
		newurl = url + '?' + datastr;
		this.xhr.open('get',newurl,true);
		this.xhr.send(null);
	}
}
window.xhrfactory = function(){
	this.init.apply(this,arguments);
}
//本地的SDK主方法
window.mLocalSdk = {
	resourceVersion:'123',
	resourceJsList:[{
		id:'123',
		url:'http://www.baidu.com/aa.js',
		type:'javascript'
	},{
		id:'123',
		url:'http://www.baidu.com/aa.js',
		type:'javascript'
	}],
	needUpdate:(function(){
		return localStorage.getItem('resourceVersion') === resourceVersion;
	})();
	isIE:(function(){
		var v = 1;
		var div = document.createElement('div');
		var all = div.getElementByTagName('i');
		while(div.innnerHTML = '<!-- [if gt IE'+(++v)+']<i></i>'){

		}
	})();//有误
	checkHedge:function(){
		var localStorageLenght = localStorage.length;
		var localStorageSize = 0;
		for(var i=0; i<localStorageLenght;i++){
			var key = localStorage.key(i);
			localStorage += localStorage.getItem(key).length;
		}
	},
	startup: function(){
		if(localStorageSign === 'on' && !IE && window.localStorage){
			if(needUpdate === true){
				return function(){
					for(){
						// XXXXXXX
					}
				}else{
					//save
				}
			}else{
				//原始方法加载js
			}
		}
	}

}