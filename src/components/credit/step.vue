<template>
  <div class="container">
  <ul class="step">
    <li :class="{'line-1' : activeStep < index + 1, 'line-2': activeStep == index + 1, 'line-3': activeStep > index + 1}" v-for="(item ,index) in option" :key="index">
      <div class="info">
        <div class="point">
          <div class="step-1" v-if="activeStep < index "></div>
          <div class="step-2" v-if="activeStep == index "></div>
          <div class="step-3" v-if="activeStep > index ">✓</div>
        </div>
        <div :class="{'tip-1' : activeStep < index , 'tip-2': activeStep == index , 'tip-3': activeStep > index }">{{item}}</div>
      </div>
    </li>
    </ul>
  </div>

</template>
<script>
export default{
  data () {
    return {
    }
  },
  components: {},
  methods: {
  },
  props: {
    activeStep: {
      type: Number,
      default: 0
    },
    option: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang='less' scoped>
  .container{
  }
  .step{
    background-color: #fff;
    height: 180px/2;
    display: flex;
    padding: 62px/2 96px/2 0;
    overflow: auto;
    .line-1{
      border-top: 1px solid #CCCCCC;
    }
    .line-2{
      border-top: 1px solid #2B64FF;
    }
    .line-3{
      border-top: 1px solid #2B64FF;
    }
    &>li{
      position: relative;
      flex: 0 0 160/2px;
      .info{
        z-index: 9;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: -22px/2;
        left: 0;
        transform: translate(-50%,0%);
      }
      .point{
        height: 44px/2;
        width: 44px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        .step-1{
          background-color: #CCCCCC;
          width: 16px/2;
          height: 16px/2;
          border-radius: 50%;
        }
        .step-3{
          width: 44px/2;
          height: 44px/2;
          border-radius: 50%;
          border: 1px solid #2B64FF;
          color: #2B64FF;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
        }
        .step-2{
          width: 38px/2;
          height: 38px/2;
          border-radius: 50%;
          border: 10px/2 solid #2B64FF;
          background-color: #fff;
        }
      }
      .tip-1{
        padding-top: 16px/2;
        line-height: 40px/2;
        color: #999999;
        font-size: 28px/2;
      }
      .tip-2{
        padding-top: 16px/2;
        line-height: 40px/2;
        color: #333333;
        font-size: 28px/2;
        font-weight: bold;
      }
      .tip-3{
        padding-top: 16px/2;
        line-height: 40px/2;
        color: #333333;
        font-size: 28px/2;
      }
    }
    &>li:nth-last-child(1){
      flex: 0;
      .info{
        min-width: 144px/2;
      }
    }
  }
</style>
