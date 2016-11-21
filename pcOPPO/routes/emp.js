var express = require('express');
var router = express.Router();
var EmpService = require("../service/EmpService.js");


router.post('/getEmpByPage', function(req, res, next) {
	EmpService.getEmpByPage(req.body.curPage, req.body.eachPage, function(data) {
		res.send(data);
	})
});

module.exports = router;