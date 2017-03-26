var app = getApp();
const config = require('../../config/config.js');

Page({
  data: {
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

    if (!userInfo) {
      return;
    }
    var data = {
      userId: userId,
      userName: userInfo.nickName,
      userPic: userInfo.avatarUrl,
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
  getIndexData: function () {
    var that = this;
    var uid = wx.getStorageSync('user_id');
    var data  = {
      uid: uid
    };

    wx.request({
      url: config.requestUrl,
      dataType: "json",
      data: data,
      success: function (res) {
        var accountWay = res.data.accountWay;

        app.globalData.accountWay = accountWay;

        res.data.list.map(function(val) {
          val.typeWayName = accountWay.accountWay[val.type][val.type_id - 1].name;
          val.typeName = accountWay.accountType[val.type];
        });
        that.setData({
          outAmount: res.data.outAmount,
          inAmount: res.data.inAmount,
          list: res.data.list
        });
      }
    });
  },
  onLoad: function () {

  },
  onReady: function () {
    var that = this;
    var userName = wx.getStorageSync('user_name');

    that.getIndexData();
    if (!userName) {
      that.updateUserInfo();
    }
  },

  deleteRecord: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '删除这条记录？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: config.requestUrl+'?s=/index/index/delAccountRecord',
            dataType: "json",
            data: {id: id},
            success: function (res) {
              that.getIndexData();
            }
          });
        }
      }
    })
  }
});