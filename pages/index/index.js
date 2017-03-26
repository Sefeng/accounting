var app = getApp();
const config = require('../../config/config.js');

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    motto: 'Hello World',
    userInfo: {},
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
      'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
      'info_circle', 'cancel', 'search', 'clear'
    ],
    outAmount: 0,
    inAmount: 0,
    list: []
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindAddTap: function() {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  updateUserInfo: function() {
    var userInfo = wx.getStorageSync('userInfo');
    var userId = wx.getStorageSync('user_id');
    var data = {
      user_id: userId,
      user_name: userInfo.nickName,
      user_pic: userInfo.avatarUrl,
      sex: userInfo.gender,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
    };

    wx.request({
      url: config.requestUrl+'?s=/index/index/updateUserInfo',
      dataType: "json",
      data: data,
      success: function (res) {

      }
    });
  },
  onLoad: function () {
    var that = this;
    var uid = wx.getStorageSync('user_id');
    var userName = wx.getStorageSync('user_name');
    var data  = {
      uid: uid
    };

    wx.request({
      url: config.requestUrl,
      dataType: "json",
      data: data,
      success: function (res) {

        res.data.list.map(function(val) {
          val.typeWayName = config.accountWay[val.type][val.type_id - 1].name;
          val.typeName = config.accountType[val.type];
        });
        that.setData({
          outAmount: res.data.outAmount,
          inAmount: res.data.inAmount,
          list: res.data.list
        });
      }
    });

    if (!userName) {
      that.updateUserInfo();
    }
  },

  tapName: function (event) {
    console.log(event);
  }
})
