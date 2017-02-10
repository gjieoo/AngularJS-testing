var app = angular.module("myApp", ['ngRoute'])
    .controller("appCon", ["$scope", "$rootScope", "$http", '$location', function ($scope, $rootScope, $http, $location) {
        $http.get('goods1.json').success(function (data) {
            $rootScope.goods = data;
        });
        $scope.$location = $location;
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: "./directive/myImgs.html"
        }).when('/fastFood', {
            templateUrl: "./directive/fastFood.html"
        }).when('/specialFood', {
            templateUrl: "./directive/specialFood.html"
        }).when('/foreignlandFood', {
            templateUrl: "./directive/foreignlandFood.html"
        }).when('/snackFood', {
            templateUrl: "./directive/snackFood.html"
        }).when('/sweetmeats', {
            templateUrl: "./directive/sweetmeats.html"
        }).when('/fruit', {
            templateUrl: "./directive/fruit.html"
        }).when('/cake', {
            templateUrl: "./directive/cake.html"
        }).when('/supermarket', {
            templateUrl: "./directive/supermarket.html"
        }).otherwise({
            redirectTo: '/index'
        });
    }])
    .directive("myTabs", function () {
        return {
            restrict: "EA",
            transclude: true,
            replace: true,
            scope: {},
            templateUrl: "./directive/myTabs.html",
            controller: ["$scope", function ($scope) {     //使用controller让最内层指令来继承外层指令，这样内层就可以
                // 通过scope的传导，来与外层指令进行数据之间的传递
                var panes = $scope.scopes = [];
                $scope.select = function (pane) {            //实现tabs功能
                    angular.forEach(panes, function (scope) {      //遍历所有内存指令scope，统一隐藏内容。
                        scope.selected = false;
                    });
                    pane.selected = true;                             //通过ng-repeat
                };
                this.addScope = function (scope) {                   //由内层指令来继承，把内层指令的scope，传到进外层指令进行控制
                    if (panes.length === 0) {
                        $scope.select(scope);
                    }
                    panes.push(scope);                                //把内层指令数组，传入外层指令scope数组。
                }
            }]
        }
    })
    .directive("myPane", function () {
        return {
            restrict: 'EA',
            scope: {
                title: '@'
            },
            transclude: true,
            require: '^myTabs',
            replace: true,
            templateUrl: "./directive/myPane.html",
            link: function (scope, elemenet, attrs, myTabsController) {
                myTabsController.addScope(scope);                    //把内层指令的scope存入到外层指令中，让外层遍历。
            }
        }
    })
    .directive("myImgs", function () {
        return {
            restrict: "EA",
            transclude: true,
            scope: {},
            replace: true,
            templateUrl: "./directive/myImgs.html",
            controller: ["$scope", "$rootScope", function ($scope, $rootScope) {
                //$scope.show=false;
                //    $scope.showDetails=function(){
                //        $scope.show=true;
                //    };
                //    $scope.hideDetails=function(){
                //        $scope.show=false;
                //    }
            }]
        }
    })
    //.directive("myImg", function () {
    //    return{
    //        restrict:'EA',
    //        scope:{},
    //        replace:true,
    //        transclude: true,
    //        require:'^myImgs',
    //        templateUrl:"./directive/myImg.html",
    //        link: function (scope, elemenet,attrs,myTabsController) {
    //            myTabsController.addScope(scope);
    //        }
    //    }
    //})
    .controller('myCtrl', ['$scope', function ($scope) {
        $scope.data1 = ['全部快餐便当', '米粉面馆', '简餐', '盖浇饭', '香锅砂锅', '麻辣烫'];
        $scope.data2 = ['全部特色菜系', '川湘菜', '其他菜系', '西北菜', '海鲜'];
        $scope.data3 = ['全部异国料理', '披萨意面', '日韩料理', '西餐'];
        $scope.data4 = ['全部小吃夜宵', '地方小吃', '炸鸡炸串', '小龙虾', '烧烤', '鸭脖卤味'];
        $scope.data5 = ['全部甜品饮品', '甜品', '奶茶果汁', '咖啡'];
        $scope.data6 = ['全部果蔬生鲜', '水果'];
        $scope.data7 = ['全部鲜花蛋糕', '鲜花', '蛋糕', '面包'];
        $scope.data8 = ['全部商店超市', '超市', '水站'];
        $scope.isSelect = 0;
        $scope.selectMe = function ($index) {
            $scope.isSelect = $index;
        }
    }]);