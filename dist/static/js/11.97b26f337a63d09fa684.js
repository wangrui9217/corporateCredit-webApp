webpackJsonp([11],{318:function(t,e,s){s(485);var a=s(2)(s(383),s(558),"data-v-8469ad3c",null);t.exports=a.exports},326:function(t,e,s){t.exports=s.p+"static/img/imag_chenggong@2x.a0aafcd.png"},327:function(t,e,s){t.exports=s.p+"static/img/imag_shibai@2x.fb51101.png"},383:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{state:"success",lastTime:10,interval:""}},components:{},methods:{countTime:function(){var t=this;this.interval=setInterval(function(){0===--t.lastTime&&(clearInterval(t.interval),t.$router.push({name:"index"}))},1e3)}},destroyed:function(){clearInterval(this.interval)},mounted:function(){this.countTime()}}},430:function(t,e,s){e=t.exports=s(267)(),e.push([t.i,".result[data-v-8469ad3c]{margin:1.06666667rem auto 0;text-align:center}.result .result-img[data-v-8469ad3c]{width:5.33333333rem}.result .text-1[data-v-8469ad3c]{font-size:.48rem;color:#333;line-height:.61333333rem;font-family:PingFang-SC-Medium}.result .text-2[data-v-8469ad3c]{font-size:.4rem;color:#999;text-align:center;line-height:.56rem;padding:.42666667rem 0 .85333333rem}.result .text-3[data-v-8469ad3c]{border:.02666667rem solid #2b64ff;border-radius:.53333333rem;width:4.8rem;height:1.06666667rem;font-size:.42666667rem;color:#2b64ff;text-align:center;margin:0 auto;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}",""])},485:function(t,e,s){var a=s(430);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(268)("83e94548",a,!0)},558:function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-with-header"},[a("common-header",{attrs:{showBack:!1}}),t._v(" "),a("div",{staticClass:"result"},["fail"===t.state?a("div",[a("img",{staticClass:"result-img",attrs:{src:s(327)}}),t._v(" "),a("p",{staticClass:"text-1"},[t._v("您的借款申请失败")]),t._v(" "),t._m(0)]):t._e(),t._v(" "),"success"===t.state?a("div",[a("img",{staticClass:"result-img",attrs:{src:s(326)}}),t._v(" "),a("p",{staticClass:"text-1"},[t._v("提额申请成功")]),t._v(" "),t._m(1)]):t._e(),t._v(" "),a("router-link",{staticClass:"text-3",attrs:{to:{name:"index"}}},[t._v(t._s(t.lastTime)+"s返回首页")])],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",{staticClass:"text-2"},[t._v("您申请的产品未能成功放款，"),s("br"),t._v("\n        请拨打 252646 联系我们的客服。")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",{staticClass:"text-2"},[t._v(" 您的申请已受理，请保持您的电话畅通，"),s("br"),t._v("\n        我们会在尽快时间联系你。")])}]}}});