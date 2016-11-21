angular
    .module("productModule", [])
    .directive("product", function($state, $http,$stateParams) {
        return {
            restrict: "AE",
            templateUrl: "./module/product/product.html",
            link: function(scope) {
                scope.commId=$stateParams.commId
                scope.commDetail=[];
                scope.singleComm =[];
                scope.singleImg=[];
                scope.commParams=[];
                getSingleComm();
                scope.commNet=function(net){
                    scope.Net=net
                }
                scope.commColor=function(color){
                    scope.Color=color
                }
                scope.commCont=function(cont){
                    scope.Cont=cont
                }
                scope.commService=function(service){
                    scope.Service=service
                }
                scope.nowBuy=function(){
                    localStorage.comminformation=JSON.stringify({
                        singleImg:scope.singleImg,
                        singleComm:scope.singleComm,
                        commId:scope.commId,
                        net:scope.Net,
                        color:scope.Color,
                        cont:scope.Cont,
                        service:scope.Service
                    })
                    if(localStorage.godId){
                        $state.go("order")
                    }else{
                        alert("请您先登录")
                        $state.go("login")
                    }
                    
                }
                function getSingleComm() {
                    $http
                    .get("http://192.168.1.102:3000/commodity/getCommById/?commId=" + scope.commId)
                    .success(function(data) {
                        scope.singleComm = data[0]
                        $http
                        .get("http://192.168.1.102:3000/commodity/getCommIdImgs/?commId=" + scope.commId+"&imgColor="+scope.singleComm.commColor[0]+"")
                        .success(function(data){
                            scope.singleImg=data
                        })
                        $http
                        .get("http://192.168.1.102:3000/commodity/getcommDetail/?commId=" + scope.commId+"&imgType=commDetail")
                        .success(function(data){
                            scope.commDetail=data
                        })
                        $http
                        .get("http://192.168.1.102:3000/commodity/getcommDetail/?commId=" + scope.commId+"&imgType=commParams")
                        .success(function(data){
                            scope.commParams=data
                        })
                    })
                }
            }
        }
    })