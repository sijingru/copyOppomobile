var mongoose = require('./model/commodity.js');


module.exports.remove = function(_id,callback){
    var delCommSeries = mongoose.model("orderCommodity");
    delCommSeries
    .remove({_id:_id},function(err,data){
        callback('true');
    })
}

module.exports.getCommodity = function(username,callback){
    var getCommodity = mongoose.model("orderCommodity");
    getCommodity
    .find({username:username})
    .find(function(err,data){
        callback(data);
    })
}

module.exports.getAddCommdity = function(callback){
    var getAddCommdity = mongoose.model("commodity");
         getAddCommdity
    .find(function(err,data){
        callback(data);
    })
}

module.exports.searchList = function(username,commColor,commNet,callback){
    var searchList = mongoose.model("orderCommodity");
      searchList
    .find({
        username:username,
        commColor:commColor,
        commNet:commNet
    })
    .find(function(err,data){
        callback(data);
    })
}

module.exports.updateComm = function(obj,callback){
    var updateComm = mongoose.model("orderCommodity");
    updateComm.update(
        {_id:obj._id},
    {
        commColor:obj.commColor,
        commNet:obj.commNet,
        commCont:obj.commCont,
        commPrice:obj.commPrice
    },
    function(err,data){
        console.log(data)
        callback(data)
    })
}

module.exports.getAllCommodity = function(callback){
    var getAllCommodity = mongoose.model("orderCommodity");
    getAllCommodity
    .find(function(err,data){
        callback(data);
    })
}