angular
    .module("indexModule", [])
    .directive("index", function($state, $http) {
        return {
            restrict: "AE",
            templateUrl: "./module/index/index.html",
            link: function(scope) {
                //轮播
                scope.data = {
                    imgSrc:  "images/img1.jpg",
                    imgsSrc: [{
                        src: "images/img1.jpg",
                        selected: true
                    }, {
                        src: "images/img2.jpg",
                        selected: false
                    }, {
                        src: "images/img3.jpg",
                        selected: false
                    }, {
                        src: "images/img4.jpg",
                        selected: false
                    }],
                    index: 0
                }

                scope.stop = function(index) {
                    window.clearInterval(timer);
                    scope.data.index = index;
                    run();
                }

                scope.go = function() {
                    timer = window.setInterval(function() {
                        render();
                    }, 3000)
                }

                var timer = null;

                function run() {
                    scope.data.imgSrc = scope.data.imgsSrc[scope.data.index].src;
                    scope.data.imgsSrc.forEach(function(item, index) {
                        if(index == scope.data.index) {
                            item.selected = true;
                        } else {
                            item.selected = false
                        }
                    })
                }

                function render() {
                    scope.data.index ++;
                    if(scope.data.index == scope.data.imgsSrc.length) {
                        scope.data.index = 0;
                    }
                    run();
                    scope.$apply();
                }

                timer = window.setInterval(function() {
                    render();
                }, 3000)

            }
        }
    })
