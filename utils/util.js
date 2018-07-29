const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getLocation = (that) => {
  wx.getLocation({
    type: 'wgs84',
    success: (res) => {
      // 经纬度
      const {
        latitude,
        longitude
      } = res
      const {
        aK
      } = that.data
      wx.request({
        url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + aK + '&location=' + latitude + ',' + longitude + '&output=json',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          const {
            city
          } = res.data.result.addressComponent;
          that.setData({
            currentCity: city
          })
          wx.request({
            url: 'xxx' + city,
            data: {},
            header: {
              'content-type': 'application/json'
            },
            success:  (res) =>{
              that.setData({
                county: res.data,
              })
            },
          })
        }
      })

    },
    fail: function () {
      wx.showToast({
        title: '授权失败',
        icon: 'success',
        duration: 1000
      })
    }
  })
}
module.exports = {
  formatTime,
  getLocation
}