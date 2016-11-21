var mongoose = require("./model/User.js");

module.exports.login = function(username, password, callback) {
	var UserModel = mongoose.model("users");
	UserModel.find({
		username: username,
		password: password
	}, function(err, data) {
		callback(data)
	})
}

module.exports.reg = function(users, callback) {
	var UserModel = mongoose.model("users");
	new UserModel({
		username: users.username,
		password: users.password,
		userType: users.userType
	}).save(function(err, data) {
		callback(data)
	})
}


module.exports.weblogin = function(users, callback) {
	var UserModel = mongoose.model("users");
	UserModel.find({
		username: users.username,
		password:users.password,
		userType:users.userType
	}, function(err, data) {
		callback(data);
	})
}
module.exports.isUse = function(username, callback) {
	var UserModel = mongoose.model("users");
	UserModel.find({
		username: username
	}, function(err, data) {
		callback(data);
	})
}
//-------------------------------------------------分割线
//新增管理员
module.exports.addUsers=function(users,callback){
	var data=JSON.parse(users)
	var UserModel=mongoose.model("users");
	new UserModel({
		username: data.userName,
		password: data.userPassword,
		userType:data.userType
	}).save(function(err, data) {
		callback(data)
	})
}
//检验用户名是否重复
module.exports.checkeUsername=function(username,callback){
	var UserModel=mongoose.model("users");
	UserModel.find({username:username},function(err,data){
		callback(data)
	})
}
//获取用户账号
module.exports.getUsers=function(userType,callback){
	var UserModel=mongoose.model("users");
	UserModel.find({userType:userType},function(err,data){
		callback(data)
	})
}
//搜索管理员
module.exports.searchUser=function(username,callback){
	var UserModel=mongoose.model("users");
	UserModel.find({username:username},function(err,data){
		callback(data)
	})
}
//删除管理员或者用户
module.exports.delUsers=function(_id,callback){
	var UserModel=mongoose.model("users");
	UserModel.remove({_id:_id},function(err,data){
		callback(data)
	})
}
//修改管理员或者用户
module.exports.editUsers=function(users,callback){
	var users=JSON.parse(users)
	var UserModel=mongoose.model("users");
	UserModel.update(
		{_id:users.id},
		{
			username:users.username,
			password:users.password
		},
		function(err,data){
			callback(data)
	})
}