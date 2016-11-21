var ServiceDAO = require('../dao/SerDAO.js');

// 添加大系列
module.exports.addCommSeries = function(commSeries, callback) {
    ServiceDAO.addCommSeries(commSeries, function(data) {
        callback(data)
    })
}

// 用于获取所有系列名称，便于选择系列添加细节内容
module.exports.getAllSeries = function(callback) {
    ServiceDAO.getAllSeries(function(data) {
        callback(data)
    })
}

// 添加每个系列细节内容
module.exports.addSeriesDetail = function(seriesDetail, callback) {
    ServiceDAO.addSeriesDetail(seriesDetail, function(data) {
        console.log(data)
        if (data.ok == "1"||data == "1") {
            callback(true)
        } else {
            callback(false)
        }
    })
}

// getCommBySeries接口用于获取商品系列数据
module.exports.getCommBySeries = function(curPage, eachPage, callback) {
    ServiceDAO.getCommBySeries(curPage, eachPage, function(data) {
        callback(data)
    })
}

// delSeries接口用于删除整个系列
module.exports.delSeries = function(delSeries, callback) {
    ServiceDAO.delSeries(delSeries, function(data) {
        if (data || data == "0") {
            callback(true)
        } else {
            callback(false)
        }
    })
}

// isNameUse接口用于验证是否有重复产品名称
module.exports.isNameUse = function(commName, commSeries, callback) {
    ServiceDAO.isNameUse(commName, commSeries, function(data) {
        if (data.length !== 0) {
            callback(true)
        } else {
            callback(false)
        }
    })
}

// editSeries接口用于修改(删除小细节)系列内容
module.exports.editSeries = function(editSeries, callback) {
    ServiceDAO.editSeries(editSeries, function(data) {
        if (data.ok == "1"||data == "1") {
            callback(true)
        } else {
            callback(false)
        }
    })
}

//杨超用产品接口~
module.exports.getCommSeries = function(callback) {
    ServiceDAO.getCommSeries( function(data) {
        callback(data)
    })
}
