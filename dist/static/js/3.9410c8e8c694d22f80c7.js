webpackJsonp([3],{282:function(t,e,r){r(470);var i=r(2)(r(347),r(544),"data-v-54eefe32",null);t.exports=i.exports},321:function(t,e,r){t.exports={default:r(323),__esModule:!0}},322:function(t,e,r){"use strict";e.__esModule=!0;var i=r(321),o=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=function(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return(0,o.default)(t)}},323:function(t,e,r){r(100),r(325),t.exports=r(6).Array.from},324:function(t,e,r){"use strict";var i=r(20),o=r(49);t.exports=function(t,e,r){e in t?i.f(t,e,o(0,r)):t[e]=r}},325:function(t,e,r){"use strict";var i=r(19),o=r(12),n=r(31),a=r(97),c=r(96),s=r(50),u=r(324),f=r(99);o(o.S+o.F*!r(98)(function(t){Array.from(t)}),"Array",{from:function(t){var e,r,o,d,m=n(t),l="function"==typeof this?this:Array,h=arguments.length,p=h>1?arguments[1]:void 0,g=void 0!==p,y=0,v=f(m);if(g&&(p=i(p,h>2?arguments[2]:void 0,2)),void 0==v||l==Array&&c(v))for(e=s(m.length),r=new l(e);e>y;y++)u(r,y,g?p(m[y],y):m[y]);else for(d=v.call(m),r=new l;!(o=d.next()).done;y++)u(r,y,g?a(d,p,[o.value,y],!0):o.value);return r.length=y,r}})},347:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(322),o=r.n(i),n=r(91),a=r.n(n),c=r(48),s=r(93);e.default={data:function(){return{imgModalList:[],imgList:[]}},components:{},methods:a()({},r.i(c.c)({setCreditInfo:"SET_CREDIT_INFO"}),{nextStep:function(){this.imgList=this.imgModalList.map(function(t){return{category:"boardDirectors",resourceType:t.fileType,resourceUrl:t.attachmentPath,resourceName:t.attachmentName}});var t=this.creditInfo,e=this.creditInfo.baseResourceModel||[];e=e.filter(function(t){return"boardDirectors"!==t.category}),e=[].concat(o()(e),o()(this.imgList)),t.baseResourceModel=e,this.setCreditInfo(t),this.$router.push("./credit-authorization")},initData:function(){var t=this.creditInfo.baseResourceModel||[],e=t.filter(function(t){return"boardDirectors"===t.category});this.imgModalList=e.map(function(t){return{category:"boardDirectors",fileType:t.resourceType,attachmentPath:t.resourceUrl,attachmentName:t.resourceName}})},getCustomer:function(){var t=this;r.i(s.d)({category:"",ownerId:this.$route.query.companyId}).then(function(e){if(200===e.code&&e.result instanceof Array){var r=e.result.filter(function(t){return"boardDirectors"===t.category});t.imgModalList=r.map(function(t){return{category:"boardDirectors",fileType:t.resourceType,attachmentPath:t.resourceUrl,attachmentName:t.resourceName}})}}).catch(function(){})}}),created:function(){this.hideSubmit?this.initData():this.getCustomer()},computed:a()({hideSubmit:function(){return!this.$route.query.state}},r.i(c.b)({creditInfo:function(t){return t.app.creditInfo}}))}},415:function(t,e,r){e=t.exports=r(267)(),e.push([t.i,"",""])},470:function(t,e,r){var i=r(415);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);r(268)("61541b86",i,!0)},544:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"main-with-header main-with-bottom common-bg"},[r("common-header"),t._v(" "),t.hideSubmit?r("common-step",{attrs:{activeStep:3,option:["企业信息","法人信息","人脸识别","股东授权","征信授权","授信成功"]}}):t._e(),t._v(" "),r("div",[r("img-upload",{attrs:{title:"董事会决议（加盖公章）",imageList:t.imgModalList},on:{"update:imageList":function(e){t.imgModalList=e},"update:image-list":function(e){t.imgModalList=e}}}),t._v(" "),t.hideSubmit?r("mt-button",{staticClass:"common-parimary-btn common-btn-margin",on:{click:t.nextStep}},[t._v("下一步")]):t._e()],1)],1)},staticRenderFns:[]}}});