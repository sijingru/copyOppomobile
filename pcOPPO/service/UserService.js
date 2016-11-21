
var UserDAO = require("../dao/UserDAO.js");

module.exports.login = function(username, password, callback) {
	//业务处理
	UserDAO.login(username, password, function(data) {
		if(data.length !==0 ) {
			callback(data[0]);
		} else {
			callback(false);
		}
	});
}
module.exports.reg = function(users, callback) {
	//业务处理
	
	UserDAO.reg(users, function(data) {
		if(data.length !== 0 ) {
			callback(true);
		} else {
			callback(false);
		}
	});
}


module.exports.isUse = function(username, callback) {
	UserDAO.isUse(username, function(data) {
		if(data.length == 0) {
			callback("false")
		} else {
			callback("true")
		}
	})
}
module.exports.weblogin = function(users, callback) {
	UserDAO.weblogin(users, function(data) {
		if(data.length == 0) {
			callback(false)
		} else {
			callback(true)
		}
	})
}
//----------------------------------------------------分割线
//新增管理员
module.exports.addUsers=function(users,callback){
	UserDAO.addUsers(users,function(data){
		callback(data);
	})
}
//检验用户名是否重复
module.exports.checkeUsername=function(username,callback){
	UserDAO.checkeUsername(username,function(data){
		if(data.length==0){
			callback(true)
		}else{
			callback(false)
		}
	})
}
//获取用户账号
module.exports.getUsers=function(userType,callback){
	UserDAO.getUsers(userType,function(data){
		callback(data);
	})
}
//搜索管理员
module.exports.searchUser=function(username,callback){
	UserDAO.searchUser(username,function(data){
		callback(data);
	})
}
//删除管理员或者用户
module.exports.delUsers=function(_id,callback){
	UserDAO.delUsers(_id,function(data){
		if(data){
			callback('true')
		}else{
			callback('false')
		}
	})
}
//修改管理员或者用户
module.exports.editUsers=function(users,callback){
	UserDAO.editUsers(users,function(data){
		if(data){
			callback('true')
		}else{
			callback('false')
		}
	})
}