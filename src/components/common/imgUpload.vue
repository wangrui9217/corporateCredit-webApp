<template>
  <div class="upload-img common-padding">
    <ul class="business-type no-margin" v-if="showTitle">
      <li class="list ">
        <label>{{title}}</label>
      </li>
    </ul>
    <div class="box">
      <template v-if="imageListValue instanceof Array && imageListValue.length > 0">
        <div class="upload-text"  v-for="(item, index) in imageListValue" :key="index"  >
          <img src="./../../../static/img/common/imgDelete.png" class="common-img-delete" @click="removeImg(item)"/>
          <img v-imgUrl="publicHost + item.attachmentPath" class="result-img" preview/>
        </div>
      </template>
      <div class="receive-img"  v-if="(Object.prototype.toString.call(imageListValue) === '[object Object]') && Object.keys(imageListValue).length !== 0" >
        <img src="./../../../static/img/common/imgDelete.png" class="common-img-delete" @click="removeImg()"/>
        <img v-imgUrl="publicHost + imageListValue.attachmentPath" class="result-img" preview="2"/>
      </div>

      <label>
        <div class="upload-text" v-if="showAdd">
          <img src="./../../../static/img/common/add.png" class="add-plus"/>
        </div>
        <slot name="upload-img" v-if="!(imageListValue instanceof Array) && !imageListValue"></slot>
        <input type="file"  capture="camera" accept="image/png,image/gif,image/jpeg" class="hidden" @change="getBaseUrl($event)"/>
      </label>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import {uploadFileByBase64Str} from '@/api/file'
export default{
  data () {
    return {
      image: null,
      temp: []
    }
  },
  props: {
    title: {
      default: '标题',
      type: String
    },
    imageList: {},
    showAdd: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    deleteIds: {
      type: Array,
      default: () => []
    },
    hasEdit: {
      type: Boolean
    }
  },
  computed: {
    imageListValue: {
      get: function () {
        return this.imageList
      },
      set: function (newValue) {
        this.$emit('update:imageList', newValue)
      }
    },
    deleteImgIds: {
      get: function () {
        return this.deleteIds
      },
      set: function (newValue) {
        this.$emit('update:deleteIds', newValue)
      }
    },
    // _hasEdit: {
    //   get(){
    //     return this.hasEdit
    //   },
    //   set(value){
    //     this.$emit('update:hasEdit', value)
    //   }
    // },
    publicHost () {
      return this.$store.state.dictionary.publicHost + '/'
    }
  },
  components: {},
  methods: {
    previewRefresh () {
      this.$previewRefresh()
    },
    removeImg (url) {
      MessageBox.confirm('是否删除该图片?').then(action => {
        if (this.imageListValue instanceof Array) {
          this.imageListValue.map(val => {
            if (val.attachmentPath === url.attachmentPath) {
              if(val.id != undefined){
                this.deleteImgIds.push(val.id)
                // this.$emit('update:hasEdit', true)
              }else{
                // this.$emit('update:hasEdit', false)
              }
              this.imageListValue.splice(this.imageListValue.indexOf(val), 1)
              this.$emit('deleteImg', val)
            }
          })
        } else {
          this.imageListValue = {
          }
        }
      })
    },
    getBaseUrl (e) {
      let file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)// 读出 base64
      let _this = this
      reader.onloadend = function () {
        const dataURL = reader.result
        const data = {
          fileName: file.name,
          fileStr: dataURL
        }
        _this.$indicator.open('图片上传中...')
        e.target.value = ''
        uploadFileByBase64Str(data).then(res => {
          _this.$indicator.close()
          if (res.code === 200) {
            let attachmentUrl = res.result[0]
            attachmentUrl.fileStr = dataURL
            if (_this.imageListValue instanceof Array) {
              _this.imageListValue.push(attachmentUrl)
              // _this.$emit('update:hasEdit', true)
            } else {
              _this.imageListValue = attachmentUrl
            }
            _this.$previewRefresh()
          }
        }).catch(() => {
          _this.$indicator.close()
        })
      }
    }
  },
  watch: {
    imageListValue () {
      this.previewRefresh()
    }
  }
}
</script>
<style lang="less">
  #fileInput {
    display: none;
  }
  .box{
    .img-preview{
      display: none;
    }
  }
</style>
<style lang='less' scoped>
  @import "./../../public/comment";
  .delect-icon{
    position: absolute;
    right: -20px/2;
    top: -30px/2;
    font-size: 50px/2;
    color: @lightBlue;
  }
  .hidden{
    display: none;
  }
  .upload-img{
    padding-bottom: 10px/2;
    margin-bottom: 10px/2;
    background-color: #fff;
    .business-type{
      margin: 20px auto;
    }
    .no-margin{
      margin: 0;
    }
    .upload-text{
      background: #F2F2F2;
      width: 160px/2;
      height: 160px/2;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px/2 20px/2;
      position: relative;
      .result-img{
        max-width: 100%;
        max-height: 100%;
      }
      .add-plus{
        width: 60%;
      }
    }
    .receive-img{
      height: 160px/2;
      position: relative;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .box{
    display: flex;
    flex-wrap: wrap;
  }
  .list{
    width: 100%;
    height: 104px/2;
    display: flex;
    align-items: center;
    font-size: 32px/2;
    color: #333333;
    background-color: #fff;
    margin-bottom: 5px/2;
    label{
      //width: 260px/2;
    }
    .text-1{
      font-size: 28px/2;
      color: #999999;
    }
    .text-2{
      color: @lightBlue;
    }
  }

</style>
