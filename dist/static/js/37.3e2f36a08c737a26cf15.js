webpackJsonp([37],{307:function(t,e,a){a(488);var o=a(2)(a(372),a(561),"data-v-a46c64b4",null);t.exports=o.exports},372:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(32),n=(a.n(o),a(33)),c=a.n(n),i=a(101),r=a(95);e.default={data:function(){return{productInfo:{},accountList:[]}},components:{},methods:{goApply:function(){var t=this;this.productInfo.companyId?0===this.accountList.length?c.a.confirm("",{title:"提示",message:"当前没有对公账户，是否前往添加？",showCancelButton:!0,confirmButtonText:"前往"}).then(function(e){t.$router.push("/add-account?companyId="+t.productInfo.companyId+"&&companyName="+t.productInfo.companyName)}):this.$router.push("/project-apply?id="+this.$route.query.id):c.a.confirm("",{title:"提示",message:"当前没有申请额度，是否前往申请？",showCancelButton:!0,confirmButtonText:"前往"}).then(function(e){t.$router.push("/credit-enterprise")})},getProductDetail:function(){var t=this,e=this.$route.query.id;this.$indicator.open("加载中..."),a.i(i.c)(e).then(function(e){200===e.code&&(t.productInfo=e.result,t.$indicator.close())}).catch(function(e){t.$indicator.close()})},getAmountNumberInfo:function(){var t=this;this.$indicator.open();var e=this.$store.state.app.mineInfo.companyModel.id;a.i(r.b)(e).then(function(e){t.$indicator.close(),t.loaded=!0,200===e.code&&(t.accountList=e.result instanceof Array?e.result:[])}).catch(function(){t.$indicator.close()})}},activated:function(){},mounted:function(){this.getProductDetail(),this.getAmountNumberInfo()}}},433:function(t,e,a){e=t.exports=a(267)(),e.push([t.i,".box[data-v-a46c64b4]{height:3.73333333rem;background-image:linear-gradient(-270deg,#4f95ff,#2b64ff)}.text-1[data-v-a46c64b4]{font-size:.42666667rem;color:#fff;line-height:1.2rem}.text-2[data-v-a46c64b4]{font-size:.42666667rem;color:#fff;line-height:.61333333rem;padding:.64rem 0 .21333333rem .42666667rem}.text-3[data-v-a46c64b4]{display:-ms-flexbox;display:flex;-ms-flex-pack:left;justify-content:left;-ms-flex-align:left;align-items:left}.text-3>div[data-v-a46c64b4]{width:2.77333333rem;text-align:left;font-size:.32rem;color:#999;line-height:.42666667rem}.text-3 .text-4[data-v-a46c64b4]{height:1.2rem;font-size:.85333333rem;color:#fff;line-height:1.2rem;padding-left:.42666667rem}.text-3 .project-time[data-v-a46c64b4]{margin-left:2.828rem}.text-3 .text-5[data-v-a46c64b4]{font-size:.48rem;color:#fff;line-height:1.2rem}.text-3 .text-6[data-v-a46c64b4]{font-size:.37333333rem;color:#fff;line-height:1.2rem}.text-3 .year[data-v-a46c64b4]{padding-left:.42666667rem}.text-3 .project-stage[data-v-a46c64b4],.text-3 .year[data-v-a46c64b4]{opacity:.8;font-size:.32rem;color:#fff;line-height:.32rem}.money-range[data-v-a46c64b4]{height:2.13333333rem;display:-ms-flexbox;display:flex;background:#fff;margin-bottom:.21333333rem;-ms-flex-pack:justify;justify-content:space-between}.money-range .money-range-left[data-v-a46c64b4]{padding:.42666667rem 0 .21333333rem .42666667rem;-ms-flex-align:left;align-items:left;font-size:.37333333rem;color:#999;line-height:.53333333rem}.money-range .money-range-left span[data-v-a46c64b4]{display:block;text-align:left;height:.53333333rem;line-height:.53333333rem;margin-bottom:.21333333rem}.money-range .money-range-right[data-v-a46c64b4]{padding:.42666667rem .42666667rem .21333333rem;font-size:.37333333rem;color:#333;text-align:right;line-height:.53333333rem}.money-range .money-range-right span[data-v-a46c64b4]{display:block;text-align:right;height:.53333333rem;line-height:.53333333rem;margin-bottom:.21333333rem}.project-content[data-v-a46c64b4]{padding:.42666667rem;background:#fff}.project-content .project-content-text1[data-v-a46c64b4]{height:.61333333rem;line-height:.61333333rem;margin-bottom:.32rem}.project-content .project-content-text1 .project-content-Characteristic[data-v-a46c64b4]{margin-right:.10666667rem;background:#fff;border:.05333333rem solid #2b64ff;width:.21333333rem;height:.21333333rem;display:inline-block;border-radius:50%}.project-content .project-content-text1 h4[data-v-a46c64b4]{font-size:.42666667rem;color:#333;line-height:.61333333rem}.project-content .project-content-text2[data-v-a46c64b4]{margin-bottom:.21333333rem}.project-content .project-content-text2[data-v-a46c64b4],.project-content .project-content-text3[data-v-a46c64b4]{font-size:.37333333rem;color:#666;line-height:.53333333rem}.project-content .project-content-text4[data-v-a46c64b4]{height:.61333333rem;line-height:.61333333rem;margin-bottom:.32rem;margin-top:.85333333rem}.project-content .project-content-text4 .project-content-Characteristic[data-v-a46c64b4]{margin-right:.10666667rem;background:#fff;border:.05333333rem solid #2b64ff;width:.21333333rem;height:.21333333rem;display:inline-block;border-radius:50%}.project-content .project-content-text4 h4[data-v-a46c64b4]{font-size:.42666667rem;color:#333;line-height:.61333333rem}.project-content .project-content-detail[data-v-a46c64b4]{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:left;align-items:left;line-height:.53333333rem;font-size:.37333333rem;margin-bottom:.10666667rem}.project-content .project-content-detail .project-content-detailText2[data-v-a46c64b4]{text-align:left;width:6.98666667rem;color:#666}.project-content .project-content-detail .project-content-detailText1[data-v-a46c64b4]{color:#999}.project-content .project-content-detail2[data-v-a46c64b4]{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:left;align-items:left;line-height:.53333333rem;font-size:.37333333rem}.project-content .project-content-detail2 .project-content-detailText2[data-v-a46c64b4]{text-align:left;width:6.98666667rem;color:#666}.project-content .project-content-detail2 .project-content-detailText1[data-v-a46c64b4]{color:#999}.project-content .project-content-detail3[data-v-a46c64b4]{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:left;align-items:left;line-height:.53333333rem;font-size:.37333333rem}.project-content .project-content-detail3 .project-content-detailText2[data-v-a46c64b4]{text-align:left;width:6.98666667rem;color:#666}.project-content .project-content-detail3 .project-content-detailText1[data-v-a46c64b4]{color:#999}.project-footer[data-v-a46c64b4]{height:1.30666667rem;width:100%;line-height:1.30666667rem;background-image:linear-gradient(-270deg,#4f95ff,#2b64ff);position:fixed;bottom:0}.project-footer .project-footer-btn[data-v-a46c64b4]{font-size:.48rem;color:#fff;letter-spacing:.00773333rem;text-align:center}",""])},488:function(t,e,a){var o=a(433);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(268)("5dfad77c",o,!0)},561:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-with-header common-bg"},[a("common-header",{attrs:{title:t.productInfo.proName}}),t._v(" "),a("div",{staticClass:"project-detail"},[a("div",{staticClass:"box"},[a("div",{staticClass:"text-2"},[t._v(t._s(t.productInfo.proName))]),t._v(" "),a("div",{staticClass:"text-3"},[a("div",[a("div",{staticClass:"text-4"},[t._v(t._s(t.productInfo.proRate)),a("span",{staticClass:"text-1"},[t._v("%")])]),t._v(" "),a("div",{staticClass:"year"},[t._v("七日年化收益率")])]),t._v(" "),a("div",{staticClass:"project-time"},[a("div",{staticClass:"text-5"},[t._v(t._s(t.productInfo.loanTrem)),a("span",{staticClass:"text-6"},[t._v(t._s(t.productInfo.loanTremType))])]),t._v(" "),a("div",{staticClass:"project-stage"},[t._v("产品期限")])])])]),t._v(" "),a("div",{staticClass:"money-range"},[t._m(0),t._v(" "),a("div",{staticClass:"money-range-right"},[a("span",[t._v(t._s(t.productInfo.minQuota)+"元~"+t._s(t.productInfo.maxQuota)+"元")]),t._v(" "),a("span",[t._v(t._s(t.$dict.getNameByCodeAndValue("002",t.productInfo.refundWay)))])])]),t._v(" "),a("div",{staticClass:"project-content"},[a("div",[t._m(1),t._v(" "),a("div",{staticClass:"project-content-text2"},[t._v(" "+t._s(t.productInfo.proTrait))])]),t._v(" "),a("div",[t._m(2),t._v(" "),a("div",[a("div",{staticClass:"project-content-detail"},[a("div",{staticClass:"project-content-detailText1"},[t._v("产品名称")]),t._v(" "),a("div",{staticClass:"project-content-detailText2"},[t._v(t._s(t.productInfo.proName))])]),t._v(" "),a("div",{staticClass:"project-content-detail"},[a("div",{staticClass:"project-content-detailText1"},[t._v("产品类型")]),t._v(" "),a("div",{staticClass:"project-content-detailText2"},[t._v(t._s(t.$dict.getNameByCodeAndValue("001",t.productInfo.proType)))])]),t._v(" "),a("div",{staticClass:"project-content-detail"},[a("div",{staticClass:"project-content-detailText1"},[t._v("风险说明")]),t._v(" "),a("div",{staticClass:"project-content-detailText2"},[t._v(t._s(t.productInfo.remark))])])])])]),t._v(" "),a("div",{staticClass:"project-footer"},[a("div",{staticClass:"project-footer-btn",on:{click:t.goApply}},[t._v("立即申请")])])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"money-range-left"},[a("span",[t._v("借款金额范围")]),t._v(" "),a("span",[t._v("还款方式")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project-content-text1 "},[a("h4",[a("span",{staticClass:"project-content-Characteristic"}),t._v("产品特点")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project-content-text4"},[a("h4",[a("span",{staticClass:"project-content-Characteristic"}),t._v("产品介绍")])])}]}}});