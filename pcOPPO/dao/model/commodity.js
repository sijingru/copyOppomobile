var mongoose = require('../database.js');

var CommoditySchema = new mongoose.Schema({
            commSeries:"string",
            commName:"string",
            commNet:[],
            commColor:[],
            commPrice:"string",
            commCont:[],
            commService:[],
            commAdv:"string",
            commAdv2:"string",
            commSeller:"string",
            username:"string"

});

mongoose.model("commodity", CommoditySchema, "commodity");

var CommodityImgsSchema = new mongoose.Schema({
    commId: "string",
    imgName: "string",
    imgType: "string",
    url: "string",
    uid: "string",
    imgColor:"string"
});

mongoose.model("commodityImgs", CommodityImgsSchema, "commodityImgs");

var CommoditySeriesSchema = new mongoose.Schema({
            commSeries:"string",
            commName:[],
            seriesAdv:[],
            seriesColor:[],
            seriesCapacity:[],
            seriesNet:[],
            seriesService:[]

});



mongoose.model("commoditySeries", CommoditySeriesSchema, "commoditySeries");


var OrderCommoditySchema = new mongoose.Schema({
          commSeries:"string",
          commPrice: 'string',
          commName: "string",
          commColor: 'string',
          commCont:"string",
          commNet:"string",
          username:"string",
          id: "string",
          godId:"string",
          phone:"string",
          shoppAddress:"string"
})

mongoose.model("orderCommodity", OrderCommoditySchema, "orderCommodity");


module.exports = mongoose;