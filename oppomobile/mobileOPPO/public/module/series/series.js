angular
    .module("seriesModule", ["regModule"])
    .directive("series", function($state, $http) {
        return {
            restrict: "AE",
            templateUrl: "./module/series/series.html",
            link: function(scope) {
                scope.series=[];
                scope.commseries=[];
                scope.seriesImg=[];
                getAllComm();
                scope.more=function(id){
                    $state.go("product",{
                        commId:id
                        })
                }
                function getAllComm() {
                    $http
                    .get("http://192.168.1.102:3000/commodity/getAllComm/?" )
                    .success(function(data) {
                        scope.series=data;
                        $http
                        .get("http://192.168.1.102:3000/commodity/getCommImgsByType/?imgType=commSeries")
                        .success(function(data){
                            scope.seriesImg=data;
                            scope.series.map(function(item,index){
                                scope.seriesImg.map(function(x,index){
                                    if(item._id==x.commId){
                                        item.url=x.url;
                                    }

                                })
                            })
                        })
                    })
                    $http
                    .get("http://192.168.1.102:3000/series/getAllSeries/?")
                    .success(function(data){
                        scope.commseries=data;
                    })
                };
            }
        }
    })