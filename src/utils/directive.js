import Vue from 'vue'
// import img from './../../static/img/common/loading.gif'

Vue.directive('imgUrl', function (el, binding) {
  el.style.backgroundColor = 'rgb(242,242,242)'
  if (!binding.oldValue) {
    var img = new Image()
    img.src = binding.value// -->binding.value指的是指令后的参数
    img.onload = function () {
      el.style.backgroundColor = ''
      el.src = binding.value
    }
  }
})
export {Vue}
