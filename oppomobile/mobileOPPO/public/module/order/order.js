angular
    .module("orderModule", [])
    .directive("order", function($state, $http) {
        return {
            restrict: "AE",
            templateUrl: "./module/order/order.html",
            link: function(scope) {
                scope.adress=""
                scope.comminformation=JSON.parse(localStorage.comminformation)
                console.log(localStorage.godId)
                scope.newadress=function(){
                    scope.adress=""
                }
                scope.addorder=function(){
                    var order={
                        commSeries:scope.comminformation.singleComm.commSeries,
                        commPrice: scope.comminformation.singleComm.commPrice,
                        commName: scope.comminformation.singleComm.commName,
                        commColor: scope.comminformation.color,
                        commCont:scope.comminformation.cont,
                        commNet:scope.comminformation.net,
                        username:scope.comminformation.singleComm.username,
                        id: scope.comminformation.commId,
                        godId:localStorage.godId,
                        phone:"string",
                        shoppAddress:"string"
                    }
                }
            }
        }
    })