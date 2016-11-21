var express = require('express');
var router = express.Router();
var OrderService = require('../service/OrderService.js');

router.post('/delOrder', function(req, res, next) {
    var _id =req.body._id;
    OrderService.remove(_id,function(data){
		res.send(data);
    })
});

router.post('/getCommodity', function(req, res, next) {
        var username = req.body.username; 
  			OrderService.getCommodity(username,function(data){
  				res.send(data);
  			})
});

router.post('/getAddCommdity', function(req, res, next) {
            OrderService.getAddCommdity(function(data){
                res.send(data);
            })
});

router.post('/searchList', function(req, res, next) {
          var username = req.body.username;
          var commColor = req.body.commColor;
          var commNet = req.body.commNet;
          OrderService.searchList(username,commColor,commNet,function(data){
            res.send(data)
          })
});

router.post('/updateComm', function(req, res, next) {
          var obj={
            commColor:req.body.commColor,
            commNet:req.body.commNet,
            _id:req.body._id,
            commCont:req.body.commCont,
            commPrice:req.body.commPrice
          }
          OrderService.updateComm(obj,function(data){
            res.send(data)
          })
});

router.post('/getAllCommodity', function(req, res, next) {
        OrderService.getAllCommodity(function(data){
          res.send(data);
        })
});

module.exports = router;