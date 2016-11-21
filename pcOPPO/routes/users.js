var express = require('express');
var router = express.Router();
var UserService = require("../service/UserService.js");

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


//原app的传输路径
router.get('/test', function(req, res, next) {
	res.jsonp('respond with a resource');
});

router.post('/login', function(req, res, next) {

	UserService.login(req.body.username, req.body.password, function(data) {
		if(data){
            res.cookie("isLogin",true)
            console.log(data)
            res.cookie("userType",data["userType"])
                    res.send(true);        


        }else{
            res.cookie("isLogin",false)
                    res.send(false);        

        }
	})
});

router.get('/reg', function(req, res, next) {
    
    UserService.reg(req.query, function(data) {
        res.setHeader("Access-Control-Allow-Origin","*")
        res.jsonp(data);
    })
});

router.post('/isUse', function(req, res, next) {
	UserService.isUse(req.body.username, function(data) {
		res.send(data);
	})
});

//-----------------------------------------------分割线

router.get("/login",function(req,res,next){
    UserService.weblogin(req.query, function(data) {
        res.setHeader("Access-Control-Allow-Origin","*")
        res.jsonp(data);
    })
})

//新增管理员
router.post("/addUsers",function(req,res,next){
   var users=req.body.data
    UserService.addUsers(users,function(data){
        res.send(data);
    })
})
//检验用户名是否重复
router.post("/checkeUsername",function(req,res,next){
    UserService.checkeUsername(req.body.username,function(data){
        res.send(data);
    })
})
//获取用户账号
router.post("/getUsers",function(req,res,next){
    var userType=req.body.userType;
    UserService.getUsers(userType,function(data){
        res.send(data);
    })
})
//搜索管理员
router.post("/searchUser",function(req,res,next){
    UserService.searchUser(req.body.username,function(data){
        res.send(data);
    })
})
//删除管理员或者用户
router.post("/delUsers",function(req,res,next){
    UserService.delUsers(req.body.userId,function(data){
        res.send(data);
    })
})
//修改管理员或者用户
router.post("/editUsers",function(req,res,next){
    UserService.editUsers(req.body.users,function(data){
        res.send(data);
    })
})
module.exports = router;