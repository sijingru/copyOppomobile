var express = require('express');
var router = express.Router();
var SerService = require('../service/SerService.js');
// 添加大系列
router.post('/addSeries', function(req, res, next) {

    SerService.addCommSeries(req.body.commSeries, function(data) {
        res.send(data);
    })
});

// 用于获取所有系列名称，便于选择系列添加细节内容
router.post('/getAllSeries', function(req, res, next) {
    SerService.getAllSeries(function(data) {
        res.send(data);
    })
});
router.get('/getAllSeries', function(req, res, next) {
    SerService.getAllSeries(function(data) {
         res.setHeader("Access-Control-Allow-Origin","*")
        res.jsonp(data);
    })
});

// 添加每个系列细节内容
router.post('/addSeriesDetail', function(req, res, next) {
    var seriesDetail = JSON.parse(req.body.seriesDetail);
    SerService.addSeriesDetail(seriesDetail, function(data) {
        res.send(data);
    })
});

// getCommBySeries接口用于获取商品系列数据
router.post('/getCommBySeries', function(req, res, next) {
    SerService.getCommBySeries(req.body.curPage, req.body.eachPage, function(data) {
        res.send(data);
    })
});

// delSeries接口用于删除整个系列
router.post('/delSeries', function(req, res, next) {
    SerService.delSeries(req.body.delSeries, function(data) {
        res.send(data);
    })
});

// isNameUse接口用于验证是否有重复产品名称
router.post('/isNameUse', function(req, res, next) {
    SerService.isNameUse(req.body.commName, req.body.commSeries, function(data) {
        res.send(data);
    })
});

// editSeries接口用于修改(删除小细节)系列内容
router.post('/editSeries', function(req, res, next) {
    var editSeries = JSON.parse(req.body.editSeries);
    SerService.editSeries(editSeries, function(data) {
        res.send(data);
    })
});

//杨超用产品接口~！
router.post('/getSeries', function(req, res, next) {
    SerService.getCommSeries(function(data) {
        res.send(data);
    })
});

module.exports = router;