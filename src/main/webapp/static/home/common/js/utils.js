'use strict';
var io = require('@ali/kissy-io');
var dom = require('@ali/kissy-dom');
var HttpURL = require('@ali/lib-httpurl');
var Eve = true;
/*
var hostName = "http://"+location.host;
*/
var hostName = "http://luban.alibaba-inc.com";
/*
var hostName = "http://luban.wapa.alibaba-inc.com";
*/
/*
var hostName = "http://yamato.test.taobao.org:8081";
*/
var utils = {
	extend : function extend(target, source) {
		for ( var prop in source) {
			if (source.hasOwnProperty(prop)) {
				target[prop] = source[prop];
			}
		}
	},
	_supportClassList : (function() {
		if (!!document.body.classList) {
			return true;
		}
		return false;
	})(),
	hasClass : function hasClass(ele, klass) {
		if (this._supportClassList) {
			return ele.classList.contains(klass);
		}
		var classes = ele.className;
		if (!classes) {
			return false;
		}
		if (classes == klass) {
			return true;
		}
		return classes.split(' ').indexOf(klass) > -1;
	},
	addClass : function addClass(ele, klass) {
		if (this._supportClassList) {
			return ele.classList.add(klass);
		}
		if (this.hasClass(ele, klass)) {
			return;
		}
		var classes = ele.className;
		if (classes) {
			klass = ' ' + klass;
		}
		ele.className += klass;
	},
	removeClass : function removeClass(ele, klass) {
		if (this._supportClassList) {
			return ele.classList.remove(klass);
		}
		var classes = ele.className;
		if (!classes) {
			return;
		}
		var arr = classes.split(' ');
		if (arr.indexOf(klass) > -1) {
			arr.splice(index, 1);
		}
		ele.className = arr.join(' ');
	},
	closest : function closest(node, selector) {
		var collection = [].slice.call(document.querySelectorAll(selector));
		var ret = null;
		for (var ele = node; ele.nodeType != ele.DOCUMENT_NODE; ele = ele.parentNode) {
			if (collection.indexOf(ele) != -1) {
				ret = ele;
				break;
			}
		}
		return ret;
	},
  mConsole:function(msg){
    if(Eve){
      console.dir(msg);
    }
  },
	mAlert:function(msg,status){
		if(window.app.$refs&&window.app.$refs.malert){
			window.app.$refs.malert.showAlert(msg,status);
		}else{
			alert(msg);
		}
	},
	malert:function(msg,status){
		if(window.app.$refs&&window.app.$refs.malert){
			window.app.$refs.malert.showAlert(msg,status);
		}else{
			alert(msg);
		}
	},
	hostName:hostName,
	checkEmptyStr:function (str){
	return str.trim().length == 0;

	},
	getAjax : function(url, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var res = JSON.parse(xmlhttp.responseText);
				callback(res)
			}
		}
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
    },
    IO: function(params, hiddenLoading) {
			  var lubanAppConfig = lubanAppConfig||{};
				var type = lubanAppConfig.ajaxType||"json";
			  switch (type){
					case "mtop":
						utils.mtopIo(params, hiddenLoading);
						break;
					case "json":
						utils.jsonIo(params, hiddenLoading);
						break
				}
    },

		mtopIo:function(params, hiddenLoading){
			var _params = {};
			_params.api = params.url;
			_params.type =  params.type || 'GET';
			_params.dataType = params.dataType || 'jsonp';
			_params.data = params.data || {};
			_params.enctype = 0 ;
			_params.v = params.v||"1.0";
			_params.timeout = params.timeout||20000;
			_params.success = function(res) {
				var data = res.data;
				if (data && data.lbBasicInfoDTO && data.lbBasicInfoDTO.status == 1) {
					var loginUrl = data.lbBasicInfoDTO.loginUrl + window.location.href;
					loginUrl=loginUrl.replace(/&amp;/g,"&");
					window.location.href = loginUrl;
					return;
				}else if(data && data.lbBasicInfoDTO && data.lbBasicInfoDTO.status == 2){
					//没权限
					var aclUrl = data.lbBasicInfoDTO.lubanAdminAclUrl;
					aclUrl=aclUrl.replace(/&amp;/g,"&");
					alert("您还没申请权限，即将跳转到申请页,请注意选择审批人");
					window.location.href = aclUrl;
					return;
				} else if(data&&data.status==2){
					var aclUrl = data.lubanAdminAclUrl;
					aclUrl=aclUrl.replace(/&amp;/g,"&");
					alert("您还没申请权限，即将跳转到申请页,请注意选择审批人");
					window.location.href = aclUrl;
					return;
				}else if(data&&data.status==1){
					var loginUrl = data.loginUrl + window.location.href;
					loginUrl=loginUrl.replace(/&amp;/g,"&");
					window.location.href = loginUrl;
					return;
				}
				params.success(res);
				if(!hiddenLoading){
					if(window.app&&window.app.$refs && window.app.$refs.loading){
						window.app.$refs.loading.closeLoading();
					}
				}
			};
			_params.error = function(res){
				if(!hiddenLoading){
					if(window.app&&window.app.$refs && window.app.$refs.loading){
						window.app.$refs.loading.closeLoading();
					}
				}
				params.error(res);
			}
			if(!hiddenLoading){
				if(window.app&&window.app.$refs && window.app.$refs.loading){
					window.app.$refs.loading.showLoadingImage();
				}
			}
			lib.mtop.request(_params, _params.success, _params.error)
		},




		jsonIo:function(params, hiddenLoading){
			var _params = {}
			_params.url = hostName+params.url;
			_params.type =  params.type || 'get';
			_params.dataType = params.dataType || 'jsonp';
			_params.data = params.data || {};
			_params.enctype=params.enctype||'';
			_params.contentType=params.contentType||'application/x-www-form-urlencoded';
			if (params.jsonpCallback) {
				_params.jsonpCallback = params.jsonpCallback;
			}
			_params.success = function(res) {
				var data = res.data;
				if (data && data.lbBasicInfoDTO && data.lbBasicInfoDTO.status == 1) {
					var loginUrl = data.lbBasicInfoDTO.loginUrl + window.location.href;
					loginUrl=loginUrl.replace(/&amp;/g,"&");
					window.location.href = loginUrl;
					return;
				}else if(data && data.lbBasicInfoDTO && data.lbBasicInfoDTO.status == 2){
					//没权限
					var aclUrl = data.lbBasicInfoDTO.lubanAdminAclUrl;
					aclUrl=aclUrl.replace(/&amp;/g,"&");
					alert("您还没申请权限，即将跳转到申请页,请注意选择审批人");
					window.location.href = aclUrl;
					return;
				} else if(data&&data.status==2){
					var aclUrl = data.lubanAdminAclUrl;
					aclUrl=aclUrl.replace(/&amp;/g,"&");
					alert("您还没申请权限，即将跳转到申请页,请注意选择审批人");
					window.location.href = aclUrl;
					return;
				}else if(data&&data.status==1){
					var loginUrl = data.loginUrl + window.location.href;
					loginUrl=loginUrl.replace(/&amp;/g,"&");
					window.location.href = loginUrl;
					return;
				}
				params.success(res);
				if(!hiddenLoading){
					if(window.app&&window.app.$refs && window.app.$refs.loading){
						window.app.$refs.loading.closeLoading();
					}
				}
			};
			_params.error = function(res){
				if(!hiddenLoading){
					if(window.app&&window.app.$refs && window.app.$refs.loading){
						window.app.$refs.loading.closeLoading();
					}
				}
				params.error(res);
			}
			if(!hiddenLoading){
				if(window.app&&window.app.$refs && window.app.$refs.loading){
					window.app.$refs.loading.showLoadingImage();
				}
			}
			io(_params);
		},
    DOM:dom
};

module.exports = utils;