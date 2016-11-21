angular
.module("app", ["ui.router","loginModule","indexModule","regModule",
		"seriesModule","productModule","mallModule","orderModule"
	])
.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("index");
		$stateProvider
		.state("index", {
			url: "/index",
			template: "<index></index>"
		})
		.state("login", {
			url: "/login",
			template: "<login></login>"
		})
		.state("reg", {
			url: "/reg",
			template: "<reg></reg>"
		})
		.state("series", {
			url: "/series",
			template: "<series></series>"
		})
		.state("product", {
			url: "/product/:commId",
			template: "<product></product>"
		})
		.state("mall", {
			url: "/mall",
			template: "<mall></mall>"
		})
		.state("order", {
			url: "/order",
			template: "<order></order>"
		})
		.state("product.detail", {
			url: "/product/detail",
			templateUrl: "./module/product/commDetail.html"
		})
		.state("product.params", {
			url: "/product/params",
			templateUrl: "./module/product/commParams.html"
		})
})
.controller("wrap", function($state,$scope) {
	$scope.nav=0;
	$scope.person=0;
	$scope.showNav=function(){
		if($scope.nav){
			$scope.nav=0;
		}else{
			$scope.nav=1;
			$scope.person=0;
		}
	}
	$scope.showPerson=function(){
		if($scope.person){
			$scope.person=0; 
		}else{
			$scope.person=1;
			$scope.nav=0;
		}
	}
	$scope.login=function(){
		$scope.person=0; 
		$state.go("login")
	}
	$scope.index=function(){
		$state.go("index")
	}
	$scope.series=function(){
		$state.go("series")
	}
	$scope.mall=function(){
		$state.go("mall")
	}
})