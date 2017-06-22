/*
* mtop 接口 分页加载器
* */
;(function(win) {
	'use strict';

	//节流函数
	function throttle(func, wait) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		var later = function () {
			previous = Date.now();
			timeout = null;
			result = func.apply(context, args);
		};
		return function () {
			var now = Date.now();
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0) {
				clearTimeout(timeout);
				timeout = null;
				previous = now;
				result = func.apply(context, args);
			} else if (!timeout) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	}

	function extend(target, obj) {
		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				target[k] = obj[k];
			}
		}
		return target;
	}
	function Pagination(options){
		var that = this;
		this.options = extend({
			loadMoreBottom: 0
		},(options || {}));

		var enableLoadMore = true;
		var options = this.options = extend({
			loadMoreBottom: 0,
			containerScroll:false
		},(options || {}));
		var container = this.container = document.querySelector(this.options.container);

		var scrollHandler = throttle(function () {
			if (enableLoadMore) {
				var loadMoreBottom = options.loadMoreBottom ? parseInt(options.loadMoreBottom) : 0;

				if(that.options.containerScroll){

					var scrollHeight = container.scrollHeight;
					var scrollTop = container.scrollTop;
					var height = container.offsetHeight;
					if (scrollTop.height != 0 && Math.floor(scrollTop+height+loadMoreBottom) >= (scrollHeight)) {
						options.loadMore && options.loadMore();
					}

				}else{
					var listRect = container.getBoundingClientRect();
					if (listRect.height != 0 && Math.floor(listRect.bottom) <= (window.innerHeight + loadMoreBottom)) {
						options.loadMore && options.loadMore();
					}

				}

			}

		}, 100);


		this.init = function (){
			//document.addEventListener('scroll', scrollHandler, false);
			//$(that.options.container).scroll(scrollHandler)
			if(that.options.containerScroll){
				that.container.addEventListener('scroll', scrollHandler, false);
			}else{
				document.addEventListener('scroll', scrollHandler, false);

			}
			return this;
		}
		this.destory = function (){
			enableLoadMore = false;
			if(that.options.containerScroll){
				that.container.removeEventListener('scroll', scrollHandler, false);
			}else{
				document.removeEventListener('scroll', scrollHandler, false);

			}
			return this;
		}

	}

	module.exports = Pagination;

})(window);