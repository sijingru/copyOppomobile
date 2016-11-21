angular
    .module("regModule", [])
    .directive("reg", function($state, $http) {
        return {
            restrict: "AE",
            templateUrl: "./module/reg/reg.html",
            link: function(scope) {
                scope.username="",
                scope.password=""

                scope.nowreg=function(){
                    $http
                    .get("http://192.168.1.102:3000/users/reg/?username="+scope.username+"&password="+scope.password+"&userType=2")
                    .success(function(data){
                        if(data){
                            $state.go("login")
                        }else{
                            alert("注册失败")
                        }
                    })
                }
                drawcode();
                scope.newCanvas = function(){
                    randomCode =drawcode() ;
                }



            function nums(num){
                var shuzi= ~~(Math.random()*num)
                return shuzi;
            }
            // 显示验证码内容的函数
            function drawcode(){
                var yanzhen="";
                var canvas=document.getElementById("canvas");
                var ctx =canvas.getContext("2d"); 
                ctx.fillStyle="rgb("+nums(255)+","+nums(255)+","+nums(255)+")";
                ctx.fillRect(0, 0, 300,150);  

                for (var i = 0;i <= 4; i ++ ) {
                    ctx.beginPath();
                    ctx.strokeStyle="rgb("+nums(255)+","+nums(255)+","+nums(255)+")";
                    ctx.moveTo(nums(300), nums(150));
                    ctx.lineTo(nums(300), nums(150));
                    ctx.stroke();
                    ctx.closePath();
                };

                var code="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                ctx.font="0.3rem Arial";
                for(var i=0;i<4;i++){
                    var fon=code.charAt(nums(code.length))
                    ctx.fillStyle="rgb("+nums(255)+","+nums(255)+","+nums(255)+")";
                    ctx.fillText(fon,(70+nums(25))*i,70+nums(30));
                    yanzhen=yanzhen+fon;
                }
                return yanzhen.toLowerCase();
            }  
            

            }
        }
    })