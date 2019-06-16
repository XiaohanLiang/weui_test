Page({

    data: {
        title : "",
        date : "",
        link : "",
        author : "",
        content : "",
    },

    onLoad: function (options) {

        this.setData({
            "title": options.title,
            "date":options.date,
            "link":options.link,
            "author":options.author,
            "content":options.content,
        })
    },

    goWebPage:function(event){

        wx.navigateTo({
            url:`../web-source/web-page/web-page?link=` + event.currentTarget.dataset.hi,
            success:function() {},
            fail:function() {},
            complete:function() {}
        })
    }
});