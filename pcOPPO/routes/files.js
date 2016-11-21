var express = require('express');
var multiparty = require('multiparty');
var fs = require('fs');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post("/upload", function(req, res) {
	var form = new multiparty.Form({
		uploadDir: './public/images/'
	});

	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			console.log('parse error: ' + err);
		} else {
			var inputFile = files.file[0];
			var uploadedPath = inputFile.path;
			var dstPath = './public/images/' + inputFile.originalFilename;
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if (err) {
					console.log('rename error: ' + err);
				} else {
					res.send("ok")
				}
			});
		}
	});
});

router.post("/del", function(req, res) {
	var filepath = "./public/images/" + req.body.name; 
	fs.unlink(filepath, function(err) {
		if (err) {
			throw err;
		}
		res.send({state: "ok"});
	})
});



module.exports = router;