webpackJsonp([23],{269:function(t,i,e){e(454);var o=e(2)(e(334),e(528),"data-v-226a81e0",null);t.exports=o.exports},334:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=e(385),n=e.n(o);i.default={data:function(){return{cards:[],getCards:[],peopleNum:3,peopleMoney:[],count:[2,3,4,5,6,7,8,9,10,"J","Q","K","A"],color:["♠","♥","♣","♦"]}},components:{},methods:{initMoney:function(){for(var t=0;t<this.peopleNum;t++)this.peopleMoney.push(100)},initCard:function(){var t=this,i=this.count,e=this.color;this.cards=[],i.map(function(i){e.map(function(e){var o={value:i,color:e};t.cards.push(o)})})},sendCard:function(){var t=this,i=this.peopleNum,e=JSON.parse(n()(this.cards));this.getCards=[];for(var o=0;o<i;o++){for(var r=[],s=0;s<3;s++){var a=Math.floor(Math.random()*(e.length-1)),u=e[a];e.splice(a,1),r.push(u)}this.getCards.push(r)}for(var p=this.getCards.map(function(i){return t.getCardsType(i)}),l=0;l<p.length;l++){for(var c=!0,d=0;d<p.length;d++)l!==d&&(console.log(this.isBigger(p[l],p[d]),p[l],p[d]),this.isBigger(p[l],p[d])||(c=!1));this.peopleMoney[l]=c?this.peopleMoney[l]+10*(this.peopleMoney.length-1):this.peopleMoney[l]-10}},isBigger:function(t,i){if(t.type>i.type)return!0;if(t.type===i.type){if(t.option.join()===i.option.join())return!1;if(this.isDuiZi(t.value)){var e="",o="",n="",r="";return t.option.map(function(i){1===t.option.filter(function(t){return t===i}).length?n=i:e=i}),i.option.map(function(i){1===t.option.filter(function(t){return t===i}).length?o=i:r=i}),!(e<o||o===e&&r>n)}return!(t.option[2]<i.option[2]||t.option[2]===i.option[2]&&t.option[1]<i.option[1]||t.option[2]===i.option[2]&&t.option[1]===i.option[1]&&t.option[0]<i.option[0])}return!1},getCardsType:function(t){var i=this,e=t.map(function(t){return i.count.indexOf(t.value)});return e.sort(function(t,i){return t-i}),this.isBaoZi(t)?{type:6,value:t,option:e}:this.isJinHua(t)&&this.isShunZi(t)?{type:5,value:t,option:e}:this.isJinHua(t)&&!this.isShunZi(t)?{type:4,value:t,option:e}:this.isShunZi(t)?{type:3,value:t,option:e}:this.isDuiZi(t)?{type:2,value:t,option:e}:{type:1,value:t,option:e}},isBaoZi:function(t){return t[0].value===t[1].value&&t[2].value===t[1].value&&t[0].value===t[2].value},isJinHua:function(t){return t[0].color===t[1].color&&t[2].color===t[1].color&&t[0].color===t[2].color},isShunZi:function(t){var i=this,e=[];return t.map(function(t){e.push(i.count.indexOf(t.value))}),e.sort(),e[0]+1===e[1]&&e[1]+1===e[2]},isDuiZi:function(t){return t[0].value===t[1].value||t[2].value===t[1].value||t[0].value===t[2].value}},mounted:function(){this.initCard(),this.initMoney()}}},385:function(t,i,e){t.exports={default:e(386),__esModule:!0}},386:function(t,i,e){var o=e(6),n=o.JSON||(o.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}},399:function(t,i,e){i=t.exports=e(267)(),i.push([t.i,".people[data-v-226a81e0]{display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;width:100%}.people .cards[data-v-226a81e0]{width:2.08rem;height:2.82666667rem;position:relative;border:.05333333rem solid #000;margin:.53333333rem 0;padding:.26666667rem;font-size:.53333333rem;line-height:1}.people .red[data-v-226a81e0]{color:red}",""])},454:function(t,i,e){var o=e(399);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(268)("d4bf63fe",o,!0)},528:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"main-with-header"},[e("common-header"),t._v(" "),e("div",{staticClass:"common-padding"}),t._v(" "),e("mt-button",{staticClass:"common-parimary-btn common-btn-margin",on:{click:t.sendCard}},[t._v("\n    发牌\n  ")]),t._v(" "),t._l(t.getCards,function(i,o){return e("div",{key:o,staticClass:"people"},[e("p",[t._v(t._s(t.peopleMoney[o]))]),t._v(" "),t._l(i,function(i,o){return e("div",{key:o,staticClass:"cards",class:{red:["♥","♦"].includes(i.color)}},[e("div",[t._v(t._s(i.value))]),t._v(" "),e("div",[t._v(t._s(i.color))])])})],2)})],2)},staticRenderFns:[]}}});