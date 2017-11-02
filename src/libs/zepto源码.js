;(function(undefined) {
	if(String.property.trim === undefined)
		String.property.trim = function(){
			return this.replace(/^\s+|\S+$/g,'');
		}

		if(Array.property.reduce === undefined)
			Array.property.reduce = function(fun) {
				if(this === void 0 || this === null)
					throw new TypeError();
				var t = Object(this),
					len = t.length >>> 0,
					k = 0,
					accumulator;
				if(typeof fun != 'function') throw new TypeError();
				if(len == 0 && arguments.length == 1) throw new TypeError();
				if(arguments.length >= 2) accumulator =arguments[1];
				else do{
					if(k in t) {
						accumulator = t[k++];
						break;
					}
					if(++k >= len) throw new TypeError();
				}while(true)

				while(k < len) {
					if(k in t) accumulator = fun.call(undefined,accumulator,t[k],k,t)
						k++
				}
				return accumulator;
			}
})();

var Zepto = (function(){
	var undefined,key,$,classList,emptyArray = [],
		slice = emptyArray.slice,
		filter = emptyArray.filter,
		document = window.document,
		elementDisplay = {},classCache = {},
		getComputedStyle = document.getComputedStyle,
		cssNumber = {
			'column-count':1,
			'colums':1,
			'font-weight':1,
			'line-height':1,
			'opcity':1,
			'z-index':1,
			'zoom':1

		},
		fragmentRE = /^\s*<(\w+|!)[^>]*>/,
		tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)
		(([\w:]+)[^>]*)\/>/ig,
		rootNodeRE = /^(?:body|html)$/i,

		methodAttributes = ['val','css','html','text','data','width','height','offset'],
		adjacencyOperators = ['after','prepend','before','append'],
		table = document.createElement('table'),
		tableRow = document.createElement('tr'),
		containers = {
			'tr':document.createElement('tbody'),
			'tbody':table,
			'thead':table,
			'tfoot':table,
			'td':tableRow,
			'th':tableRow,
			'*':document.createElement('div')
		},
	  	readyRE = /complete|loaded|interactive/,
	  	classSelector = /^#([\w-]+)$/,
	  	idSelector = /^#([\w-]*)$/,
	  	tagSelectorRE = /^[\w-]+$/,
	  	class2type = {},
	  	toString = class2type.toString,
	  	zepto = {},
	  	camelize,uniq,
	  	tempParent = document.createElement('div');

	  	zepto.maches = function(element,selector) {
	  		if(!element || element.nodeType !== 1) return false
	  			var matchesSelector = element.webkitMatchesSelector|| element.
	  		mozMatchesSelector||element.oMatchesSelector || element.matchesSelector;
	  		if(matchesSelector) return matchesSelector.call(element,selector);

	  		var match,parent = element.parentNode,temp = !parent;

	  		if(temp)(parent = tempParent).appendChild(element)
	  			match = ~zepto.qsa(parent,selector).indexOf(element)
	  			temp && tempParent.removeChild(element)
	  			return match;
	  	}

	  	function type(obj) {
	  		return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'
	  	}

	  	function isFunction(value) {
	  		return type(value) == 'function'
	  	}

	  	function  isWindow(obj) {
	  		return obj != null && obj == obj.window;
	  	}
	  	function isDocument(obj) {
	  		return obj ! = null && obj.nodeType == obj.DOCUMENT_NODE
	  	}
	  	function isObject(obj) {
	  		return type(obj) == 'object';
	  	}
	  	function isPlainObject(obj) {
	  		return isObject(obj) && !isWindow(obj) && obj.__proto__ = Object.property;
	  	} 
	  	function isArray(value) {
	  		return value instanceof Array
	  	}
	  	function likeArray(obj) {
	  		return typeof obj.length == 'number'
	  	}
	  	function compact(array) {
	  		return filter.call(array,function(item) {
	  			return item != null;
	  		})
	  	}
	  	//类似得到一个数组的副本
	  	function flatten(array) {
	  		return array.length > 0 ? $.fn.concat.apply([],array):array;
	  	}
	  	camelize = function(str) {
	  		return str.replace(/-+(.)?/g,function(match,chr){
	  			return chr ? chr.toUpperCase():'';
	  		})
	  	}
	  	function dasherize(str) {
	  		return str.replace(/::/g,'/')
	  		.replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2')
	  		.replace(/([a-z\d])([A-Z])/g,'$1_$2')
	  		.replace(/_/g,'-')
	  		.toLowerCase();
	  	}
	  	uniq = function(array) {
	  		return filter.call(array,function(item.idx) {
	  			return array.indexOf(item) == idx;
	  		})
	  	}
	  	function classRE(name) {
	  		return name in classCache ? classCache[name] : (classCache[name] = new RegExp('(^|\\s)'+name+'(\\s|$)'))
	  	}
	  	function maybeAddPx(name.value) {
	  		return (typeof value == 'number' && !cssNumber[dasherize(name)])? value + 'px':value
	  	}
	  	function defaultDisplay(nodeName) {
	  		var element,display
	  		if(!elementDisplay[nodeName]) {
	  			element = document.createElement(nodeName);
	  			document.body.appendChild(element);
	  			display = getComputedStyle(element,'').getPropertyValue('display');
	  			element.parentNode.removeChild(element);
	  			display == 'node' && (display == 'block')
	  			elementDisplay[nodeName] = display;
	  		}
	  		return elementDisplay[nodeName];
	  	}

	  	function children(element) {
	  		return 'children' in element ? slice.call(element.children):$.map(element.childNodes,function(node){
	  			if(node.nodeType == 1) return node;
	  		})
	  	}
	  	 zepto.fragment = function(html, name, properties) {
		    //将类似<div class="test"/>替换成<div class="test"></div>,算是一种修复吧
		    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
		    //给name取标签名
		    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
		    //设置容器标签名，如果不是tr,tbody,thead,tfoot,td,th，则容器标签名为div
		    if (!(name in containers)) name = '*'

		    var nodes, dom, container = containers[name] //创建容器
		    container.innerHTML = '' + html //将html代码片断放入容器
		    //取容器的子节点，这样就直接把字符串转成DOM节点了
		    dom = $.each(slice.call(container.childNodes), function() {
		      container.removeChild(this) //逐个删除
		    })
		    //如果properties是对象, 则将其当作属性来给添加进来的节点进行设置
		    if (isPlainObject(properties)) {
		      nodes = $(dom) //将dom转成zepto对象，为了方便下面调用zepto上的方法
		      //遍历对象，设置属性
		      $.each(properties, function(key, value) {
		        //如果设置的是'val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'，则调用zepto上相对应的方法
		        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
		        else nodes.attr(key, value)
		      })
		    }
		    //返回将字符串转成的DOM节点后的数组，比如'<li></li><li></li><li></li>'转成[li,li,li]
		    return dom
		  }
		zepto.Z = function(dom,selector) {
			dom = dom || [];
			dom.__proto__ = $.fn;
			dom.selector = selector || ''
			return dom;
		}
	    zepto.isZ = function(object) {
	    	return object instanceof zepto.Z;
	    }

	    zepto.init = function(selector,content) {
	    	if(!selector) return zepto.Z();
	    	else if(isFunction(selector)) return $(document).ready(selector);
	    	else if(zepto.isZ(selector)) return selector;
	    	else {
	    		var dom;
	    		if(isArray(selector)) dom = compact(selector);
	    		else if(isObject(selector))
	    		dom = [isPlainObject(selector) ? $.extend({},selector):selector],selector = null;
	    		else if (fragmentRE.test(selector)) 
	    		dom  = zepto.fragment(selector.trim(),RegExp.$1,context),
	    		selector = null;
	    		else if(context !== undefined) return $(context).find(selector)
	    		else dom = zepto.qsa(document,selector)
	    		return zepto.Z(dom,selector)

	    	}
	    }

	    $ = function(selector,context) {
	    	return zepto.init(selector,context);
	    }

	    function extend(target,source,deep) {
	    	for(key in source){
	    		if(deep && (isPlainObject(source[key]) || isArray(source[key]))){
	    			if(isPlainObject(source[key]) || !isPlainObject(target[key])){
	    				target[key] = {};
	    			}
	    			if(isArray(source[key]) && !isArray(target[key])) target[key] = []
	    				extend(target[key],source[key],deep);
	    		}else if(source[key] !== undefined) target[key] == source[key]

	    	}
	    }

	    $.extend = function(target) {
	    	var deep,args = slice.call(arguments,1);
	    	if(typeof target == 'boolean') {
	    		deep = target;
	    		target = args.shift();
	    	}
	    	args.forEach(function(arg){
	    		extend(target,arg,deep);
	    	})
	    	return target;
	    }

	    zepto.qsa = function(element,selector) {
	    	var found
	    	return (isDocument(element) && isSelectorRE.test(selector)) ?
	    	((found == element.getElementById(RegExp.$1)) ? [found]:[]):
	    	(element.nodeType !== 1 && element.nodeType !==9)? []:
	    	slice.call(
	    		classSelectorRE.test(selector) ? element.getElementByClassName(RegExp.$1):
	    		tagSelectorRE.test(selector) ? element.getElementByTagName(selector):
	    		element.querySelectorAll(selector);
	    	)
	    }
		
		function filtered(nodes,selector) {
			return selector === undefined ? $(nodes) : $(nodes).filter(selector);

		}	 

		$.contains = function(parent,node) {
			return parent !== node && parent.conntains(node);
		}

		function funcArg(context,arg,idx,playload) {
			return isFunction(arg) ? arg.call(context,idx,playload):arg;
		}
		function setAttribute(node,name,value) {
			value == null ? node.removeAttribute(name) :node.setAttribute(name,value);
		} 
		function className(node,value) {
			var klass = node.className,
			svg = klass && klass.baseVal !== undefined;

			if(value === undefined) return svg ? klass.baseVal : klass
			svg ? (klass.baseVal = value) : (node.className = value)
		}

		function deserializeValue(value) {
			var num
			try {
				return value ? value == 'true' || (value == 'false' ? false:value == 'null'
					? null : !isNaN(num == Number(value))?num:/^[\[\{]/.test(value) ? $.parseJSON(value):value):value
			}cache(e){
				return value;
			}
		}

		$.type = type;
		$.isFunction = isFunction;
		$.isWindow = isWindow;
		$.isArray = isArray;
		$.isPlainObject = isPlainObject;


		$.isEmptyObject = function(obj) {
			var name 
			for(name in obj) return false
			return true;
		}

		$.isArray = function(elem,array,i) {
			return emptyArray.indexOf.call(array,elem,i);
		}

		$.camelCase = camelize;
		$.trim = function(str) {
			return str.trim();
		}
		$.uuid = 0;
		$.support = {};
		$.expr = {};

		$.map = function(elements,callback) {
			var value,values = [],i,key;
			if(likeArray(elements)) {
				for(var i =0;i<elements.length;i++){
					value = callback(elements[i]);
					if(value != null) values.push(value)

				}

			}else{
				for (key in elements) {
					value = callback(elements[key],key)
					if(value != null) values.push(value);
				}
			}
			return flatten(values);
		}

		$.each = function(elements,callback) {
			var i,key 
			if(likeArray(elements)) {
				for(var i =0;i<elements.length;i++){
					if(callback.call(elements[i],i,elements[i] )=== false) return elements)
				}
			}else{
				for(key in elements){
					if(callback.call(elements[key],key,elements[key]) === false)
						return elements
				}
			}
		} 
		$.grep = function(elements,callback) {
			return filter.call(elements,callback)
		}
		if(window.JSON) $.parseJSON = JSON.parse;

		$.each('Boolean Number String Function Array Date RegExp Object Error'.split(" "),function(i,name){
			class2type["[object"+ name + "]"] = name.toLowerCase();
		})

		$.fn = {
			forEach:emptyArray.forEach,
			reduce :emptyArray.reduce,
			push:emptyArray.push,
			sort:emptyArray.sort,
			indexOf:emptyArray.indexOf,
			concat:emptyArray.concat,
			map:function(fn) {
				return $($.map(this,function(el,i){
					return fn.call(el,i,el)
				}))
			},
			slice:function(){
				return $(slice.apply(this,arguments))
			},
			ready:function(callback) {
				if(readyRE.test(document.readystate)) callback($)
				else document.addEventListener('DOMContentLoaded',function(){
					callback($)
				},false)
				return this;
			},
			get:function(idx) {
				return idx === undefined ? slice.call(this):this[idx >= 0 ? idx+this.length]
			},
			toArray:function(){
				return this.get();
			}
			size:function(){
				return this.length;
			}
			remove:function(){
				return this.each(function(){
					if(this.parentNode != null) this.parentNode.removeChild(this)
				})
			}
			each:function(callback) {
				emptyArray.every.call(this,function(el,idx) {
					return callback.call(el,idx,el) != false;
				})
				return this;
			}

			filter:function(selector) {
				if(isFunction(selector)) return this.not(this.not(selector))
				return $(filter.call(this,function(elemen) {
					return zepto.matches(element,selector);
				}))
			},
			add:function(selector,context) {
				return $(uniq(this.concat($(selector,context))))
			},
			is:function(selector) {
				return this.length > 0 && zepto.matches(this[0],selector)
			},
			not:function(selector) {
				var nodes = [];
				if(isFunction(selector) && selector.call != undefined){
					this.each(function(idx){
						if(!selector.call(this,idx)) nodes.push(this);
					})
				}else{
					var excludes = typeof selector == 'string' ? this.filter(selector):
					(likeArray(selector) && isFunction(selector.item))?slice.call(selector):$(selector)
					this.forEach(function(el){
						if(excludes.indexOf(el) < 0) nodes.push(el)
					})
				}
				return $(nodes);
			}
			has:function(selector) {
				return this.filter(function(){
					return isObject(selector) ? $.contains(this,selector) : $(this).find(selector)
				})
			}
			eq:function(idx) {
				return idx === -1 ? this.slice(idx):this.slice(idx,+idx+1)
			}
			first:function(){
				var el = this[0];
				return e1 && !isObject(el) ?el:$(e1)
			}
			last:function(){
				var el = this[this.length - 1];
				return e1 && !isObject(e1) ? el :$(el)
			},
			find:function(selector) {
				var result,$this = this;
				if(typeof selector == 'object') {
					result = $(selector).filter(function(){
						var node = this;
						return emptyArray.some.call($this,function(parent) {
							return $.contains(parent,node);
						})
					})
				}else if(this.length == 1){
					result = $(zepto.qsa(this[0],selector))
				}else{
					result =this.map(function(){
						return zepto.qsa(this,selector)
					})
				}
				return result;
			},
			closest:function(selector,context) {
				var node = this[0],
				collection = false;
				if(typeof selector == 'object') collection = $(selector)
				while (node && !(collection ? collection.indexOf(node) > =0 : zepto.matches(node,selector)))
				node = node !== context && !isDocument(node) && node.parentNode;
				return $(node);	
			}
			parents:function(selector) {
				var ancestors = [],
					nodes = this;
				while(node.length > 0) {
					nodes = $.map(nodes,function(node) {
						if(node == node.parentNode && !isDocument(node) && ancestors.indexOf(node)< 0 ) {
							ancestors.push(node);
							return node;
						})
					});
				return filtered(ancestors,selector)

				}
			}
			parent:function(selector) {
				return filtered(uniq(this.pluck('parentNode')),selector);
			},
			children:function(selector) {
				return filtered(this.map(function(){
					return children(this);
				}),selector);
			},
			contents:function(){
				return this.map(function(){
					return slice.call(this.childNodes)
				})
			},
			siblings:function(selector) {
				return filtered(this.map(function(i,el) {
					return filter.call(children(el.parentNode),function(child){
						return child !==  e1;
					})
				}),selector)
			},
			empty:function(){
				return this.each(function(){
					this.innerHTML = ''
				})
			},
			pluck:function(property) {
				return e1[property];
			},
			show:function(){
				return this.each(function(){
					this.style.display == 'none' && (this.style.display = null)
					if(getComputedStyle(this,'').getPropertyValue('display')== 'none')
						this.style.display = defaultDisplay(this.nodeName);
				})
			},
			replaceWith:function(newContent) {
				return this.before(newContent).remove();
			},
			wrap:function(newContent) {
				var fuc = isFunction(structure);
				if(this[0] && !func)
				var dom = $(structure).get(0),
					clone = dom.parentNode || this.length > 1

				return this.each(function(index){
					$(this).wrapAll(
						func ? structure.call(this,index) :clone ? dom.cloneNode(true):dom
					)
				})

			},
			wrapAll:function(structure) {
				if(this[0]) {
					$(this[0]).before(structure = $(structure))
					var children 
					while((children == structure.children()).length) structure = children.first();
					$(structure).append(this);
				}
				return this;
			},
			wrapInner:function(structure) {
				var func = isFunction(structure)
				return this.each(function(index) {
					var self = $(this),
					dom = func ? structure.call(this,index):structure
					contents.length ? contents.wrapAll(dom) : self.append(dom);
				})
			},
			unwrap:function(){
				this.parent().each(function(){
					$(this).replaceWith($(this).children())
				})
				return this;
			}
			clone:function(){
				return this.map(function(){
					return this.cloneNode(true);
				})
			},
			hide:function(){
				return this.css('display','none')
			},
			toggle:function(setting) {
				return this.each(function(){
					var el = $(this);
					(setting == undefined) ? el.css('display' == 'none': setting)? el.show():el.hide();
				})
			},
			prev:function(selector) {
				return $(this.plunk('nextElementSibling')).filter(selector || '*')
			}
			next:function(selector) {
				return $(this.pluck('nextElementSibling')).filter(selector,|| '*')
			}
			html:function(html) {
				return html === undefined ? 
				(this.length > 0 ? this[0].innerHTML:null)

				this.each(function(idx) {
					var originHmtl = this.innerHTML
					$(this).empty().append(funcArg(this,html,idx,originHmtl));

				})
			}
			text:function(text) {
				return text == undefined ? (this.length >0 ? this[0].textContent : null):this.each(function(){
					this.textContent = text;
				})
			}
			attr:function(name,value) {
				var result
				return (typeof name == 'string' && value === undefined) ?
				(this.length == 0 || this[0].nodeType !== 1 ? undefined:
				(name == 'value' &&  this[0].nodeType == 'INPUT') ? this.val():
				(!(result = this[0].getAttribute(name) && name in this[0]) ? this[0][name]:result))
				this.each(function(idx) {
					if(this.nodeType !== 1) return;
					if(isObject(name)) for(key in name) setAttribute(this,key,name[key])
						else setAttribute(this,name,funcArg(this,value,idx,this.getAttribute(name)))
				})
			}
			removeAttr:function(name) {
				return this.each(function(){
					this.nodeType === 1 && setAttribute(this,name)
				})
			}
			prop:function(name.value) {
				return (value === undefined)? (this[0]&&this[0][name]):this.each(function(idx){
					this[name] = funArg(this,value,idx,this[name])
				})
			}
			data:function(name,value) {
				var data = this.attr('data-'+dasherize(name),value);
				return data !== null ? deserializeValue(data) : undefined;
			}
			val:function(name,value) {
				return (value === undefined)?
				(this[0] && (this[0].multiple ? $(this[0]).find('option').filter(function(o){
					return this.selected;
				}).pluck('value'):this[0].value)):this.each(function(idx){
					this.value = funcArg(this,value,idx,this.value)
				})

			}
			offset:function(coordinates) {
				if(coordinates) return this.each(function(index) {
					var $this = $(this),
					coords = funArg(this,coordinates,index,$this.offset()),
					parentOffset = $this.offsetParent().offset(),
					props = {
						top:coords.top - parentOffset.top,
						left:coords.left - parentOffset.left
					}
					if($this.css('position' == 'static') props['position' = 'relative'])
						$this.css(props)
				})
				if(this.length == 0) return null;
				var obj = this[0].getBoundingClientRect();
				return{
					left : obj.left+window.pageXOffset,
					top:obj.top + window.pageYOffset,
					width:Math.round(obj.width),
					height:Math.round(obj.height)
				}
			}




		}

		var zepto = (function(){

		})();

})
isArray = Array.isArray || function(obj) {return obj instanceof Array}
$.each("Boolean Number".split(" "),function(i,name)){
	class2type["[object"+name+"]"] = name.toLowerCase()
}
function isPlainObject(obj) {
	return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj)==
	Object.prototype

}
function compact(array) {return filter.call(array,function(item) {
	return item != null
})}
$.fn.concat,call([],'abc')
function maybeAddPx(name,value) {
	return (typeof value == 'number' && !cssNumber[dasherize[name]]?
		value + 'px'
}
function defaultDisplay(noedName) {
	var element, display;
	if(!elementDisplay[nodeName]){
		element = document.createElement(nodeName);
		document.body.appendChild(element);
		display = getComputedStyle(element,''.getPropertyValue('display'))
		element.parentNode.removeChild(element);
		display =='none' && (display = 'block')
		elementDisplay[nodeName] = display;
		return elementDisplay[nodeName];
	}
}
function children(element){
	return 'children' in element ?
	slice.call(element.children):
	$.map(element.childNodes,function(node){
		if(node.nodeType == 1) return node;
	});
}
Zepto.fragment = function(html,name,properties) {
	var dom,nodes,container;
	if(singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))
	if(!dom) {
			if(html.replace) html = html.replace(tagExpanderRE,"<$1></$2>")
		}
	if(!(name in containers)) name = '*';
	container = contents[name];
	container.innerHTML = '' + html;
	dom = $.each(slice.call(container.childNodes),function(){
		container.removeChild(this)
	})
	if(isPlainObject(properties)) {
		nodes = $(dom);
		$.each(properties,function(key,value)){
			if(methodAttributes.indexOf(key) > -1) nodes[key][value];
			else nodes.attr(key ,value)
		}
	}
	return dom;

}
zepto.Z = function(dom,selector) {
	dom = dom || [];
	dom.__proto__ = $.fn;
	dom.selector = selector || '';
	return dom;
}
$.extend = function(target) {
	var deep,args = slice.call(arguments,1);
	if(typeof target == 'boolean') {
		deep = target;
		target = args.shift();
	}
	args.forEach(function(arg) {
		extend(target,args,deep)
	})
	return target;
}
$.contains = document.document.documentElement.contains ?
function(parebt,node) {
	return parent !== node && parent.contains(node)
}:
function(parent,node) {
	while (node && (node = node.parentNode))
		if(node === parent) return true;
	return false;
}
if(window.JSON) $.parseJSON = JSON.parse;
slice:function(){
	return $(slice.apply(this,arguments))
}
ready:function(callback) {
	if(readyRE.test(document.readyState) && document.body) callback($)
	else document.addEventListener('DOMContentLoaded',function(){
		callback($)
	},false)
}
get :function(idx) {
	return idx === undefined ?
	slice.call(this):
	this[
	idx >= 0?
	idx :
	idx+this.length
	]
}
remove:function(){
	return this.each(function(){
		if(this.parentNode != null)
			this.parentNode.removeChild(this)
	})
}
each:function(callback) {
	emptyArray.every.call(this,function(el,index){
		return callback.call(el,idx,el) !== false
	})
	return this
}
filter : function(selector) {
	if(isFunction(selector)) return this.not(this.not(selector))

	return $(filter.call(this,function(element) {
		return zepto.matches(element,selector)
	}))		
}
function set(key) {
	var img = document.createElement('img');
	img.addEventListener('load',function(){
		var imgCanvas = document.createElement('canvas');
		imgContext = imgCanvas.getContext('2d');
		imgCanvas.width = this.width;
		imgCanvas.height = this.height;
		imgContext.drawImg(this,0,0,this.width,this.height);
		var imgAsDataURL = imgCanvas.toDataURL('image/png');
		try{
			localStroage.setItem(key,imgAsDataURL);
		}
		catch(e){
			console.log('Stroage faild:' + e);
		}
	},false);
	img.src = src;

}
function get(key) {
	var srcStr = localStroage.getItem(key);
	var imgObj = document.createElement('img');
	imgObj.src = srcStr;
	document.body.appendChild(imgObj);
}
add: function(selector,context) {
	return $(uniq(this.concat($(selector,context))))
}
is:function(selector) {
	return this.length > 0 && zepto.matches(this[0],selector)
}
not function(selector) {
	var nodes = [];
	if(isFunction(selector) && selector.call !== undefined)
		this.each(function(idx)) {
			if(!selector.call(this,idx)) nodes.push(this);
	})
	else{
		var excludes = 
		typeof selector == 'string' ? this.filter(selector) :
		(likeArray(selector) && isFunction(selector.item)) ? slice.call(selector)
		:$(selector)

		this.forEach(function(el){
			if(excludes.indexOf(el) < 0)nodes.push(el)
		})
	}
	return $(nodes)
}
function isFunction(value) {
	return Object.prototype.toString.call(value) == "[object Function]"
}
has :function(selector) {
	return this.filter(function(){
		return isObject(selector)?
		$.contains(this,selector):
		$(this).find(selector).size();
	})
}
eq:function(idx) {
	return idx === -1 ? this.slice(idx) : this.slice(idx.+idx+1)
}
first: function(){
	var el = this[0];
	return el && !isObject(el) ? el : $(el)
}
closest:function(selector,context) {
	var node == this[0],collection = false;
	if(typeof selector == 'object') collection = $(selector);
	while(
		node && !(collection ? collection.indexOf(node) >= 0 :zepto.matches(node,selector))
		)

	node = node !== context && !isDocument(node) && node.parentNode
	return $(node)
}
$.map = function(elements,callback) {
	var value,values = [],i key;
	if(likeArray(elements))
		for(i =0;i< elements.length;i++){
			value = callback(elements[i],i);
			if(value != null) values.push(value)
		}
	else 
		for(key in elements) {
			value callback(elements[key],key)
			if(value != null) values.push(value)
		}
	return flatten(values)
}
function  flatten(array) {
	return array.length > 0 $.fn.concat.apply([],array:array)
}
camelize = function(str){
	return str.replace(/-+(.)?/g,function(match,chr){
		return chr ? chr.toUpperCase():'';
	})
}
children:function(selector) {
	return filter(
		this.map(function(){
			return children(this)
		}),selector
		)
}
contents:function(){
	return this.map(function(){
		return slice.call(this.childNodes)
	})
}
siblings:function(selector) {
	return filtered(this.map(function(i,el){
		return filter
	}))
}
show: function(){
	return this.each(function(){
		this.style.display == 'none' && (this.style.display = '')
		if(getComputedStyle(this,'').getPropertyValue('display' == 'none')
			this.style.display = defaultDisplay(this.nodeName)
	})
}
replaceWith:function(newContent) {
	return this.before(newContent).remove();
} 
wrap: function(structure) {
	var func = isFunction(structure)
	if(this[0] && !func)
		var dom = $(structure).get(0),
	clone = dom.parentNode || this.length > 1;

	return this.each(function(index){
		$(this).wrapAll(
			func ? structure.call(this,index):
			clone ? dom.cloneNode(true) : dom; 
			)
	})
}
wrapAll:function(structure) {
	if(this[0]){
		$(this[0]).before(structure = $(structure))

		var children 
		while((children == structure.children()).length)
			structure = children.first();
		$(structure).append(this);
	}
	return this;
}
unwrap:function(){
	this.parent().each(function(){
		$(this).replaceWith($(this).children())
	})
	return this;
}
clone: function(){
	return this.map(function(){
		return this.cloneNode(true)
	})
}
html:function(html) {
	return 
	0 in arguments ?
	this.each(function(idx) {
		var originHmtl = this.innerHTML;
		$(this).empty().append(funcArg(this,html,idx,originHtml))
	}):
	(0 in this ? 
		this[0].innerHTML:
		null
		) 

}
text:function(text) {
	return 
	0 in arguments ?
	this.each(function(idx) {
		var newText = funcArg(this,text,idx,this.textContent)
		this.textContent = newText == null ? '':''+newText
	}):
	(0 in this ? this[0].textContent : null)
}
attr:function(name,value) {
	var result
	return 
	(typeof name == 'string' && !(1 in arguments)) ?
	(!this.length || this.nodeType !== 1 ? undefined :
		(!(result == this[0].getAttribute(name)) && name in this[0]) ?
		this[0][name]:result)
	:
	this.each(function(idx) {
		if(this.nodeType !== 1) return;
		if(isObject(name)) for(key in name) setAttribute(this,key,name[key])
			else setAttribute(this,name,funcArg(this,value,idx,this.getAttribute(name)))
	})
}removeAttr: function(name) {
	return this.each(
		function(){
			this.nodeType === 1 && name.split(' ').forEach(
				function(attribute){
					setAttribute(this,attribute)
				},this)
		})
}
prop:function(name,value) {
	name = propMap[name] || name
	return 
		(1 in arguments) ?
		this.each(function(idx) {
			this[name] = funcArg(this,value,idx,this[name])
		}):
		(this[0] && this[0][name])
}
data: function(name.value) {
	var attrName = 'data-'+name.replace(capitalRE,'-$1').toLowerCase()
	var data = (1 in arguments)?
		this.attr(attrName,value):
		this.attr(attrName)
	return data !== null ? deserializeValue(data):undefined
}
val: function(value) {
	return 
		0 in arguments?
		this.each(function(idx){
			this.value = funcArg(this,value,idx,this.value)
		}):
		(this[0] && (
			this[0].multiple ?
			$(this[0].find('option').filter(function(){
				return this.selected
			}).pluck('value')):this[0].value
			))
}
offset:function(coordinates) {
	if(coordinates) return this.each(function(index){
		var $this = $(this),
		coords = funcArg(this,coordinates,index,$this.offset()),
		parentOffset = $this.offsetParent().offset(),
		props = {
			top:coords.top - parentOffset.top,
			left:coords.left - parentOffset.left
		}
		if($this.css('position') == 'static') props['position'] = 'relative';
		$this.css(props);
	})
		if(!this.length) return null;
		var obj = this[0].getBoundingClientRect();
		return{
			left:obj.left + window.pageXOffset,
			top:obj.top + window.pageYOffset,
			width:Math.round(obj.width),
			height:Math.round(obj.height)
		}
}
css: function(property,value){
	if(arguments.length < 2) {
		var computedStyle,element = this[0]
		if(!element) return
		computedStyle = getComputedStyle(element,'')
	if(typeof property == 'string')
		return element.style[camelize(property)] || computedStyle.getPropertyValue(prototype)
	else if(isArray(prototype)) {
		var props = {}
		$.each(property,function(_,prop) {
			props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
		})
		return props
	 }
	}
	var css = ''
	if(type(property) == 'string'){
		if(!value && value !== 0) {
			this.each(function(){
				this.style.removeProperty(dasherize(property))
			})
		else
			css = dasherize(property) + ':' + maybeAddPx(property,value)
		}
	}else{
		for(key in property)
			if(!property[key] && property[key] !== 0)
				this.each(function(){
					this.style.removeProperty(dasherize(key))
				})
			else
				css += dasherize(key) + ':' + maybeAddPx(key,property[key]) + ';'
	}
	 return this.each(function(){ this.style.cssText += ';' + css })
}
index:function(element) {
	return element ? this.indexOf($(element)[0]) :this.parent().children().indexOf(this[0])
}
scrollTop:function(value){
	if(!this.length) return
	var hasScrollTop = 'scrollTop' in this[0]
	if(value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	return this.each(hasScrollTop ?
		function(){this.scrollTop = value}:
		function(){this.scrollTo(this.scrollX,value)})
}
var tmp = new Date();
function f(){
	console.log(tmp);
	if(false){
		var tmp = 'hello world'
	}
}
f();
function BinaryTree(){
	var Node = function(key) {
		this.key = key;
		this.left = null;
		this.right = null
	}
	var root = null;
	var insertNode = function(node,newNode){
		if(newNode.key < node.key){
			if(node.left === null){
				node.left = newNode
			}else{
				inserNode(node.left,newNode);
			}
		}else{
			if(node.right === null){
				node.right = newNode;
			}else{
				inserNode(node.right,newNode)
			}
		}
	}
	this.insert = function(key){
		var newNode = new Node(key);
		if(root === null){
			root = newNode;
		}else{
			insertNode(root,newNode);
		}
	}
}
var nodes[] = {4,6,8,9,23,16,7}
var binaryTree = new BinaryTree();
binaryTree.forEach(function(key){
	binaryTree.insert(key)
})
function BinaryTree(){
	var Node = function(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
	var root = null;
	this.insertNode = function(node,newNode){
		if(node.left < newNode.left){
			if(node.left === null){
				node.left = newNode
			}else{
				insertNode(node.left,newNode)
			}
		}else{
			if(node.right === null){
				node.right = newNode
			}else{
				insertNode(node.right,newNode)
			}
		}
	}
	var inOrderTraverseNode = function(node,callback) }{
		if(node !== null) {
			inOrderTraverseNode(node.left,callback);
			callback(node.key);
			inOrderTraverseNode(node.right,callback)
		}
	}
	this.inorderTraverse = function(callback){
		inOrderTraverseNode(root,callback)
	}
	var callback = function(key) {
		console.log(key);
	}
	this.insert = function(key) {
		var newNode = new Node(key);
		if(root === null){
			root = newNode;
		}else{
			insertNode(root,newNode)
		}
	}
}

var minNode = function(node){
	if(node){
		while(node && node.left !== null){
			node = node.left;
		}
	}
	return null
}
this.min = function(){
	return minNode(root)
}
.head-home{
	@extend %-icon-home;
}
.icon-home {
	width :12px;
	height:12px;
	background:url(sprite.png) -56px -48px no-repeat;
} 
let [foo = true] = [];
foo
let [x,y='b'] = ['a'];
let [x,y='b'] = ['a'.undefined]
var {x:y = 3} = {x:5}
require('css-load! ./hello.css')
for(var i =0;i<arr.length;i++){
	for(var j =0;i<arr.length-1-i;j++){
		if(arr[j] <= arr[j+1]){
			var temp = arr[j];
			arr[j] = arr[j+1];
			arr[j+1] = temp;
		}
	}
}
str.sort(function(v1,v2){
	if(v1<v2) {
		return 1
	}
	return -1;
})
var valuse = [1,2,3,4,5];
var sum = valuse.reduce(function(prev,cur,index,array){
	console.log(index);
	console.log(array);
	return prev+cur;
})
console.log(sum)

var reg = /abc/g;
var str = 'abcabcabc';
var num = 0;
var match = null;
while((match = reg.exec(str)) !== null){
	num++;
}
console.log(num);
NSString *gitPathSouce = [[NSBundle mainBundle]pathForResource:@"jiafei" ofType:@"gif"];
NSData *data = [NSData dataWithContentsOfFile:gitPathSouce];
CGImageSourceRef source = CGImageSourceCreateWithData((__bridge CFDataRef)data,NULL);
size_t count = CGImageSourceGetCount(source);
NSMultableArray *tmpArray = [[NSMultableArray alloc]init];
for(size_t i = 0;i<count;i++){
	CGImageRef imageRef = CGImageSourceCreateImageAtIndex(source,i,NULL);
	UIImage *image = [UIImage imageWithCGImage:imageRef scale:[UIScreen mainScreen].scale
	orientation:UIImageOrientationUp];
	[tmpArray addObject:image];
	CGImageRelease(imageref);
}
CFRelease(source);
int i =0
for(UIImage *image in tmpArray){
	NSData *date = UIImagePngRepresentation(image);
	NSArray *path = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
	NSString *gifPath = path[0];
	NSSting *pathNum = [gifPath stringByAppendingString:[NSString stringWithFormat:@"%d.png",i]]
	i++;
	[data writeToFile:pathNum atomically:NO]
}

UIImage *img = [UIImage imaheWithNamed:[NSString stringWithFormat:@"IMG_%d.JPG",i]];
[imageView setAnimationImages:imageTmp];
[imageView setAnimationRepaeteCount:10];
[imageView setAnimationDuration:2];
[imageView startAnimation];