var CommDAO = require('../dao/CommDAO.js');

module.exports.addComm = function(commodity, callback) {
    // console.log(1231)
    CommDAO.addComm(commodity, function(data) {
        callback(data)
    })
}

module.exports.addCommImgs = function(commodityImgs,callback){
    CommDAO.addCommImgs(commodityImgs,function(data){
        callback(data)
    })
}

module.exports.getCommImgs = function(commodityImgs,callback){
    CommDAO.getCommImgs(commodityImgs,function(data){
        callback(data)
    })
}

module.exports.getCommodityByPage = function(curPage, eachPage, callback) {
    CommDAO.getCommodityByPage(curPage, eachPage, function(data) {
        callback(data)
    })
}

module.exports.getCommodityImgsByPage = function(commId, callback) {
    CommDAO.getCommodityImgsByPage(commId, function(data) {
        callback(data)
    })
}