angular
	.module("loginModule", ["regModule"])
	.directive("login", function($state, $http) {
		return {
			restrict: "AE",
			templateUrl: "./module/login/login.html",
			link: function(scope) {
				scope.username=""
				scope.password=""
				scope.login = function() {
					$http
					.get("http://192.168.1.102:3000/users/login/?username="+scope.username+"&password="+scope.password+"&userType=2")
					.success(function(data) {
						console.log(data)
						if(eval(data)){
							localStorage.godId=scope.username;
							$state.go("index")
						}else{
							alert("账号或者密码不正确")
						}
					})
				};
				scope.reg = function() {
					$state.go("reg")
				}
			}
		}
	})
	
	