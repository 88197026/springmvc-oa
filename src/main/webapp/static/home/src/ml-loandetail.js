Vue.config.debug = true;
window.CDN_URL = require('../images/cdnurl.json');
addEventListener('DOMContentLoaded', function() {
	var opt = require('./ml-loandetail.vue');
	var app = new Vue(opt).$mount('#app');
	window.app = app;

})
