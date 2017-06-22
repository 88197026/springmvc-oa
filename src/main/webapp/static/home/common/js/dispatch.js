/**
 * Created by qiaofu on 3/4/16.
 * 全局事件分发
 */
var event = require('@ali/kissy-event-custom');

var dispatch = event.Target;

/**
dispatch.on('haha', function(e) {
    console.log(e);
})

dispatch.fire('haha', {
    hello:'world'
});
*/

module.exports = dispatch;
