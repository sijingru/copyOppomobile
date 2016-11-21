
var mongoose = require("../database.js")

var EmpSchema = new mongoose.Schema({
	empName: "string",
	job: "string",
	sal: "string"
});

//model, 数据模型
//创建数据模型, param1: 用来定义model的名称; param2: 定义模型对应的结构; param3: mongodb 集合名称
mongoose.model("emp", EmpSchema, "emp");

module.exports = mongoose;