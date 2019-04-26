<template>
  <div class="select">
    <div>{{label}}</div>
    <div @click="popupVisibleShow" class="showPlace">
      <div>{{selected_name}}</div>
      <img src="./../../../static/img/common/right.png" class="img-right"/>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <!--<mt-datetime-picker-->
      <!--v-model="pickerVisible"-->
      <!--type="date"-->
      <!--year-format="{value} 年"-->
      <!--month-format="{value} 月"-->
      <!--date-format="{value} 日">-->
    <!--</mt-datetime-picker>-->
  </div>
</template>
<script>
  export default{
    data () {
      return {
        pickerVisible: false,
        pickerValue: '',
        startDate: new Date('1970-1-1'),
        endDate: new Date('2070-1-1')
      }
    },
    props: {
      label: {
        default: '标题',
        type: String
      },
      placeholder: {
        default: '请选择'
      },
      selectedTime: {},
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      selected_time: {
        get: function () {
          return this.selectedTime
        },
        set: function (newValue) {
          this.$emit('update:selectedTime', newValue)
        }
      },
      selected_name () {
        return this.selected_time || this.placeholder
      }
    },
    methods: {
      popupVisibleShow () {
        if (this.readonly) {
          return
        }
        this.$refs.picker.open()
      },
      handleConfirm () {
        this.selected_time = this.$filter.dateFormat(this.pickerValue, 'yyyy-MM-dd')
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
    padding: 0 0.26666667rem;
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
    padding: 40px/2 20px/2;
    z-index: 999;
    justify-content: space-between;
    &>div{
      padding: 0 30px/2;
    }
  }
  .box{
    width: 100vw;
  }
</style>
