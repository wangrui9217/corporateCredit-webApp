webpackJsonp([38],{306:function(t,e,a){a(453);var o=a(2)(a(371),a(527),"data-v-222d3fae",null);t.exports=o.exports},371:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(101),n=a(95);e.default={data:function(){return{checkbox:!1,productInfo:"",loanAmount:"",value1:111,options:[{label:"一次性还本付息",value:111}],value2:1,options2:[{label:"1期",value:1}],value3:"",accountList:[],value4:""}},components:{},methods:{goApply:function(){var t=this;if(!this.loanAmount||Number(this.loanAmount)>Number(this.productInfo.creditAmount)||Number(this.loanAmount)>Number(this.productInfo.maxQuota))return void this.$toast("请输入有效借款金额");if(!this.value3)return void this.$toast("请选择借款用途");if(!this.value4)return void this.$toast("请选择对公账户");if(!this.checkbox)return void this.$toast("请阅读并同意条款");var e={loanAmount:this.loanAmount,periods:this.value2,proRate:this.productInfo.proRate,productId:this.$route.query.id,interestLoan:this.interestLoan,accountId:this.value4,purpose:this.value3};this.$indicator.open(),a.i(o.b)(e).then(function(e){t.$indicator.close(),200===e.code&&t.$router.push("/project-apply-result")}).catch(function(){t.$indicator.close()})},getProductDetail:function(){var t=this;this.$indicator.open();var e=this.$route.query.id;a.i(o.c)(e).then(function(e){t.$indicator.close(),200===e.code&&(t.productInfo=e.result)}).catch(function(){t.$indicator.close()})},getAmountNumberInfo:function(){var t=this;this.$indicator.open();var e=this.$store.state.app.mineInfo.companyModel.id;a.i(n.b)(e).then(function(e){if(t.$indicator.close(),t.loaded=!0,200===e.code){var a=e.result instanceof Array?e.result:[];t.accountList=a.map(function(t){return t.accountNumber=t.bankName+"(尾数"+t.accountNumber.substring(t.accountNumber.length-4)+")",t})}}).catch(function(){t.$indicator.close()})}},computed:{interestLoan:function(){new Date;return(Number(this.loanAmount)*this.productInfo.proRate/100/365).toFixed(2)}},mounted:function(){this.getProductDetail(),this.getAmountNumberInfo()}}},398:function(t,e,a){e=t.exports=a(267)(),e.push([t.i,".box[data-v-222d3fae]{height:4.6rem;background:#fff}.box .text-1[data-v-222d3fae]{font-size:.45333333rem;color:#333;line-height:1.49333333rem}.box .text-2[data-v-222d3fae]{font-size:.37333333rem;color:#999;line-height:1.33333333rem}.box .text-3[data-v-222d3fae]{display:-ms-flexbox;display:flex;font-size:.8rem;color:#333;text-align:right;height:1.28rem;-ms-flex-align:center;align-items:center}.box .text-3>div[data-v-222d3fae]:first-child{margin-right:.26666667rem}.list[data-v-222d3fae]{width:100%;height:1.38666667rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;font-size:.42666667rem;color:#333;background-color:#fff;margin-bottom:.06666667rem}.list label[data-v-222d3fae]{width:2.57333333rem}.list .text-1[data-v-222d3fae]{font-size:.37333333rem;color:#999}.list .text-2[data-v-222d3fae]{color:#2b64ff}.apply-detail[data-v-222d3fae]{font-size:.37333333rem;color:#999;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;line-height:.53333333rem;padding-top:.42666667rem;padding-bottom:.85333333rem}.apply-detail .text-1[data-v-222d3fae]{color:#2b64ff}.apply-detail .check-box[data-v-222d3fae]{margin-right:.13333333rem}",""])},453:function(t,e,a){var o=a(398);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(268)("3ca26d8c",o,!0)},527:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-with-header common-bg main-with-bottom"},[a("common-header"),t._v(" "),a("div",{staticClass:"box common-padding"},[a("div",{staticClass:"text-1"},[t._v("借款额度")]),t._v(" "),a("div",{staticClass:"text-3"},[a("div",[t._v("¥")]),t._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.loanAmount,expression:"loanAmount"}],attrs:{type:"number",placeholder:t.productInfo.minQuota+"元~"+t.productInfo.maxQuota+"元"},domProps:{value:t.loanAmount},on:{input:function(e){e.target.composing||(t.loanAmount=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"text-2"},[t._v("可借款总额度"+t._s(t.$filter.numberFormat(t.productInfo.creditAmount))+"元")])]),t._v(" "),a("div",{staticClass:"list common-padding"},[a("label",[t._v("产品名称")]),t._v(" "),a("div",[t._v("\n      "+t._s(t.productInfo.proName)+"\n    ")])]),t._v(" "),a("common-select",{attrs:{label:"借款用途",placeholder:"请选择借款用途",selectedValue:t.value3,option:t.$dict.getOptionByCode("010"),keyName:"name",value:"value"},on:{"update:selectedValue":function(e){t.value3=e},"update:selected-value":function(e){t.value3=e}}}),t._v(" "),a("common-select",{attrs:{label:"期数",placeholder:"请选择期数",selectedValue:t.value2,option:t.options2,keyName:"label",value:"value"},on:{"update:selectedValue":function(e){t.value2=e},"update:selected-value":function(e){t.value2=e}}}),t._v(" "),a("common-select",{attrs:{label:"还款方式",placeholder:"请选择还款方式",selectedValue:t.value1,option:t.options,keyName:"label",value:"value"},on:{"update:selectedValue":function(e){t.value1=e},"update:selected-value":function(e){t.value1=e}}}),t._v(" "),a("div",{staticClass:"list common-padding"},[a("label",[t._v("借款利率(年)")]),t._v(" "),a("div",[t._v("\n      "+t._s(t.productInfo.proRate)+"%\n    ")])]),t._v(" "),a("div",{staticClass:"list common-padding"},[a("label",[t._v("利息")]),t._v(" "),a("div",[t._v("\n      "+t._s(t.interestLoan)+"元\n    ")])]),t._v(" "),a("common-select",{attrs:{label:"对公账户",placeholder:"请选择对公账户",selectedValue:t.value4,option:t.accountList,keyName:"accountNumber",value:"id"},on:{"update:selectedValue":function(e){t.value4=e},"update:selected-value":function(e){t.value4=e}}}),t._v(" "),a("div",{staticClass:"apply-detail common-padding"},[a("span",{staticClass:"check-box"},[a("mu-checkbox",{model:{value:t.checkbox,callback:function(e){t.checkbox=e},expression:"checkbox"}})],1),t._v("\n    我已阅读并同意\n    "),a("router-link",{staticClass:"text-1",attrs:{to:"./agreement?id=2"}},[t._v("《借款申请书》")])],1),t._v(" "),a("mt-button",{staticClass:"common-parimary-btn",on:{click:t.goApply}},[t._v("\n    确认申请\n  ")])],1)},staticRenderFns:[]}}});