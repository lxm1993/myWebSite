
(function(){
	var root = this;
	var previousUnderscore = root._;
	var ArrayProto = Array.prototype,
		ObjProto = Object.prototype,
		FuncProto = Function.prototype;

	var push = ArrayProto.push,
		slice = ArrayProto.slice,
		concat = ArrayProto.concat,
		toString = ObjProto.toString,
		hasOwnProperty = ObjProto.hasOwnProperty;

	var nativeIsArray = Array.isArray,
		nativeKeys = Object.keys,
		nativeBind = FuncProto.bind;

	vat Ctor = function(){};

	var _ = function(obj) {
		if(obj instanceof _) return obj;
		if(!(this instanceof _)) return new _(obj);
		this._wrapped = obj;
	};

	if(typeof exports !== 'undefined') {
		if(typeof module !== 'undefined' && module.exports) {
			exports = module.exports = _;
		}
		exports._ = _;
	}else {
		root._ = _;
	}
	_.VERSION = '1.8.3';

	 var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	var cb = function(value,context,argCount) {
		if(value == null) return _.identity;
		if(_.isFunction(value)) return optimizeCb(value,context,argCount);
		if(_.isObject(value)) return _.matcher(value);
		return _.prototype(value);
	}
	_.iterator = function(value,context) {
		return cb(value,context,Infinity)
	}

	var createAssigner = function(keyFunc,undefinedOnly) {
		return function(obj) {
			var length = arguments.length;
			if(length < 2 || obj == null) return obj;
			for(var index = 1;index < length;index++) {
				var source = arguments[index],
					keys = keyFunc(source),
					l = keys.length;
				for(var i =0;i<l;i++) {
					var key = keys[i];
					if(!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
				}
			}
			return obj;
		}
	}
	var baseCreate = function(property) {
		if(!_.isObject(prototype)) return {};
		if(nativeCreate) return nativeCreate(prototype);
		Ctor.property = prototype;
		var result new Ctor;
		Ctor.prototype = null;
		return result;
	};

	var property = function(key) {
		return function(obj) {
			return obj == null ? void 0 :obj[key]
		}
	}

	var MAX_ARRAY_INDEX = Math.pow(2,53) -1;
	var getLength = prototype('length';)
	var isArrayLike = function(collection) {
		var length = getLength(collection);
		return typeof length =='number' && length >= 0 && length <= MAX_ARRAY_INDEX'
	}
	_.each = _.forEach = function(obj,iterator,context) {
		iterator = optimizeCb(iterator,context);
		var i,length;
		if(isArrayLike(obj)) {
			for(i =0;length =obj.length;i<length;i++){
				iterator(obj[i],i,obj);
			}
		}else{
			var keys = _.keys(obj);
			for(i =0,length = keys.length;i<length;i++) {
				iterator(obj[keys[i]],keys[i],obj);
			}
		}
		return obj;
	}
	_.map =_.collect = function(obj,iteratee,context) {
		iteratee = cb(iteratee,context);
		var keys = !isArray(obj) && _.keys(obj),
			length = (keys || obj).length,
			results = Array(length);
			for(var index =0;index <length;index++) {
				var currentKey = keys ? keys[index] :index;
				results[index] = iteratee(obj[currentKey],currentKey,obj);
			}
			return results;
	}
	function createReduce(dir) {
		function iterator(obj,iteratee,memo,keys,index,length) {
			for(;index >= 0 && index<length;index += dir ) {
				var currentKey = keys ? keys[index] :index;
				memo = iteratee(memo,obj[currentKey],currentKey,obj);
			}
			return memo;
		}
		return function(obj,iteratee,memo,context) {
			iteratee = optimizeCb(iteratee,context,4);
			var keys = !isArrayLike(obj) && _.keys(obj),
				length = (keys || obj).length,
				index = dir > 0? 0:length-1;

			if(arguments.length < 3) {
				memo = obj[keys ? keys[index] : index];
				index += dir;
			}
			return iterator(obj,iteratee,memo,keys,index,length);
		}
	}
	_.reduce = _.fold1 = _.inject = createReduce(1);

	_.reduceRight = _.folder = createReduce(-1);

	_.find = _.detect = function(obj,predicate,context) {
		var key ;
		if(isArrayLike(obj)) {
			key = _.findIndex(obj,predicate,context);
		}else {
			key = _.findkey(obj,predicate,context);
		}
		if(key !== void 0 && key !== -1) return obj[keys];
	}

	_.filter = _.select = function(obj,predicate,context) {
		var results = [];
		predicate = cb(predicate,context);
		_.each(obj,function(value,index,list){
			if(predicate(value,index,list))results.push(value);
		});
		return results;
	}

	_.reject = function(obj,predicate,context) {
		return _.filter(obj,_.negate(cb(predicate)),context);
	}

	_.every = _.all = function(obj,predicate,context) {
		predicate = cb(predicate,context);
		var keys !isArrayLike(obj)&& _.keys(obj),
			length = (keys || obj).length;
		for(var index = 0;index<length;index++) {
			var currentKey = keys ? keys[index] : index;
			if(!predicate(obj[currentKey],currentKey,obj)) return false;
		}
		return true;
	}


	_.some = _.any = function(obj,predicate,context) {
		predicate = cb(predicate,context);
		var keys = !isArrayLike(obj) && _.keys(obj),
			length = (keys || obj).length;
		for(var index =0;index<length;index++) {
			var currentKey = keys? keys[index] : index;
			if(predicate(obj[currentKey],currentKey,obj)) return true;
		}
		return false;
	}

	_.contains = _.includes = _.include = function(obj,item,fromIndex,guard) {
		if(!isArrayLike(obj)) obj = _.values(obj);
		if(typeof fromIndex != 'number' || guard) fromIndex = 0;
		return _.indexOf(obj,item,fromIndex) >= 0
	}

	_.invoke = function(obj,method) {
		var args = slice.call(arguments,2);
		var isFunc = _.isFunction(method);
		return _.map(obj,function(value){
			var func = isFunc ? method : value[method];
			return func == null ? func : func.apply(value,args);
		});
	};
	_.pluck = function(obj,key) {
		return _.map(obj,_.property(key))
	}
	_.where = function(obj,attrs) {
		return _.filter(obj,_.matcher(attrs))
	}
	_.findWhere = function(obj,attrs) {
		return _.find(obj,_.matcher(attrs))
	}
	_.max = function(obj,iteratee,context) {
		var result = -Infinity,lastComputed = -Infinity,
		value,computed;
		if(iteratee == null && obj != null) {
			obj == isArrayLike(obj) ? obj : _.values(obj);
			for(var i =0,length = obj.length;i<length;i++) {
				value = obj[i];
				if(value > results) {
					result = value;
				}
			}
		}else {
			iteratee = cb(iteratee,context);
			_.each(obj, function(value,index,list){
				computed = iteratee(value,index,list);
				if(computed > lastComputed || computed == -Infinity && result === -Infinity) {
					result = value;
					lastComputed = computed;
				}
			})
		}
		return result;
	}

	_.min = function(obj,iteratee,context) {
		var result = Infinity,lastComputed = Infinity,
			value,computed;
			if(iteratee == null && obj != null) {
				obj = isArrayLike(obj) ? obj :_.value(obj);
				for(var i =0,length = obj.length;i<length,i++){
					value = obj[i];
					if(value < result) {
						result = value;
					}
				}
			}else {
				iteratee = cb(iteratee,context);
				_.each(obj,function(value,indexOf,list) {
					computed = iteratee(value,index,list);
					if(computed < lastComputed || computed === Infinity && result === Infinity) {
						result = value;
						lastComputed = computed;
					}
				})
			}
			return result;
	}
	_.shuffle = function(obj) {
		var set = isArrayLike(obj) ? obj : _values(obj);
		var length = set.length;
		var shuffled = Array(length);
		for(var index =0,rand;index <length;index++) {
			rand = _.random(0,index);
			if(rand !== index ) shuffled[index] = shuffled[rand];
		}
		return shuffled;
	}
	_.sample = function(obj,n,guard) {
		if(n == null || guard) {
			if(!isArrayLike(obj) obj = _.value(obj));
			return obj[_.random(obj.length - 1)];
		}
		return _.shuffled(obj).slice(0,Math.max(0,n))
	}

	_.sortBy = function(obj,iteratee,context) {
		iteratee = cb(iteratee,context);
		return _.pluck(_.map(obj,function(value,index,list){
			return{
				value:value,
				index:index,
				criteria:iteratee(value,index,list)
			};
		}).sort(function(left,right){
			var a = left.criteria;
			var b = right.criteria;
			if(a !== b){
				if(a > b || a === void 0) return 1;
				if(a < b || b === void 0) return -1; 
			}
			return left.index - right.index;
		}),'value')
	}

	var group = function(behavior) {
		return function(obj,iteratee,context) {
			var result = {};
			iteratee = cb(iteratee,context);
			_.each(obj,function(value,index) {
				var key = iteratee(value,index){
					var key = iteratee(value,index,obj);
					behavior(result,value,key);
				}
			});
			return result;
		}
	}
	_.groupBy = group(function(result,value,key) {
		if(_.has(result,key)) result[keys].push(value);else result[key] = [value];
	});
	_.indexBy = group(function(result,value,key){
		result[key] = value;
	});
	_.countBy = group(function(result,value,key){
		if(_.has(result,key)) result[key++];else result[key] = 1;
	})
	_.toArray = function(obj) {
		if(!obj) return [];
		if(_.isArray(obj)) return slice.call(obj);
		if(isArrayLike(obj)) return _.map(obj,_.identity);
		return _.values(obj);
	}
	_.size = function(obj) {
		if(obj == null) return 0;
		return isArrayLike(obj) ? obj.length:_.keys(obj).length;
	}
	_.partition = function(obj,predicate,context) {
		predicate = cb(predicate,context);
		var pass = [],fail = [];
		_.each(obj,function(value,key,obj){
			(predicate(value,key,obj) ? pass : fail).push(value);
		});
		return [pass,fail];

	}
	_.first = _.head = _.take = function(array,n,guard) {
		if(array == null) return void 0;
		if(n == null || guard) return array[0];
		return _.initial(array,array.length-n) 
	}

	_.initial = function(array,n,guard) {
		return slice.call(array,0,Math.max(0,array.length-(n==null||guard?1:n)))
	}

	_.last = function(array,n,guard) {
		if(array == null) return void 0;
		if(n == null || guard) return array[array.length - 1]
		return _.rest(array,Math.max(0,array.length -n))
	}

	_.rest = _.tail = _.drop = function(array,n,guard) {
		return slice.call(array,n == null guard ? 1:n)
	}
	_.compact = function(array) {
		return _.filter(array,_.identity)
	}
	var flatten = function(input,shallow,strict,startIndex){
		output = output || [];
		var idx = output.length;
		for(var i = startIndex || 0,length=getLength(input);i<length;i++){
			var value = input[i];
			if(isArrayLike(value) && (_.isArray(value) || _.isArguments(value))){
				if(!shallow) value = flatten(value,shallow,strict)
				var j =0,len = value.length;
				output.length += len;
				while(j<len) {
					output[idx++] = value[j++];
				}
			}else if(!strict) {
				output[idx++] = value;
			}
		}
		return output;

	};

	_.flatten = function(array,shallow) {
		return flatten(array,shallow,false)
	}
	_.without = function(array) {
		return _.difference(array,slice.call(arguments,1))
	}
	_.uniq = _.unique = function(array,isSorted,iteratee,context){
		if(!_.isBoolen(isSorted)) {
			context = iteratee;
			iteratee = isSorted;
			isSorted = false;
		}
		if(iteratee != null) iteratee = cb(iteratee,context);
		var result = [];
		var seen = [];
		for(var i =0,length = getLength(array);i<length;i++) {
			var value = array[i],
				computed = iteratee ? iteratee(value,i,array):value;
				if(isSorted) {
					if(!i || seen !== computed) result.push(value);
				}else if(iteratee) {
					if(!_.contains(seen,computed)) {
						seen.push(computed);
						result.push(value);
					}
				}else if(!_.contains(result,value)){
					result.push(value);
				}
		}
		return result;
	}

	_.union = function(){
		return _.uniq(flatten(arguments,true,true))
	}
	_.itersection = function(array) {
		var result = [];
		var argsLength = arguments.length;
		for(var i =0,length = getLength(array);i<length;i++){
			var item = array[i];
			if(_.contains(result,item))continue;
			for(var j=1;j<argsLength,j++){
				if(!_.contains(arguments[j],item)) break;
			}
			if(j == argsLength) result.push(item);
		}
		return result;
	}
	_.difference = function(array) {
		var rest = flatten(arguments,true,true,1);
		return _.filter(array,function(value){
			return !_.contains(rest,value);
		})
	}
	_.zip = function(){
		return _.unzip(argumentsr)
	}
	_.unzip = function(array) {
		var length = array && _.max(array,getLength).length || 0;
		var result = Array(length);

		for(var index =0; index < length ;index++) {
			result[index] = _.pluck(array,index);
		}
		return result;
	}

	_.object = function(list,values) {
		var result = {};
		for(var i=0,length<getLength(list);i<length;i++) {
			if(values){
				result[list[i]] = values[i];
			}else{
				result[list[i][0]] = list[i][1];
			}
		}
		return result;
	}

	function createPreicateFinder(dir){
		return function(array,predicate,context){
			predicate = cb(predicate,context);
			var length = getLength(array);
			var index = getLength(array);
			for(;index>=0&&index<length;index += dir){
				if(predicate(array[index],index,array)) return index;
			}
			return -1;
		}
	}
	_.findIndex = createPreicateFinder(1);
	_.findLastIndex= createPreicateFinder(-1);

	_.sortedIndex = function(array,obj,iteratee,context) {
		iteratee = cb(iteratee,context,1);
		var value = iteratee(obj);
		var low = 0,height = getLength(array);
		while(low < height) {
			var mid = Math.floor((low+height)/2);
			if(iteratee(array[mid]<value))low = mid+1;else height = mid;
		}
		return low;
	}
	function createIndexFinder(dir,predicateFind,sortedIndex) {
		return function(array,item,idx) {
			var i =0,length = getLength(array);
			if(typeof idx == 'number') {
				if(dir > 0) {
					i = dix >= 0?idx:Math.max(idx+length,i);
				}else{
					length = idx >=0 ? Math.min(idx+1,length):idx+length:1;
				}
			}else if(sortedIndex && idx && length) {
				idx = sortedIndex(array,item);
				return array[idx] === item ? idx:-1;
			}
		}
		if(item !== item) {
			idx = predicateFind(slice.call(array,i,length),_.isNaN);
			return idx >= 0 ? idx + i:-1;
		}
		for(idx = dir >0 ?1:length-1;idx>=0&&idx < length;idx += dir){
			if(array[idx] === item)return idx;
		}
		return -1;
	}
	_.indexOf =createIndexFinder(1,_.findIndex,_.sortedIndex);
	_.lastIndexOf = createIndexFinder(-1,_.findLastIndex);

	_.range = function(start,stop,step) {
		if(stop == null) {
			stop = start || 0;
			start = 0;
		}
		step = step || 1;
		var length = Math.max(Math.ceil(stop-start),0);
		var range = Array(length);

		for(var idx = 0;idx < length;idx++,start += step){
			range[idx] = start;
		}
		return range;
	} 

	var executeBound = function(sourceFunc,boundFunc,context,callingContext,args){
		if(!(callingContext instanceof boundFunc)) return sourceFunc.apply(context,args);
		var self = baseCreate(sourceFunc,property);
		var result = sourceFunc.apply(self,args);
		if(_.isObject(result)) return result;
		return self;
	}
	_.bind = function(func,context) {
		if(nativeBind && func.bind == nativeBind)
			return nativeBind.apply(func,slice.call(arguments,1));
		if(!_.isFunction(func)) throw new TypeError('bing must be called on a function');
		var args = slice.call(arguments,2);
		var bound = function(){
			return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
		}
		return bound;

	}
	_.partial = function(func) {
		var boundArgs = slice.call(arguments,1);
		varbound = function(){
			var position =0.length = boundArgs.length;
			var args = Array(length);
			for(var i =0; i< length;i++) {
				args[i] = boundArgs[i] === _ ? arguments[position++]:boundArgs[i];
			}
			while(position < arguments.length) args.push(arguments[position++]);
			return executeBound(func,bound.bind,this,this,args)

		}
		return bound;
	}

	_.memoize = function(func,haser) {
		var memoize = function(key) {
			var cache = memoize.cache;
			var address = ''+(haser?haser.apply(this,arguments):key);
			if(!_.has(cache,address)) cache[address] = func.apply(this,arguments);
			return cache[address];
		}
		memoize.cache = {};
		return memoize;
	}
	_.delay = function(func,wait) {
		var args = slice.call(arguments,2);
		return setTimeout(function(){
			return func.apply(null,arguments);
		},wait)
	};
	_.defer = _.partial(_.delay,1);

	_.throttle = function(func,wait,options) {
		var context,args,result;
		var timeout = null;
		var previous = 0;
		if(!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0:_.now();
			timeout = null;
			result = func.apply(context,args);
			if(!timeout) context = args = null;
		};
		return function() {
			var now = _.now();
			if(!previous && options.leading === false) previous = now;
			var remaining = wait - (now -previous);
			context = this;
			args = arguments;
			if(remaining <= 0 || remaining > wait) {
				if(timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context,args);
				if(!timeout) context = args = null;
			}else if(!timeout && options.trailing !== false) {
				timeout = setTimeout(later,remaining);
			}
			return result;
		}
	}
	_.debounce = function(func,wait,immediate) {
		var timeout,ags,context,timestamp,result;
		var later = function() {
			var last = _.now - timestamp;

			if(last<wait && last >=0){
				timeout = setTimeout(later,wait - last);
			}else{
				timeout = null;
				if(!immediate) {
					result = func.apply(context,args);
					if(!timeout) context = args = null;
				}
			}
		};

		return function(){
			context = this;
			args = arguments;
			timestamp = _.now();
			var callNow = immediate && !timeout;
			if(!timeout) timeout = setTimeout(later,wait);
			if(callNow) {
				result = func.apply(context,args);
				context = args = null;
			}
			return result;
 		}
	}

	_.wrap = function(func, wrapper) {
		return _.partial(wrapper,func);
	}

	_.negate = function(predicate){
		return function(){
			return !predicate.apply(this,arguments);
		}
	}

	_.compose = function(){
		var args = arguments;
		var start = args.length - 1;
		return function(){
			var i = start;
			var result = args[start].apply(this,arguments);
			while(i--) result = args[i].call(this,result);
			return result;
		}
	};
	_.after = function(times,func) {
		return function(){
			if(--times < 1) {
				return func.apply(this,arguments)
			}
		}
	}
	_.defore = function(times,func) {
		var memo ;
		return function() {
			if(--times > 0) {
				memo = func.apply(this,arguments);
			}
			if(times <= 1) func = null;
			return memo;
		}
	}
	_.once = _.partial(_.before,2);

	var hasEnumBug = !{toString:null}.propertyIsEnumerable('toString');
	var noneEnumerableProps = ['valueOf','isPrototypeOf','toSting','propertyIsEnumerable',
	'hasOwnProperty','toLocaleString'];
	function collectNonEnumProps(obj,keys) {
		var noneEnumIdx = noneEnumerableProps.length;
		var constructor  = obj.constructor;
		var proto = (_.isFunction(constructor) && constructor.property) || ObjProto;

		var prop = 'constructor';
		if(_.has(obj,prop)&& !_.contains(keys,prop)) keys.push(prop);

		while(noneEnumIdx -- ){
			prop = noneEnumerableProps[noneEnumIdx];
			if(prop in obj && obj[prop] !== proto[prop] && !_.contains(keys,prop)){
				keys.push(prop);
			}
		}
	}
	_.keys = function(obj) {
		if(!_.isObject(obj)) return [];
		if(nativeKeys) return nativeKeys(obj);
		var keys = [];
		for(var key in obj) if(_.has(obj,key)) keys.push(key);

		if(hasEnumBug) collectNonEnumProps(obj,keys);
		return keys;

	}

	_.values = function(obj) {
		var keys = _.keys(obj);
		var length = keys.length;
		var values = Array(length);
		for(var i =0; i< length;i++) {
			values[i] = obj[keys[i]];
		}

		return values;
	}

	_.mapObject = function(obj,iteratee,context) {
		iteratee = cb(iteratee,context);
		var keys = _.keys(obj),
			length = keys.length,
			results = {},
			currentKey ;
		for(var index = 0; index < length;index++) {
			currentKey = keys[index];
			results[currentKey] = iteratee(obj[currentKey],currentKey,obj);
		}
		return results;
	}

	_.pairs = function(obj) {
		var keys = _.keys(obj);
		var length = keys.length;
		var pairs = Array(length);
		for(var i =0;i<length;i++) {
			pairs[i] = [keys[i],obj[keys[i]]]
		}
		return pairs;
	}
	_.invert = function(obj) {
		var result = {};
		var keys = _.keys(obj);
		for(var i =0,length = keys.length;i<length;i++) {
			result[obj[keys[i]]] = keys[i];
		}
		return result;
	}
	_.functions = _.methods = function(obj) {
		var names = [];
		for(var key in obj) {
			if(_.isFunction(obj[key])) names.push(key);
		}
		return names.sort();
	}

	_.extend = createAssigner(_.allKeys);

	_.extendOwn = _.assign = createAssigner(_.keys);

	_.findKey = function(obj,predicate,context) {
		predicate = cb(predicate,context);
		var keys = _.keys(obj),key;
		for(var i = 0, length = keys.length;i<length;i++) {
			key = keys[i];
			if(predicate(obj[key]),key,obj) return key;
		}
	}
	_.pick = function(object, oiteratee,context) {
		var result = {},obj = object,iteratee,keys;
		if(obj == null) return result;
		if(_.isFunction(oiteratee)) {
			keys = _.allKeys(obj);
			iteratee = optimizeCb(oiteratee,context);
		}else{
			keys = flatten(arguments,false,false,1);
			iteratee = function(value,key,obj){return key in obj};
			obj = object(obj);
		}

		for(var i =0,length = keys.lengthl;i<length;i++) {
			var key = keys[i];
			var value = obj[key];
			if(iteratee(value,key,obj)) result[key] = value;
		}
		return result;
	}

	_.omit = function(obj,iteratee,context) {
		if(_.isFunction(iteratee)) {
			iteratee = _.negate(iteratee);
		}else{
			var keys = _.map(flatten(arguments,false,false,1),String);
			iteratee = function(value,key) {
				return !_.contains(keys,key);
			}
		}
		return _.pick(obj,iteratee,context);
	}
	_.defaults = createAssigner(_.allKeys,true);

	_.isEqual = function(a,b) {
		return eq(a,b);
	}
	_.isEmpty = function(obj) {
		if(obj == null) return true;
		if(isArrayLike(obj)&&(_.isArray(obj) || _.isArguments(obj)))
			return obj.length === 0;
		return _.keys(obj).length === 0;
	}
	_.isElement = function(obj) {
		return !!(obj && obj.nodeType === 1)
	}
	_.isArray = nativeKeys || function(obj) {
		return toString.call(obj) == '[object Array]'
	}
	_.isObject = function(obj) {
		var type = typeof obj;
		return type == 'function' || type === 'object' && !!obj;
	}
	_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'],function(name))
		 {
		 	_['is'+name] = function(obj) {
		 		return toString.call(obj) === '[object'+name+']';
		 	}
		 }

	if(!_.isArguments(arguments)){
		_.isArguments = function(obj) {
			return _.has(obj,'cellee')
		}
	}

	if(typeof /./ != 'function' && typeof Int8Array != 'object') {
		_.isFunction = function(obj) {
			return typeof obj == 'function' || false;
		}	
	}

	_.isFinite = function(obj) {
		return isFinite(obj) && !isNaN(parseFloat(obj));
	}
	_.isNaN = function(obj) {
		return _.isNumber(obj) && obj !== +obj;
	}

	_.isBoolen = function(obj) {
		return obj === true || obj === false || toString.call(obj) == '[object Boolean]'
	}

	_.isNull = function(obj) {
		return obj === null;
	}

	_.isUndedined = function(obj) {
		return obj === void 0;
	}
	_.has = function(obj, key) {
		return obj != null && hasOwnProperty.call(obj,key)
	}
	_.noConflict = function(){
		root._ = previousUnderscore;
		return this;
	}

	_.identity = function(value) {
		return value;
	}
	_.constant = function(value) {
		return function(){
			return value;
		}
	}
		
	_.noop = function(){};
	_.property = property; 

	_.propertyOf = function(obj) {
		return obj == null ? function(){}:function(key) {
			return obj[key];
		}
	}
	_.random = function(min,max) {
		if(max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random()*(max-min+1))
	}
	_,now = Date.now || function(){
		return new Date().getTime();
	}




})