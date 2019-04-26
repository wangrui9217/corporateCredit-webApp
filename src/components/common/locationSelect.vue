<template>
  <div class="select">
    <div>{{label}}</div>
    <div @click="popupVisibleShow" class="showPlace">
      <div>{{selected_name}}</div>
      <img src="./../../../static/img/common/right.png" class="img-right"/>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="city-list">
      <div class="btn-group">
        <div @click="popupVisible=false">取消</div>
        <div @click="choseValue">确认</div>
      </div>
      <mt-picker :slots="myAddressSlots" @change="onAddressChange" valueKey="label"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        popupVisible: false,
        tempValue: '',
        chosedList: [],
        privinceList: [],
        cityList: [],
        districtList: [],
        chosedProvince: '',
        chosedCity: '',
        chosedDistrict: '',
        areapicker: ''
      }
    },
    computed: {
      myAddressSlots () {
        return [
          {
            flex: 1,
            values: this.privinceList,
            className: 'slot1',
            textAlign: 'center'
          },
          {
            pider: true,
            content: '-',
            className: 'slot2'

          }, {
            flex: 1,
            values: this.cityList,
            className: 'slot3',
            textAlign: 'center'
          },
          {
            pider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: this.districtList,
            className: 'slot5',
            textAlign: 'center'
          }
        ]
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
        if (this.selected_value.length > 0) {
          let temp = this.codeToLabel(this.selected_value)
          return `${temp[0] ? temp[0] : ''}${temp[1] ? temp[1] : ''}${temp[2] ? temp[2] : ''}`
        } else {
          return this.placeholder
        }
      },
      ...mapState({
        areaList: state => state.dictionary.areaList
      })
    },
    props: {
      option: {
        type: Array
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
      selectedValue: {},
      placeholder: {
        default: '请选择'
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      chosedProvince (oldval, newval) {
        this.areapicker.setSlotValues(2, this.getCityList(this.chosedProvince))
      },
      chosedCity (oldval, newval) {
        this.areapicker.setSlotValues(4, this.getDistrictList(this.chosedProvince, this.chosedCity))
      }
    },
    methods: {
      popupVisibleShow () {
        if (this.readonly) {
          return
        }
        this.popupVisible = true
        this.$nextTick(() => {
          this.init()
        })
      },
      choseValue () {
        this.popupVisible = false
        this.selected_value = this.labelToCode([this.chosedProvince, this.chosedCity, this.chosedDistrict])
      },
      labelToCode (arry) {
        let province = this.areaList.find(val => val.label === arry[0])
        let city = province['children'] instanceof Array && province['children'].length > 0 ? province['children'].find(val => val.label === arry[1]) : []
        let district = city['children'] instanceof Array && city['children'].length > 0 ? city['children'].find(val => val.label === arry[2]) : []
        return [province.value, city.value, district.value]
      },
      codeToLabel (arry) {
        let province = this.areaList.find(val => val.value === arry[0])
        let city = province['children'] instanceof Array && province['children'].length > 0 ? province['children'].find(val => val.value === arry[1]) : []
        let district = city['children'] instanceof Array && city['children'].length > 0 ? city['children'].find(val => val.value === arry[2]) : []
        return [province.label, city.label, district.label]
      },
      onAddressChange (picker) {
        this.areapicker = picker
        this.chosedProvince = this.areapicker.getSlotValue(0)
        this.chosedCity = this.areapicker.getSlotValue(2)
        this.chosedDistrict = this.areapicker.getSlotValue(4)
      },
      init () {
        this.privinceList = this.areaList.map(val => val.label)
        if (this.selected_value.length !== 0) {
          let temp = this.codeToLabel(this.selected_value)
          this.areapicker.setSlotValues(0, this.privinceList)
          this.areapicker.setSlotValues(2, this.getCityList(temp[0]))
          this.areapicker.setSlotValues(4, this.getDistrictList(temp[0], temp[1]))
          this.areapicker.setSlotValue(0, temp[0])
          this.areapicker.setSlotValue(2, temp[1])
          this.areapicker.setSlotValue(4, temp[2])
        }
      },
      getCityList (privinceName) {
        if (privinceName) {
          let cityList = this.areaList.find(val => val.label === privinceName)
          return cityList['children'] instanceof Array && cityList['children'].length > 0 ? cityList['children'].map(val => val.label) : []
        }
        return []
      },
      getDistrictList (privinceName, cityName) {
        if (privinceName && cityName) {
          let cityList = this.areaList.find(val => val.label === privinceName)
          let districtList = cityList['children'] instanceof Array && cityList['children'].length > 0 ? cityList['children'].find(val => val.label === cityName) : []
          return districtList['children'] instanceof Array && districtList['children'].length > 0 ? districtList['children'].map(val => val.label) : []
        } else {
          return []
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .city-list {
    width: 100%;
  }
  .select {
    height: 104px/2;
    margin-bottom: 2px/2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px/2;
    background-color: #fff;
    padding: 0 30px/2;
  }

  .showPlace {
    min-width: 200px/2;
    display: flex;
    align-items: center;
    line-height: 1;
    justify-content: flex-end;
    .img-right {
      width: 16px/2;
      margin: 0 20px/2;
    }
  }

  .btn-group {
    display: flex;
    padding: 20px/2 20px/2;
    z-index: 999;
    justify-content: space-between;
    border-bottom: solid 0.02666667rem #eaeaea;
    color: #26a2ff;
    & > div {
      flex: 1;
      text-align: center;
      padding: 0 30px/2;
    }
  }

  .box {
    width: 100vw;
  }
</style>
