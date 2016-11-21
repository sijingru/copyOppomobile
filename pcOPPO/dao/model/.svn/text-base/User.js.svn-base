
var mongoose = require("../database.js")
//Schema 结构, 用来描述操作的数据对象的结构
var UserSchema = new mongoose.Schema({
	username: "string",
	password: "string",
    userType:"string"
});

//model, 数据模型
//创建数据模型, param1: 用来定义model的名称; param2: 定义模型对应的结构; param3: mongodb 集合名称
mongoose.model("users", UserSchema, "users");

module.exports = mongoose;