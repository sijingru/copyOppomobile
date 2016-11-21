var OrderDAO = require('../dao/OrderDAO.js');

module.exports.remove = function(_id, callback) {
    OrderDAO.remove(_id, function(data) {
        if(data == "true"){
        	callback("true")
        }else{
        	callback('false')
        }
    })
}

module.exports.getCommodity = function(username,callback) {
    OrderDAO.getCommodity(username,function(data) {
        callback(data)
    })
}



module.exports.getAddCommdity = function(callback) {
    OrderDAO.getAddCommdity(function(data) {
        callback(data)
    })
}

module.exports.searchList = function(username,commColor,commNet,callback) {
    OrderDAO.searchList(username,commColor,commNet,function(data) {
        callback(data)
    })
}

module.exports.updateComm = function(obj,callback) {
    OrderDAO.updateComm(obj,function(data) {
        if(data){
          callback(true)
        }else{
          callback(false)
        }
      
    })
}
module.exports.getAllCommodity = function(callback) {
    OrderDAO.getAllCommodity(function(data) {
        callback(data)
    })
}


