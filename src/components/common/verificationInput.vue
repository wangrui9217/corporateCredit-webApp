<template>
  <div>
    <div class="write-input">
      <input ref="input" type="number" maxlength="2"
             class="realInput" v-model="photoNum"
              @keydown="delNum">
      <li v-for="(disInput, index) of disInputs"
          :class="{'input-active': photoNum.length === index || photoNum.length > index || index === 0}">
        <input maxlength="1" disabled v-model="disInput.value">
      </li>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      disInputs: []
    }
  },
  props: {
    maxLength: {
      type: Number,
      default: 6
    },
    inputNum: {}
  },
  computed: {
    photoNum: {
      get: function () {
        return this.inputNum
      },
      set: function (newValue) {
        if (newValue.length > this.maxLength) {
          return
        }
        this.$emit('update:inputNum', newValue)
      }
    }
  },
  methods: {
    delNum () {    // 删除
      let oEvent = window.event
      if (oEvent.keyCode === 8) {
        if (this.photoNum.length > 0) {
          this.disInputs[this.photoNum.length - 1].value = ''
        }
      }
    }
  },
  watch: {
    photoNum: {
      handler (newName, oldName) {
        for (let i = 0; i < this.maxLength; i++) {
          this.$set(this.disInputs, i, {value: this.photoNum.charAt(i) || ''})
        }
      },
      immediate: true
    }

  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .input-active{
    border-color: @lightBlue !important;
  }
  .write-input {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    li {
      width: 100px/2;
      height: 100px/2;
      border: .04rem solid #E7E7E7;
      border-radius: .25rem;
      list-style-type: none;
      margin: 0 .11rem;
      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        resize: none;
        outline: none;
        border: 0;
        width: 100%;
        height: 100%;
        border-radius: .25rem;
        text-align: center;
        font-size: 16px;
        background: none !important;
      }
    }
    .realInput {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      resize: none;
      outline: none;
      border: 0;
      z-index: 50;
      position: absolute;
      padding: .61rem 0;
      background: none;
      display: block;
      margin-left: -30%;
      opacity: 0;
      caret-color: #fff;
      color: #000;
      text-indent: -5rem;
      font-size: .63rem;
      width: 150%;
      top: 1px;
    }
  }
</style>
