//app.js
App({
  globalData:{
    userInfo:null,
    accountWay: null
  },

  login: function () {
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://accounting.mingrenxiu.cc/index.php?s=/index/index/login',
            dataType: "json",
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorageSync('user_id', res.data[0].user_id);
              wx.setStorageSync('user_name', res.data[0].user_name);
            }
          })
        }
      }
    });
  },

  onLaunch: function () {
    var that = this;

    wx.checkSession({
      success: function(){
        //session 未过期，并且在本生命周期一直有效
        var userId = wx.getStorageSync('user_id');
        if (!userId) {
          that.login();
        }
      },
      fail: function(){
        //登录态过期
        console.log('fail');
        that.login();
      }
    })

  }
})