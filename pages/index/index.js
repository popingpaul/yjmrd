//index.js
//获取应用实例
const app = getApp()
const imageCDN = 'http://193.112.124.251:3000'

Page({
  data: {
    telphone: ['18390874731', '18390886797'],
    envImages: [{
      url: imageCDN + "/env01.jpg"
    }, {
      url: imageCDN + "/env03.jpg"
    }, {
      url: imageCDN + "/env04.jpg"
    }, {
      url: imageCDN + "/env05.jpg"
    }, {
      url: imageCDN + "/env06.jpg"
    }, {
      url: imageCDN + "/env07.jpg"
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onLocation(e) {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude + 0.001,
          longitude: longitude,
          name: '妖金美容店',
          address: "长沙市长沙县星沙街道开元路社区兆坤星悦荟1栋18层1818室",
          scale: 28
        })
      }
    })
  },
  onPhoneCall() {
    const that = this
    const telphone = that.data.telphone[0]
    wx.makePhoneCall({
      phoneNumber:telphone,
      fail:(res)=>{
        console.log('呼叫失败：',res)
      }
    })
  },

  onImageClick(e) {
    var current = e.target.dataset.src.url;
    console.log()
    //预览图片
    wx.previewImage({
      current: current,
      urls: this.data.envImages.map(item=>item.url),
    });
  }
})