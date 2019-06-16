var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var parser = require('../../../utils/parseXml.js');
var app = getApp()

Page({
    data: {
        tabs: ["最热", "最新"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        contentHot:[],
        contentLatest:[],
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        this.fetchData()
    },

    fetchData: function(){
        var that = this;


        wx.request({
            url: `http://`+app.globalData.server+`:`+app.globalData.port+`/v2ex/topics/hot`,
            success : function(res){

                console.log("Yeah we have got raw string some data")
                console.log(res.data)

                var returnedData = res.data
                var returnDataString = returnedData.toString()
                var preparedData = parser.parser(returnDataString)

                console.log("prepared Data :" + preparedData);

                that.setData({
                    contentHot:preparedData
                });
            }
        });

        wx.request({
            url: `http://`+app.globalData.server+`:`+app.globalData.port+`/v2ex/topics/latest`,
            success : function(res){

                console.log("Yeah we have got raw string some data")
                console.log(res.data)

                var returnedData = res.data
                var returnDataString = returnedData.toString()
                var preparedData = parser.parser(returnDataString)

                console.log("prepared Data :" + preparedData);

                that.setData({
                    contentLatest:preparedData
                });
            }
        });


    },

    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
});