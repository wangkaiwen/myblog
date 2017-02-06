$(document).ready(function () {
    var USER_NAME=$('#userName').html();

    //根据url，设置高亮
    if (window.location.pathname === '/') {
        $(".navbar-nav li:first").addClass("active");
    }
    else if (window.location.pathname === '/login') {
        $(".navbar-nav li:nth-child(2)").addClass("active");
    }
    else if (window.location.pathname === '/reg') {
        $(".navbar-nav li:nth-child(3)").addClass("active");
    }

    //清空输入框
    $("#clearBlog").click(function () {
        $("#textarea").val("");
    });
    var lastSubmit = null;
    var timeer = null;
    var successSubmit = null;
    //防止连续点击
    function ErrorAlert() {
        if (new Date() - lastSubmit < 3000) {
            clearTimeout(timeer);
        }
        lastSubmit = new Date();
        timeer = setTimeout(function () {
            $("#submitError").addClass("hidden");
        }, 3000);
    }

    //提交输入框
    $("#postBlog").click(function () {
        //防止重复发表，因此需要间隔10秒
        if (successSubmit && new Date() - successSubmit < 10000) {
            //这里是警告提示，防止连续发送消息
            $("#submitError").text("你发的太快了，喝喝茶吧！距离下次可以发送消息的时间还有：" + parseInt((new Date() - successSubmit)/1000) + " 秒。").removeClass("hidden");
            //防止连续点击
            ErrorAlert();
            return;
        }

        var text = $("#textarea").val();
        if (text.length === 0) {    //禁止发送空内容
            $("#submitError").text("请填写输入内容").removeClass("hidden");
            //防止连续点击
            ErrorAlert();
            return;
        }
        var length = 0;
        //获取输入长度，英文字母为1，中文汉字为2
        for (var i = 0; i < text.length; i++) {
            if (text[i].match(/[^\x00-\xff]/ig) != null)
                length += 2;
            else
                length += 1;
        }
        if (length > 255) {
            $("#submitError").text("字符长度过长，限制字符长度为255个字节，你的文本长度为" + length + "个字节").removeClass("hidden");
            ErrorAlert();
            return;
        }

        //先清除输入框再提交
        $("#textarea").val("");
        successSubmit = new Date();
        $.post('/post', {text: text}, function (item) {
            if (item.code == 403) {
                location.href = item.data;
            }
            else if (item.code == 500) {
                successSubmit = 0;
                $("#submitError").text(item.data).removeClass("hidden");
                setTimeout(function () {
                    $("#submitError").addClass("hidden");
                }, 3000);
            } else if (item.code == 200) {
                $("#content").find(".content-content").prepend('<div class="col-md-12"><h4 class="text-info">' + USER_NAME + '</h4>' +
                    '<p>' + text + '</p><p class="text-info">'+successSubmit.Format("yyyy-MM-dd HH:mm:ss")+'</p></div>');

                $("#submitSuccess").text(item.data).removeClass("hidden");
                setTimeout(function () {
                    $("#submitSuccess").addClass("hidden");
                }, 3000);
            }
        })
    });


    var lastLoad = 0;   //初始时间设置为0
    var lastLoadCount = 0;  //偏移量，防止读取到重复数据
    //加载更多的内容
    function loadMoreContent() {
        //控制加载间隔，时间差大于2秒，且当前不处于加载中
        if (new Date() - lastLoad > 2000 && $("#scrollToFoot").innerHTML !== "加载中~~~") {
            lastLoad = new Date();
            $("#scrollToFoot").innerHTML = "加载中~~~";
            //设置重置，假如超时10秒，那么允许再次提交
            setTimeout(function () {
                if ($("#scrollToFoot").innerHTML === "加载中~~~") {
                    $("#scrollToFoot").text("加载失败");
                }
            }, 10000);
            $.get('/loadblog/' + lastLoadCount, function (obj) {
                //这里假设item的格式：
                if (obj.code === 500) {
                    $("#scrollToFoot").text("加载失败");
                } else if (obj.code === 501) {
                    $("#scrollToFoot").text(obj.data);
                    lastLoad = new Date() + 10000000;   //禁止继续请求
                } else {
                    obj.data.forEach(function (item) {
                        console.log(item)
                        $("#content .content-content").append('<div class="col-md-12"><h4 class="text-primary">' + item.user + '</h4>' +
                            '<p>' + item.text + '</p><p class="text-info">'+item.ctime+'</p></div>');
                    })
                    $("#scrollToFoot").innerHTML = "滚动到底部然后加载内容";
                    lastLoadCount = obj.offset;
                    console.log(lastLoadCount)
                }
            })
        }
    }

    //加载完毕时，加载一次内容
    loadMoreContent();
    //向下滚动时加载内容
    $(window).scroll(function () {
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 100) {
            loadMoreContent();
        }
    })

})

Date.prototype.Format = function (fmt) { //author: meizz
    var obj = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var key in obj)
        if (new RegExp("(" + key + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[key]) : (("00" + obj[key]).substr(("" + obj[key]).length)));

    console.log(fmt);
    return fmt; //返回值是格式化好之后的时间
};