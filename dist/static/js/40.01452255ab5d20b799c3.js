webpackJsonp([40],{301:function(t,e,i){i(496);var s=i(2)(i(366),i(568),"data-v-fda4acd6",null);t.exports=s.exports},366:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{suggest:"",imageList:[]}},components:{},methods:{commit:function(){var t=this;return""===this.suggest?void this.$toast("输入内容不能为空"):this.suggest.length>200?void this.$toast("输入长度超过限制"):this.imageList.length>4?void this.$toast("上传图片超过限制"):(this.$indicator.open("提交中..."),void setTimeout(function(){t.$indicator.close(),t.$toast("您的信息反馈已成功提交，感谢您的参与！"),t.$router.go(-1)},3e3))}}}},441:function(t,e,i){e=t.exports=i(267)(),e.push([t.i,".title[data-v-fda4acd6]{height:1.17333333rem;font-size:.37333333rem;color:#999;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}.info[data-v-fda4acd6]{height:4.26666667rem;background-color:#fff;padding:.4rem;font-size:.37333333rem}.info .detail[data-v-fda4acd6]{width:100%;height:100%}.box[data-v-fda4acd6]{padding-top:.4rem;background-color:#fff}",""])},496:function(t,e,i){var s=i(441);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i(268)("20680f18",s,!0)},568:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main-with-header common-bg"},[i("common-header"),t._v(" "),i("div",[i("div",{staticClass:"title common-padding"},[i("span",[t._v("问题与意见")]),t._v(" "),i("span",[t._v(t._s(t.suggest.length)+"/200")])]),t._v(" "),i("div",{staticClass:"info"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.suggest,expression:"suggest"}],staticClass:"detail",attrs:{placeholder:"请描述您的问题，我们将及时跟进解决…"},domProps:{value:t.suggest},on:{input:function(e){e.target.composing||(t.suggest=e.target.value)}}})])]),t._v(" "),i("div",[i("div",{staticClass:"title common-padding"},[i("span",[t._v("图片(选填，提供问题截图)")]),t._v(" "),i("span",[t._v(t._s(t.imageList.length)+"/4")])]),t._v(" "),i("div",{staticClass:"box"},[i("img-upload",{attrs:{imageList:t.imageList,showTitle:!1},on:{"update:imageList":function(e){t.imageList=e},"update:image-list":function(e){t.imageList=e}}})],1)]),t._v(" "),i("mt-button",{staticClass:"common-parimary-btn common-btn-margin",on:{click:t.commit}},[t._v("提交")])],1)},staticRenderFns:[]}}});