<template>
  <div class="select">
    <div>{{label}}</div>
    <div @click="popupVisibleShow" class="showPlace">
      <div>{{selected_name}}</div>
      <img src="./../../../static/img/common/right.png" class="img-right"/>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="11">
      <div class="btn-group">
        <div @click="popupVisible=false">取消</div>
        <div @click="choseValue">确认</div>
      </div>
         <mt-picker :slots="slots" @change="onSexChange" :visible-item-count="5" :show-toolbar="false" class="box" :valueKey="keyName"></mt-picker>
       </mt-popup>
  </div>
</template>
<script>
  import clone from 'clone'
  export default{
    data () {
      return {
        popupVisible: false,
        tempValue: '',
      }
    },
    props: {
      option: {
        type: Array,
      },
      label: {
        default: '标题',
        type: String
      },
      keyName: {
        type: String
      },
      value: {
        type: String
      },
      selectedValue: {
      },
      placeholder: {
        default: '请选择'
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      slots () {
        const option = clone(this.option)
        const temp =  [{
          flex: 1,
          values: option,
          className: 'slot1',
          textAlign: 'center'
        }]
        return temp
      },
      selected_value: {
        get: function () {
          return this.selectedValue
        },
        set: function (newValue) {
          this.$emit('update:selectedValue', newValue)
        }
      },
      selected_name () {
        if (this.selected_value || this.selected_value === 0) {
          const obj = this.option.find(val => val[this.value] === this.selected_value)
          return obj ? obj[this.keyName] : this.placeholder
        } else {
          return this.placeholder
        }
      }
    },
    methods: {
      choseValue () {
        this.selected_value = this.tempValue[this.value]
        this.popupVisible = false
      },
      popupVisibleShow () {
        if (this.readonly) {
          return
        }
        this.popupVisible = true
      },
      onSexChange (val) {
        this.tempValue = val.values[0]
      }
    }
  }
</script>
<style lang='less' scoped>
  .select{
    height: 104px/2;
    margin-bottom: 2px/2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px/2;
    background-color: #fff;
    padding: 0 30px/2;
  }
  .showPlace{
    min-width: 200px/2;
    display: flex;
    align-items: center;
    line-height: 1;
    justify-content: flex-end;
    .img-right{
      width: 16px/2;
      margin: 0 20px/2;
    }
  }
  .btn-group{
    display: flex;
    padding: 20px/2 20px/2;
    z-index: 999;
    justify-content: space-between;
    border-bottom: solid 0.02666667rem #eaeaea;
    color: #26a2ff;
    &>div{
      flex: 1;
      text-align: center;
      padding: 0 30px/2;
    }
  }
  .box{
    width: 100vw;
  }
</style>
