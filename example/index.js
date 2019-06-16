Page({
    data: {
        list: [
            {
                id: 'prog',
                name: '编程',
                open: false,
                pages:  [
                    {
                        name:"V2EX",
                        link:"web-source/v2ex/v2ex",
                    },
                ]
            },
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    }
});

