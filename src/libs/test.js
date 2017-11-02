var Zepto = (function(){
	var $,
		zepto = {},

	zepto.Z = function(dom,selector) {
		dom = dom || [];
		dom.__proto__ = $.fn;
		dom.selector = selector || '';
		return dom;

	}
	zepto.init = function(selector,context) {
		var dom;
		//针对参数情况分别进行dom赋值
		return zepto.Z(dom,selector);

	}

	$ = function(selector,context) {
		return zepto.init(selector,context);
	}
	$.fn = {
		//里面书写若干工具函数
	}
})()
window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto)
