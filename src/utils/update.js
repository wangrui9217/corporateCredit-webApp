var first = null
document.addEventListener('plusready', function () {
  var webview = plus.webview.currentWebview()
  plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      if (e.canBack) {
        webview.back()
      } else {
        if (!first) {
          first = new Date().getTime()
          mui.toast('再按一次退出应用')
          setTimeout(function () {
            first = null
          }, 1000)
        } else {
          if (new Date().getTime() - first < 1000) {
            plus.runtime.quit()
          }
        }
      }
    })
  })


  var btn = ["确定升级", "取消"]
  plus.runtime.getProperty(plus.runtime.appid, function (inf) {
    ver = inf.version
    $.ajax({
      url: "http://218.4.57.4:19011/version",
      success: function (data) {
        if (data.result.version != ver) {
          var _msg = "发现新版本:V" + data.result.version
          mui.confirm(_msg, '升级确认', btn, function (e) {
            if (e.index == 0) { //执行升级操作
              plus.nativeUI.toast("正在准备环境，请稍后！")
              var dtask = plus.downloader.createDownload('http://218.4.57.4:19011/app/xieguan.apk', {}, function (d, status) {

                if (status == 200) {
                  var path = d.filename//下载apk
                  plus.runtime.install(path) // 自动安装apk文件
                } else {
                  plus.nativeUI.alert('版本更新失败:' + status)
                }
              })
              dtask.start()
            }
          })
        } else {
          console.log('当前版本号已是最新')
          if (ismanual) {
            mui.toast('当前版本号已是最新')
          }
          return
        }
      },
      error: function (xhr, type, errerThrown) {
        if (ismanual) {
          mui.toast('网络异常,请稍候再试')
        }
      }
    })

  })

})
