(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"2bac":function(t,o,e){"use strict";var n=e("dd78"),s=e.n(n);s.a},4366:function(t,o,e){"use strict";e.r(o);var n=e("ed05"),s=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(o,t,(function(){return n[t]}))}(i);o["default"]=s.a},"4ebf":function(t,o,e){"use strict";var n,s=function(){var t=this,o=t.$createElement;t._self._c},i=[];e.d(o,"b",(function(){return s})),e.d(o,"c",(function(){return i})),e.d(o,"a",(function(){return n}))},aeb7:function(t,o,e){"use strict";(function(t){e("9880");n(e("66fd"));var o=n(e("c587"));function n(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,e("543d")["createPage"])},c587:function(t,o,e){"use strict";e.r(o);var n=e("4ebf"),s=e("4366");for(var i in s)"default"!==i&&function(t){e.d(o,t,(function(){return s[t]}))}(i);e("2bac");var a,u=e("f0c5"),d=Object(u["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);o["default"]=d.exports},dd78:function(t,o,e){},ed05:function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e={data:function(){return{basePath:this.BASE_PATH,advImgs:["../../static/advImg/slide.jpg","../../static/advImg/slide02.jpg","../../static/advImg/slide03.jpg","../../static/advImg/slide04.jpg"],types:[],goodsList:[],goods:[]}},onLoad:function(){this.getAllType(),this.getTidGoods()},onPullDownRefresh:function(){this.goods=[],this.getAllType(),this.getTidGoods()},methods:{goDetail:function(o){t.navigateTo({url:"../detail/detail?gno="+o})},getAllType:function(){var o=this;t.request({url:this.BASE_PATH+"type/getAll",success:function(e){200==e.statusCode?(o.types=e.data,console.log(o.types)):t.showToast({title:"请求数据失败,请稍后重试..",icon:"none"})},fail:function(o){t.showToast({title:"请求失败，请检查网络连接...",icon:"none"}),console.log(o)}})},getTidGoods:function(){var o=this;t.request({url:this.BASE_PATH+"goods/getTidGoods",success:function(e){if(200==e.statusCode){o.goodsList=e.data;for(var n=o.goodsList.length,s=0;s<n;s++){o.goods.push({tno:e.data.tno,msg:o.goodsList[s].gInfo.split(":")});for(var i=0;i<o.goods[s].msg.length;i++)o.goods[s].msg[i]=o.goods[s].msg[i].split("||")}}else t.showToast({title:"请求数据失败,请稍后重试..",icon:"none"})},fail:function(o){t.showToast({title:"请求失败，请检查网络连接...",icon:"none"}),console.log(o)}})}}};o.default=e}).call(this,e("543d")["default"])}},[["aeb7","common/runtime","common/vendor"]]]);