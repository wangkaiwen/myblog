var express = require('express'); //调用express模块
var router = express.Router();  //调用模块的Router方法
var BlogSubmit = require("../models/blog");


router.post('/', function (req, res, next) {
    //如果不登录是不能发表的（这个是为了防止登录过期，但是页面还保持在登录时的情况）
    if (!req.session.user) {
        req.session.err = "请登录";        //因为这里，需要修改layout.jade
        return res.send({
            code: 403,
            data: '/login'
        });
    }
    console.log(req.session.user);
    //登录后值为（示例）
    //{ Id: 23,
    //    username: '1',
    //    userpassword: 'xMpCOKC5I4INzFCab3WEmw==' }
    var blog = new BlogSubmit({
        name: req.session.user.name,
        text: req.body.text
    })
    blog.save(function (err, result) {
        if (err) {
            return res.send({
                code: 500,
                data: "错误描述" + err
            })
        }
        return res.send({
            code: 200,
            data: "成功发表！"
        })
    })
})
module.exports = router;
