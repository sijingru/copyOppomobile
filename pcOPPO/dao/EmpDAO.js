var mongoose = require("./model/Emp.js");

module.exports.getEmpByPage = function(curPage, eachPage, callback) {
	var EmpModel = mongoose.model("emp");
	var page = {
		curPage: curPage,
		eachPage: eachPage,
		options: []
	};

	
	
	EmpModel.count(function(err, data) {
		page.count = data;
		page.maxPage = Math.ceil(page.count / page.eachPage);
		EmpModel
		.find()
		.sort({
			_id: 1
		})
		.skip((page.curPage - 1) * page.eachPage)
		.limit(page.eachPage)
		.exec(function(err, data) {
			page.data = data;
			for(var i = 1; i <= page.maxPage; i++) {
				page.options.push({
					displayName: i,
					value: i
				})
			}
			callback(page);
		})
	});
}

