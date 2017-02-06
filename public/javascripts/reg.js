$(document).ready(function () {
    var time = 0;   //用于计时
    $("#submit-button").click(function () {
        //获取账号密码
        var name = $("#username").val();
        var pw = $("#password").val();
        var pwRepeat = $("#password-repeat").val();

        //未输入账号名
        if (name.length === 0) {
            $("#username").parent().addClass("has-error");
            $("#usrname-error").removeClass("hidden");
            $("#tips").addClass("hidden");
            setTimeout(function () {
                $("#username").parent().removeClass("has-error");
                $("#usrname-error").addClass("hidden");
                $("#tips").removeClass("hidden");
            }, 2000);
            return;
        }

        //密码为空
        if (pw.length === 0) {
            $("#password").parent().addClass("has-error");
            $("#pw-error").removeClass("hidden");
            setTimeout(function () {
                $("#password").parent().removeClass("has-error");
                $("#pw-error").addClass("hidden");
            }, 2000);
            return;
        }

        //密码不相同
        if (pw !== pwRepeat) {
            $("#pw-rp-error").parent().addClass("has-error");
            $("#pw-rp-error").removeClass("hidden");
            setTimeout(function () {
                $("#pw-rp-error").parent().removeClass("has-error");
                $("#pw-rp-error").addClass("hidden");
            }, 2000);
            return;
        }

        var obj = {
            name: name,
            password: pw
        };

        //防止连续点击，先禁用提交按钮，防止重复提交
        if (new Date() - time < 3000) {
            return;
        }
        //发起请求前，更新提交时间，
        time = new Date();
        //发起请求，回调内容是一个对象，注册成功会有success，注册失败会有error属性
        $.post("/reg", obj, function (data) {
            if ("has-error" in data) {
                $("#error-alert").removeClass("hidden")
                $("#error-alert").text(data.error);
                $("#error-alert").parent().addClass("has-error");
                setTimeout(function () {
                    $("#error-alert").addClass("hidden")
                    $("#error-alert").parent().removeClass("has-error");
                }, 2000)
                time = 0;       //注册失败，清空time计时，允许再次提交
            } else if ("success" in data) {
                location.href = data.success;    //注册成功则重定向
            }
        })
    })
})