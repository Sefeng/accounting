const app = getApp();
const config = require('../../config/config.js');
var accountWay = wx.getStorageSync('accountWay') || app.globalData.accountWay;
Page({
    data: {
        placeholder: "请输入金额",
        focus: true,
        accountType: 1,
        accountTypeItems: [
            {name: 1, value: '支出', checked: 'true'},
            {name: 2, value: '收入', }
        ],
        default: accountWay.accountWay[1][0],
        out: accountWay.accountWay[1],
        outHide: false,
        income: accountWay.accountWay[2],
        incomeHide: true,
        addTime: new Date().toLocaleDateString(),
        remarksPlaceholder: "备注内容"
    },

    radioChange: function(e) {
        let accountType = e.detail.value;

        if (accountType == 1) {
            this.setData({
                outHide: false,
                incomeHide: true
            })
        } else if (accountType == 2) {
            this.setData({
                outHide: true,
                incomeHide: false
            })
        }
        console.log(accountWay);
        this.setData({
            accountType: accountType,
            default: accountWay.accountType[accountType][0]
        })

    },
    changeOutType: function(e){
        let typeKey = e.target.dataset.accountId;

        accountWay.accountWay[1].map(function(val) {
            if (val.id == typeKey) {
                val.active = true;
            } else {
                val.active = false;
            }
        })
        this.setData({
            default: accountWay.accountWay[1][typeKey - 1],
            out: accountWay.accountWay[1]
        })
    },

    changeIncomeType: function (e) {
        let typeKey = e.target.dataset.accountId;

        accountWay.accountWay[2].map(function(val) {
            if (val.id == typeKey) {
                val.active = true;
            } else {
                val.active = false;
            }
        })
        this.setData({
            default: accountWay.accountWay[2][typeKey - 1],
            income: accountWay.accountWay[2]
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
        let data = e.currentTarget.dataset;

        if (!data.amount) {
            wx.showToast({
                title: '请输入金额',
                duration: 2000
            })
            return ;
        }
        data.userId = wx.getStorageSync('user_id');
        wx.request({
            url: config.requestUrl + '?s=/index/index/addAccount',
            data: data,
            success: function (res) {
                wx.redirectTo({
                    url: '/pages/index/index'
                })
            }
        });
    }

});