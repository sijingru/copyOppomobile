var mongoose = require('./model/commodity.js');

module.exports.addComm = function(commodity, callback) {
    var CommodityModel = mongoose.model("commodity");
    new CommodityModel(commodity)
        .save(function(err, data) {
            callback(data._id)
        })
}
module.exports.changeComm = function(commodity, callback) {
    var CommodityModel = mongoose.model("commodity");

        CommodityModel.update({
            _id: commodity._id
        }, {
            $set: commodity
        }, function(err, data) {
            callback(data)
        })
    
}


module.exports.addCommImgs = function(commodityImgs, callback) {
    var CommodityImgsModel = mongoose.model("commodityImgs");
    var arr = commodityImgs.arr.map(function(item) {
        return {
            commId: commodityImgs.commId,
            imgName: item,
            imgColor: commodityImgs.imgColor,
            imgType: commodityImgs.imgType,
            url: "http://127.0.0.1:3000/images/" + item,
            uid: Date.parse(new Date()) + (~~(Math.random() * 1000000))
        }
    })

    CommodityImgsModel.create(arr, function(err, data) {
        callback("true");
    })

}

module.exports.getCommImgs = function(commodityImgs, callback) {
    var CommodityImgsModel = mongoose.model("commodityImgs");
    CommodityImgsModel.find(commodityImgs, function(err, data) {
        callback(data);
    })
}
module.exports.getCommImgsByType = function(imgType, callback) {
    var CommodityImgsModel = mongoose.model("commodityImgs");
    CommodityImgsModel.find({imgType:imgType}, function(err, data) {
        callback(data);
    })
}
module.exports.getcommDetail = function(commId,imgType, callback) {
    var CommodityImgsModel = mongoose.model("commodityImgs");
    CommodityImgsModel.find({imgType:imgType,commId:commId}, function(err, data) {
        callback(data);
    })
}
module.exports.getCommIdImgs = function(commId,imgColor,callback) {
    var CommodityImgsModel = mongoose.model("commodityImgs");
    CommodityImgsModel.find({commId:commId,imgColor:imgColor}, function(err, data) {
        callback(data);
    })
}
module.exports.getCommById = function(commId, callback) {
    var CommodityImgsModel = mongoose.model("commodity");
    CommodityImgsModel.find({_id:commId}, function(err, data) {
        callback(data);
    })
}
module.exports.getAllCommImgs = function(_id,callback) {
    var CommodityImgsModel = mongoose.model("commodityImgs");
    CommodityImgsModel.find({commId:_id}, function(err, data) {
        callback(data);
    })

}
module.exports.getCommByUsername = function(username, callback) {
    var CommodityModel = mongoose.model("commodity");
    CommodityModel.find({username:username}, function(err, data) {
        callback(data);
    })

}
module.exports.getAllComm = function(callback) {
    var CommodityModel = mongoose.model("commodity");
    CommodityModel.find({}, function(err, data) {
        callback(data);
    })

}
module.exports.delComm = function(_id, callback) {
    var CommodityModel = mongoose.model("commodity");
    CommodityModel.remove({_id:_id}, function(err, data) {
        callback(data);
    })

}
module.exports.delCommImg = function(_id, callback) {
    var CommodityImgsModel = mongoose.model("commodityImgs");
    CommodityImgsModel.remove({_id:_id}, function(err, data) {
        callback(data);
    })

}
module.exports.getCommColorImgs = function(commodityImgs, callback) {
    var CommodityImgsModel = mongoose.model("commodityImgs");
    CommodityImgsModel.find(commodityImgs, function(err, data) {
        callback(data);
    })

}

// getSingleComm接口用商品名获取单独的商品信息
module.exports.getSingleComm = function(commName, callback) {
    var SingleCommModel = mongoose.model("commodity");
    SingleCommModel.find({commName:commName}, function(err, data) {
        callback(data);
    })
}

// getCommBySeries接口用于获取商品系列数据
// module.exports.getCommBySeries = function(curPage, eachPage, callback) {
//     var CommoditySeriesModel = mongoose.model("commoditySeries");
//     var page = {
//         curPage: curPage,
//         eachPage: eachPage,
//     };
//     CommoditySeriesModel.count(function(err, data) {
//         page.count = data;
//         page.maxPage = Math.ceil(page.count / page.eachPage);
//         CommoditySeriesModel
//             .find()
//             .sort({
//                 _id: 1
//             })
//             .skip((page.curPage - 1) * page.eachPage)
//             .limit(page.eachPage)
//             .exec(function(err, data) {
//                 // page.data = data;
//                 // callback(page);
//                 console.log(data)
//             })
//     });
// }

// module.exports.getCommodityImgsByPage = function(commId, callback) {
//     var CommodityImgsModel = mongoose.model("commodityImgs");
//     CommodityImgsModel.find({
//         commId: commId
//     }, function(err, data) {
//         callback(data);
//     })
// }

module.exports.getAddCommID = function(_id, callback) {
    var getAddCommID = mongoose.model("commodity");
    getAddCommID.find({
        _id: _id
    }, function(err, data) {
        callback(data);
    })
}