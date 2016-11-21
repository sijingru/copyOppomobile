var mongoose = require('./model/commodity.js');

// 添加大系列
module.exports.addCommSeries = function(commSeries, callback) {
    var CommSeries = mongoose.model("commoditySeries");
    CommSeries.find({
        commSeries: commSeries
    }, function(err, data) {
        // callback(data);
        if (data.length !== 0) {
            callback(false)
        } else {
            new CommSeries({
                commSeries: commSeries
            }).save(function(err, data) {
                callback(true)
            })
        }
    })
}

// 用于获取所有系列名称，便于选择系列添加细节内容
module.exports.getAllSeries = function(callback) {
    var AllSeriesModel = mongoose.model("commoditySeries");
    AllSeriesModel.find({}, function(err, data) {
        var series = []
        data.map((item, index) => {
            series.push(item.commSeries)
        })
        callback(series)
    })
}

// 添加每个系列细节内容
module.exports.addSeriesDetail = function(seriesDetail, callback) {
    var AddDetailModel = mongoose.model("commoditySeries");
    AddDetailModel.find({
        commSeries: seriesDetail.commSeries
    }, function(err, data) {
        if (seriesDetail.seriesService) {
            data[0].seriesService.push(seriesDetail.seriesService)
        }
        if (seriesDetail.seriesNet) {
            data[0].seriesNet.push(seriesDetail.seriesNet)
        }
        if (seriesDetail.seriesCapacity) {
            data[0].seriesCapacity.push(seriesDetail.seriesCapacity)
        }
        if (seriesDetail.seriesColor) {
            data[0].seriesColor.push(seriesDetail.seriesColor)
        }
        if (seriesDetail.seriesAdv) {
            data[0].seriesAdv = seriesDetail.seriesAdv
        }
        if (seriesDetail.commName) {
            data[0].commName.push(seriesDetail.commName)
        }
        AddDetailModel.update({
            commSeries: seriesDetail.commSeries
        }, {
            // $set: data[0]
            $set:{
                commSeries:data[0].commSeries,
                commName:data[0].commName,
                seriesAdv:data[0].seriesAdv,
                seriesColor:data[0].seriesColor,
                seriesCapacity:data[0].seriesCapacity,
                seriesNet:data[0].seriesNet,
                seriesService:data[0].seriesService
            }
        }, function(err, data) {
            callback(data)
        })
    })
}

// getCommBySeries接口用于获取商品系列数据
module.exports.getCommBySeries = function(curPage, eachPage, callback) {
    var CommoditySeriesModel = mongoose.model("commoditySeries");
    var page = {
        curPage: +curPage,
        eachPage: +eachPage,
    };
    CommoditySeriesModel.count(function(err, data) {
        page.count = data;
        page.maxPage = Math.ceil(page.count / page.eachPage);
        CommoditySeriesModel
            .find({})
            // 排序，从大到小排列
            .sort({
                _id: -1
            })
            .skip((page.curPage - 1) * page.eachPage)
            .limit(page.eachPage)
            .exec(function(err, data) {
                page.data = data;
                callback(page);
            })
    });
}

// delSeries接口用于删除整个系列
module.exports.delSeries = function(delSeries, callback) {
    var DelSeriesModel = mongoose.model("commoditySeries");
    var DelCommModel = mongoose.model("commodity")
    DelSeriesModel.remove({
        commSeries: delSeries
    }, function(err, data) {
        DelCommModel.remove({
            commSeries: delSeries
        }, function(err, data) {
            callback(data);
        })
    })
}

// isNameUse接口用于验证是否有重复产品名称
module.exports.isNameUse = function(commName, commSeries, callback) {
    var NameUseModel = mongoose.model("commoditySeries");
    NameUseModel.find({
        commSeries: commSeries,
        commName: commName
    }, function(err, data) {
        callback(data)
    })
}

// editSeries接口用于修改(删除小细节)系列内容
module.exports.editSeries = function(editSeries, callback) {
    var EditModel = mongoose.model("commoditySeries");
    EditModel.find({
        commSeries: editSeries.commSeries
    }, function(err, data) {
        EditModel.update({
            commSeries: editSeries.commSeries
        }, {
            $set: {
                commSeries:editSeries.commSeries,
                commName:editSeries.commName,
                seriesAdv:editSeries.seriesAdv,
                seriesColor:editSeries.seriesColor,
                seriesCapacity:editSeries.seriesCapacity,
                seriesNet:editSeries.seriesNet,
                seriesService:editSeries.seriesService
            }
        }, function(err, data) {
            callback(data)
        })
    })
}

//杨超用
module.exports.getCommSeries = function(callback){
    var username = mongoose.model("commoditySeries");
    username.find({},function(err,data){
        callback(data)
    })
}
