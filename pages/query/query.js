var app = getApp();
const config = require('../../config/config.js');
const util = require('../../utils/util.js');

Page({
  data: {
    accountType: 1,
    accountTypeItems: [
      {name: 1, value: '支出', checked: 'true'},
      {name: 2, value: '收入'}
    ],

    typeId: 0,
    start: util.formatTime(new Date()),
    end: util.formatTime(new Date()),
    result: {}
  },

onLoad: function () {
    let outArray = [{id: 0, name: '全部'}],
        incomeArray = [{id: 0, name: '全部'}];

    app.globalData.accountWay.accountWay[1].map(function(val) {
      outArray.push({
        id: val.id,
        name: val.name
      });
    });

    app.globalData.accountWay.accountWay[2].map(function(val) {
      incomeArray.push({
        id: val.id,
        name: val.name
      });
    });
    this.setData({
      out: outArray,
      income: incomeArray
    });
  },
  bindTypeIdChange: function (e) {
    this.setData({
      typeId: e.detail.value
    });
  },

  bindStartChange: function (e) {
    this.setData({
      start: e.detail.value
    })
  },

  bindEndChange: function (e) {
    this.setData({
      end: e.detail.value
    })
  },

  radioChange: function (e) {
    let accountType = e.detail.value;

    this.setData({
      typeId: 0,
      accountType: accountType
    })
  },

  bindQuery: function (e) {
    var that = this;
    let data = e.currentTarget.dataset;

    if (!data.start) {
      wx.showToast({
        title: '请输入开始日期',
        duration: 2000
      })
      return ;
    }

    if (!data.start) {
      wx.showToast({
        title: '请输入结束日期',
        duration: 2000
      })
      return ;
    }
    data.userId = wx.getStorageSync('user_id');
    wx.request({
      url: config.requestUrl + '?s=/index/index/query',
      data: data,
      success: function (res) {
        let accountWay = app.globalData.accountWay
        res.data.list.map(function(val) {
          val.typeWayName = accountWay.accountWay[val.type][val.type_id - 1].name;
          val.typeName = accountWay.accountType[val.type];
        });
        that.setData({
          total: res.data.total,
          list: res.data.list
        });
      }
    });
  }
})
