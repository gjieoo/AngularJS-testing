var app = angular.module("myApp", ['ui.router'])
    .controller("appCon", ["$scope", "$http", function ($scope, $http) {
        $http.get('goods1.json').success(function (data) {
            $scope.goods = data;
        });
        $scope.$broadcast('sendAllGoods', $scope.goods);
    }])
    .controller('myImgs', ['$scope', function ($scope) {
        $scope.$on('sendAllGoods', function (event, data) {
        });
        $scope.$on('sendlGoods', function (event, data) {
        });

    }])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: './directive/myImgs.html'
            })
            .state('fastFood', {
                url: '/fastFood',
                templateUrl: 'fastFood/fastFood.html'
            })
            .state('riceNoodles', {
                url: '/riceNoodles',
                templateUrl: 'fastFood/riceNoodles.html'
            })
            .state('simpleMeals', {
                url: '/simpleMeals',
                templateUrl: 'fastFood/simpleMeals.html'
            })
            .state('riceBowl', {
                url: '/riceBowl',
                templateUrl: 'fastFood/riceBowl.html'
            })
            .state('incensePot', {
                url: '/incensePot',
                templateUrl: 'fastFood/incensePot.html'
            })
            .state('hotpot', {
                url: '/hotpot',
                templateUrl: 'fastFood/hotpot.html'
            })
            .state('specialFood', {
                url: '/specialFood',
                templateUrl: 'specialFood/specialFood.html'
            })
            .state('sichuanDish', {
                url: '/sichuanDish',
                templateUrl: 'specialFood/sichuanDish.html'
            })
            .state('otherFood', {
                url: '/otherFood',
                templateUrl: 'specialFood/otherFood.html'
            })
            .state('northwestFood', {
                url: '/northwestFood',
                templateUrl: 'specialFood/northwestFood.html'
            })
            .state('seaFood', {
                url: '/seaFood',
                templateUrl: 'specialFood/seaFood.html'
            })
            .state('foreignlandFood', {
                url: '/foreignlandFood',
                templateUrl: 'foreignLandFood/foreignLandFood.html'
            })
            .state('pizza', {
                url: '/pizza',
                templateUrl: 'foreignLandFood/pizza.html'
            })
            .state('japaneseFood', {
                url: '/japaneseFood',
                templateUrl: 'foreignLandFood/japaneseFood.html'
            })
            .state('westFood', {
                url: '/westFood',
                templateUrl: 'foreignLandFood/westFood.html'
            })
            .state('snackFood', {
                url: '/snackFood',
                templateUrl: 'snackFood/snackFood.html'
            })
            .state('localFood', {
                url: '/localFood',
                templateUrl: 'snackFood/localFood.html'
            })
            .state('friedChicken', {
                url: '/friedChicken',
                templateUrl: 'snackFood/friedChicken.html'
            }).state('cray', {
                url: '/cray',
                templateUrl: 'snackFood/cray.html'
            })
            .state('barbecue', {
                url: '/barbecue',
                templateUrl: 'snackFood/barbecue.html'
            })
            .state('sweetmeats', {
                url: '/sweetmeats',
                templateUrl: 'sweetmeats/sweetmeats.html'
            })
            .state('sweet', {
                url: '/sweet',
                templateUrl: 'sweetmeats/sweet.html'
            })
            .state('milkyTea', {
                url: '/milkyTea',
                templateUrl: 'sweetmeats/milkyTea.html'
            })
            .state('coffee', {
                url: '/coffee',
                templateUrl: 'sweetmeats/coffee.html'
            })
            .state('fruit', {
                url: '/fruit',
                templateUrl: './fruit/fruit.html'
            })
            .state('fruitShop', {
                url: '/fruitShop',
                templateUrl: 'fruit/fruitShop.html'
            })
            .state('cake', {
                url: '/cake',
                templateUrl: 'cake/cake.html'
            })
            .state('flower', {
                url: '/flower',
                templateUrl: 'cake/flower.html'
            })
            .state('cakeShop', {
                url: '/cakeShop',
                templateUrl: 'cake/cakeShop.html'
            })
            .state('bread', {
                url: '/bread',
                templateUrl: 'cake/bread.html'
            })
            .state('supermarket', {
                url: '/supermarket',
                templateUrl: 'supermarket/supermarket.html'
            })
            .state('store', {
                url: '/store',
                templateUrl: 'supermarket/store.html'
            })
            .state('water', {
                url: '/water',
                templateUrl: 'supermarket/water.html'
            });
    })
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
                title: '@',
                classfiy: '@'
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
    .controller('myCtrl', ['$scope', function ($scope) {
        $scope.data = [[{name: '全部快餐便当', specificallyInfo: 'fastFood'},
            {name: '米粉面馆', specificallyInfo: 'riceNoodles'},
            {name: '简餐', specificallyInfo: 'simpleMeals'},
            {name: '盖浇饭', specificallyInfo: 'riceBowl'},
            {name: '香锅砂锅', specificallyInfo: 'incensePot'},
            {name: '麻辣烫', specificallyInfo: 'hotpot'}],
            [{name: '全部特色菜系', specificallyInfo: 'specialFood'},
                {name: '川湘菜', specificallyInfo: 'sichuanDish'},
                {name: '其他菜系', specificallyInfo: 'otherFood'},
                {name: '西北菜', specificallyInfo: 'northwestFood'},
                {name: '海鲜', specificallyInfo: 'seaFood'}],
            [{name: '全部异国料理', specificallyInfo: 'foreignlandFood'},
                {name: '披萨意面', specificallyInfo: 'pizza'},
                {name: '日韩料理', specificallyInfo: 'japaneseFood'},
                {name: '西餐', specificallyInfo: 'westFood'}],
            [{name: '全部小吃夜宵', specificallyInfo: 'snackFood'},
                {name: '地方小吃', specificallyInfo: 'localFood'},
                {name: '炸鸡炸串', specificallyInfo: 'friedChicken'},
                {name: '小龙虾', specificallyInfo: 'cray'},
                {name: '烧烤', specificallyInfo: 'barbecue'},
                {name: '鸭脖卤味', specificallyInfo: 'duckNeck'}],
            [{name: '全部甜品饮品', specificallyInfo: 'sweetmeats'},
                {name: '甜品', specificallyInfo: 'sweet'},
                {name: '奶茶果汁', specificallyInfo: 'milkyTea'},
                {name: '咖啡', specificallyInfo: 'coffee'}],
            [{name: '全部果蔬生鲜', specificallyInfo: 'fruit'},
                {name: '水果', specificallyInfo: 'fruitShop'}],
            [{name: '全部鲜花蛋糕', specificallyInfo: 'cake'},
                {name: '鲜花', specificallyInfo: 'flower'},
                {name: '蛋糕', specificallyInfo: 'cakeShop'},
                {name: '面包', specificallyInfo: 'bread'}],
            [{name: '全部商店超市', specificallyInfo: 'supermarket'},
                {name: '超市', specificallyInfo: 'store'},
                {name: '水站', specificallyInfo: 'water'}]];
        $scope.isSelect = 0;
        $scope.selectMe = function ($index) {
            $scope.isSelect = $index;
        };
    }]);
