<template>
  <div class="main-with-header">
    <common-header></common-header>
    <div class="common-padding"></div>
    <mt-button class="common-parimary-btn common-btn-margin" @click="sendCard">
      发牌
    </mt-button>
    <div v-for="(items, index) in getCards" :key="index" class="people">
      <p>{{peopleMoney[index]}}</p>
      <div v-for="(item, index) in items" :key="index" class="cards" :class="{'red': ['♥','♦'].includes(item.color)}">
        <div>{{item.value}}</div>
        <div>{{item.color}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      cards: [],
      getCards: [],
      peopleNum: 3,
      peopleMoney: [],
      count: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
      color: ['♠', '♥', '♣', '♦']
    }
  },
  components: {},
  methods: {
    initMoney () {
      for (let i = 0; i < this.peopleNum; i ++) {
        this.peopleMoney.push(100)
      }
    },
    initCard () {
      let count = this.count
      let color = this.color
      this.cards = []
      count.map(val => {
        color.map(value => {
          let temp = {
            value: val,
            color: value
          }
          this.cards.push(temp)
        })
      })
    },
    sendCard () {
      let peopleNum = this.peopleNum
      let cards = JSON.parse(JSON.stringify(this.cards))
      this.getCards = []
      for (let i = 0; i < peopleNum; i++) {
        let tempCard = []
        for (let j = 0; j < 3; j++) {
          let randomNum = Math.floor(Math.random() * (cards.length - 1))
          let tempOne = cards[randomNum]
          cards.splice(randomNum, 1)
          tempCard.push(tempOne)
        }
        this.getCards.push(tempCard)
      }
      // console.log(cards, '剩余的牌')
      let temp = this.getCards.map(val => {
        return this.getCardsType(val)
      })
      for (let i = 0; i < temp.length; i++) {
        let flag = true
        for (let j = 0; j < temp.length; j++) {
          if (i !== j) {
            console.log(this.isBigger(temp[i], temp[j]), temp[i], temp[j])
            if (!this.isBigger(temp[i], temp[j])) {
              flag = false
            }
          }
        }
        // console.log(flag)
        if (flag) {
          this.peopleMoney[i] = this.peopleMoney[i] + (this.peopleMoney.length - 1) * 10
        } else {
          this.peopleMoney[i] = this.peopleMoney[i] - 10
        }
      }
      // console.log(temp)
      // temp.sort((a, b) => this.isBigger(a, b))
      // console.log(temp, 'temp')
      // if (this.isBigger(temp[0], temp[1])) {
      //   this.peopleMoney[0] = this.peopleMoney[0] + 3
      // }
    },
    isBigger (obj1, obj2) {
      if (obj1.type > obj2.type) {
        return true
      } else if (obj1.type === obj2.type) {
        if (obj1.option.join() === obj2.option.join()) {
          return false // 一样大
        } else if (this.isDuiZi(obj1.value)) {
          let duizi1 = ''
          let duizi2 = ''
          let danpai1 = ''
          let danpai2 = ''
          obj1.option.map(val => {
            if (obj1.option.filter(value => value === val).length === 1) {
              danpai1 = val
            } else {
              duizi1 = val
            }
          })
          obj2.option.map(val => {
            if (obj1.option.filter(value => value === val).length === 1) {
              duizi2 = val
            } else {
              danpai2 = val
            }
          })
          if ((duizi1 < duizi2) || ((duizi2 === duizi1) && (danpai2 > danpai1))) {
            return false
          }
          return true
        } else if ((obj1.option[2] < obj2.option[2]) || ((obj1.option[2] === obj2.option[2]) && (obj1.option[1] < obj2.option[1])) || ((obj1.option[2] === obj2.option[2]) && (obj1.option[1] === obj2.option[1]) && (obj1.option[0] < obj2.option[0]))) {
          return false
        }
        return true
      } else {
        return false
      }
    },
    getCardsType (arry) {
      let option = arry.map(val => {
        return this.count.indexOf(val.value)
      })
      option.sort((a, b) => a - b)
      if (this.isBaoZi(arry)) {
        return {
          type: 6, // 豹子
          value: arry,
          option
        }
      } else if (this.isJinHua(arry) && this.isShunZi(arry)) {
        return {
          type: 5, // 顺金
          value: arry,
          option
        }
      } else if (this.isJinHua(arry) && !this.isShunZi(arry)) {
        return {
          type: 4, // 金花
          value: arry,
          option
        }
      } else if (this.isShunZi(arry)) {
        return {
          type: 3, // 顺子
          value: arry,
          option
        }
      } else if (this.isDuiZi(arry)) {
        return {
          type: 2, // 对子
          value: arry,
          option
        }
      } else {
        return {
          type: 1, // 杂牌
          value: arry,
          option
        }
      }
    },
    isBaoZi (arry) {
      if ((arry[0].value === arry[1].value) && (arry[2].value === arry[1].value) && (arry[0].value === arry[2].value)) {
        return true
      }
      return false
    },
    isJinHua (arry) {
      if ((arry[0].color === arry[1].color) && (arry[2].color === arry[1].color) && (arry[0].color === arry[2].color)) {
        return true
      }
      return false
    },
    isShunZi (arry) {
      let index = []
      arry.map(val => {
        index.push(this.count.indexOf(val.value))
      })
      index.sort()
      if ((index[0] + 1 === index[1]) && (index[1] + 1 === index[2])) {
        return true
      }
      return false
    },
    isDuiZi (arry) {
      if ((arry[0].value === arry[1].value) || (arry[2].value === arry[1].value) || (arry[0].value === arry[2].value)) {
        return true
      }
      return false
    }
  },
  mounted () {
    this.initCard()
    this.initMoney()
    // let arry1 = [{color: '♥', value: 10}, {color: '♥', value: 9}, {color: '♥', value: 'J'}]
    // let arry2 = [{color: '♥', value: 8}, {color: '♦', value: 7}, {color: '♥', value: 'J'}]
    // let obj1 = this.getCardsType(arry1)
    // let obj2 = this.getCardsType(arry2)
    // console.log(obj1, obj2)
    // console.log(this.isBigger(obj1, obj2))
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .people{
    display: flex;
    justify-content: space-around;
    width: 100%;
    .cards{
      width: 156px/2;
      height: 212px/2;
      position: relative;
      border: 2px solid #000;
      margin: 20px 0;
      padding: 20px/2;
      font-size: 40px/2;
      line-height: 1;
    }
    .red{
      color: red;
    }
  }
</style>
