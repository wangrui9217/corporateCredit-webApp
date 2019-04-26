<template>
  <div>
    <div class="receive-img"  v-if="!(imageListValue instanceof Array) && Object.keys(imageListValue).length !== 0">
      <img src="./../../../static/img/common/imgDelete.png" class="common-img-delete" @click="removeImg" v-if="!readonly"/>
      <img v-imgUrl="publicHost + imageListValue.attachmentPath" class="result-img" preview/>
    </div>
    <label>
      <div class="upload-text" v-if="showAdd">
        <img src="./../../../static/img/common/add.png" class="add-plus"/>
      </div>
      <slot name="upload-img" v-if="(imageListValue instanceof Object) && Object.keys(imageListValue).length === 0"></slot>
      <input type="file"  capture="camera" accept="image/png,image/gif,image/jpeg" class="hidden" @change="getBaseUrl($event)" v-if="!readonly"/>
    </label>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import {uploadFileByBase64Str} from '@/api/file'
export default{
  data () {
    return {
      image: null,
      temp: [],
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
    readonly: {
      type: Boolean,
      default: false
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
    publicHost () {
      return this.$store.state.dictionary.publicHost + '/'
    }
  },
  components: {},
  methods: {
    previewRefresh () {
      this.$previewRefresh()
    },
    removeImg () {
      MessageBox.confirm('是否删除该图片?').then(action => {
        this.imageListValue = {}
      })
    },
    getBaseUrl (e) {
      let file = e.target.files[0]
      let size = file.size
      const maxSize = 4 * 1024 // 4M大小
      if (size > maxSize * 1024) {
        this.$toast('图片大小不能超过4M')
        return
      }
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
            _this.imageListValue = attachmentUrl
          }
          _this.$previewRefresh()
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
  .hidden{
    display: none;
  }
  .receive-img{
    position: relative;
    .delect-icon{
      position: absolute;
      right: -20px/2;
      top: -30px/2;
      font-size: 50px/2;
      color: @lightBlue;
    }
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
      .result-img{
        max-width: 100%;
        max-height: 100%;
      }
      .add-plus{
        width: 60%;
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
      width: 260px/2;
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
