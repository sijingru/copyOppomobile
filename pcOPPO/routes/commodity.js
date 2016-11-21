var express = require('express');
var router = express.Router();
var CommService = require('../service/CommService.js');
//添加商品
router.post('/addComm', function(req, res, next) {
    // console.log("ion")
    var commodity = JSON.parse(req.body.commodity)
    CommService.addComm(commodity, function(data) {
        res.send(data);
    })
});
//添加商品图片
router.post('/addCommImgs', function(req, res, next) {

    var commodityImgs = JSON.parse(req.body.commodityImgs)   
    
    CommService.addCommImgs(commodityImgs, function(data) {
        res.send(data);
    })
});
//改变商品信息
router.post('/changeComm', function(req, res, next) {
    var data = JSON.parse(req.body.data)  
        CommService.changeComm(data, function(data) {
        res.send(data);
    })
});
//获取商品图片
router.post('/getCommImgs', function(req, res, next) {
    var commodityImgs = JSON.parse(req.body.commodityImgs)
    CommService.getCommImgs(commodityImgs, function(data) {
        res.send(data);
    })
});
router.get('/getCommImgsByType', function(req, res, next) {
    CommService.getCommImgsByType(req.query.imgType, function(data) {
       res.setHeader("Access-Control-Allow-Origin","*")
        res.jsonp(data);

    })
});
router.get('/getcommDetail', function(req, res, next) {
    CommService.getcommDetail(req.query.commId,req.query.imgType, function(data) {
       res.setHeader("Access-Control-Allow-Origin","*")
        res.jsonp(data);

    })
});


router.post('/getAllCommImgs', function(req, res, next) {
    CommService.getAllCommImgs(req.body._id,function(data) {
        res.send(data);
    })
});
router.post('/getAllCommImgs', function(req, res, next) {
    CommService.getAllCommImgs(req.body._id,function(data) {
        res.send(data);
    })
});


// 接口用于通过管理员账号查询商品
router.post('/getCommByUsername', function(req, res, next) {
    CommService.getCommByUsername(req.body.username, function(data) {
        res.send(data);
    })
});
// 接口用于通过超级管理员查询商品
router.post('/getAllComm', function(req, res, next) {
    CommService.getAllComm(function(data) {
        res.send(data);
    })
});
router.get('/getAllComm', function(req, res, next) {
    CommService.getAllComm(function(data) {
        res.setHeader("Access-Control-Allow-Origin","*")
        res.jsonp(data);
    })
});
//delComm 接口用于删除商品
router.post('/delComm', function(req, res, next) {
    CommService.delComm(req.body._id, function(data) {
        res.send(data);
    })
});
//delCommImg 接口用于删除商品图片
router.post('/delCommImg', function(req, res, next) {
    CommService.delCommImg(req.body._id, function(data) {
        res.send(data);
    })
});
//getCommColorImgs接口用于通过颜色获取商品图片
router.post('/getCommColorImgs', function(req, res, next) {
    var commodityImgs = JSON.parse(req.body.commodityImgs)
    CommService.getCommColorImgs(commodityImgs, function(data) {
        res.send(data);
    })
});
router.get('/getCommIdImgs', function(req, res, next) {
    // var commodityImgs = JSON.parse(req.body.commodityImgs)
    CommService.getCommIdImgs(req.query.commId,req.query.imgColor, function(data) {
        res.setHeader("Access-Control-Allow-Origin","*")
        res.jsonp(data);
    })
});

// getSingleComm接口用商品名获取单独的商品信息
router.post('/getSingleComm', function(req, res, next) {
    CommService.getSingleComm(req.body.commName, function(data) {
        res.send(data);
    })
});

router.get("/getCommById",function(req,res,next){
    CommService.getCommById(req.query.commId, function(data) {
        res.setHeader("Access-Control-Allow-Origin","*")
        res.jsonp(data);
    })
})
// getCommBySeries接口用于获取商品系列数据
// router.post('/getCommBySeries', function(req, res, next) {
//     CommService.getCommBySeries(req.body.curPage, req.body.eachPage, function(data) {
//         // res.send(data);
//     })
// });


// router.post('/getCommodityImgsByPage', function(req, res, next) {
//     CommService.getCommodityImgsByPage(req.body.commId, function(data) {
//         res.send(data);
//     })
// });

router.post('/getAddCommID', function(req, res, next) {
    var _id = req.body._id;
    CommService.getAddCommID(_id, function(data) {
        res.send(data);
    })
});
module.exports = router;