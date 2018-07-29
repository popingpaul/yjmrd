// map.js
import {
    getLocation
} from '../../utils/util'
Page({
    data: {
        latitude:28.157217025756836,
        longitude:112.9512710571289,
        markers: [{
            iconPath: '../../icons/index.png',
            id: 0,
            latitude: 28.157217025756836,
            longitude: 112.9512710571289,
            width: 50,
            height: 50
        }],
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.21229
            }],
            color: "#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        controls: [{
            id: 1,
            iconPath: '../../icons/index.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }]
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
    },
    getLocation() {
        const that = this
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            complete: res => {
                console.log('complete',res)
            },
            fail: res => {
                console.log('fail',res)
            },
            success: res => {
                console.log('getLocationSuccess',res)
                const  {latitude,longitude} = res
                that.setData({latitude,longitude})
                // wx.openLocation({
                //     latitude: latitude,
                //     longitude: longitude,
                //     scale: 28
                // })
            }
        })
    },
   
    onLoad() {
        const that = this
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            that.getLocation()
                        }
                    })
                }
                that.getLocation()
            },
            complete(res) {
                console.log(res)
            }
        })


    }
})