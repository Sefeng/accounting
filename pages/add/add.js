const app = getApp();
const config = require('../../config/config.js');
var accountWay = config.accountWay;

Page({
    data: {
        placeholder: "请输入金额",
        focus: true,
        accountType: 1,
        default: accountWay[1][0],
        out: accountWay[1],
        income: accountWay[2],
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        addTime: new Date().toLocaleDateString(),
        remarksPlaceholder: "备注内容"
    },

    bindSwiperChange: function(e) {
        let accountType = e.detail.current + 1;

        this.setData({
            accountType: accountType,
            default: accountWay[accountType][0],
        })
    },

    changeOutType: function(e){
        let typeKey = e.target.dataset.accountId;

        accountWay[1].map(function(val) {
            if (val.id == typeKey) {
                val.active = true;
            } else {
                val.active = false;
            }
        })
        this.setData({
            default: accountWay[1][typeKey - 1],
            out: accountWay[1]
        })
    },

    changeIncomeType: function (e) {
        let typeKey = e.target.dataset.accountId;
        
        accountWay[2].map(function(val) {
            if (val.id == typeKey) {
                val.active = true;
            } else {
                val.active = false;
            }
        })
        this.setData({
            default: accountWay[2][typeKey - 1],
            income: accountWay[2]
        })
    },

    bindDateChange: function(e) {
        this.setData({
            addTime: e.detail.value
        })
    },
    bindInput: function(e) {
        this.setData({
            amount: e.detail.value
        })
    },
    bindRemarksInput: function(e) {
        this.setData({
            remarks: e.detail.value
        })
    },
    //  点击完成
    bindComplete: function(e) {
        let data = e.currentTarget.dataset
        if (!data.amount) {
            wx.showToast({
                title: '请输入金额',
                duration: 2000
            })
            return ;
        }
        wx.request({
            url: config.requestUrl + '?s=/index/index/addAccount',
            data: data,
            success: function (res) {
                console.log(res);
                wx.redirectTo({
                    url: '/pages/index/index'
                })
            }
        });
    }

});