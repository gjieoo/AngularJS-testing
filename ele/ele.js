var app=angular.module("myApp",['ngRoute'])
    .controller("appCon",["$scope",function($scope){}])
    .directive("myTabs", function () {
        return{
            restrict:"EA",
            transclude: true,
            replace:true,
            scope:{},
            templateUrl:"./directive/myTabs.html",
            controller:["$scope", function ($scope) {     //使用controller让最内层指令来继承外层指令，这样内层就可以
                                                             // 通过scope的传导，来与外层指令进行数据之间的传递
                var panes = $scope.scopes = [];
                $scope.select= function (pane) {            //实现tabs功能
                    angular.forEach(panes, function (scope) {      //遍历所有内存指令scope，统一隐藏内容。
                        scope.selected=false;
                    });
                    pane.selected=true;                             //通过ng-repeat
                };
                this.addScope= function (scope) {                   //由内层指令来继承，把内层指令的scope，传到进外层指令进行控制
                    if(panes.length===0){
                        $scope.select(scope);
                    }
                    panes.push(scope);                                //把内层指令数组，传入外层指令scope数组。
                }
            }]
        }
    })
    .directive("myPane", function () {
        return{
            restrict:'EA',
            scope:{
                title:'@'
            },
            transclude: true,
            require:'^myTabs',
            replace:true,
            templateUrl:"./directive/myPane.html",
            link: function (scope, elemenet,attrs,myTabsController) {
                myTabsController.addScope(scope);                    //把内层指令的scope存入到外层指令中，让外层遍历。
            }
        }
    })
    .directive("myImgs", function () {
        return{
            restrict:"EA",
            transclude: true,
            scope:{},
            replace:true,
            templateUrl:"./directive/myImgs.html",
            controller:["$scope",'$http',function($scope,$http){
                $http.get('goods1.json').success(function(data){
                    $scope.goods=data;
                    console.log($scope.goods[0].img);
                });
                //$scope.$location=$location;,'$location','$rootParams


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
    .directive("myImg", function () {
        return{
            restrict:'EA',
            scope:{},
            replace:true,
            transclude: true,
            require:'^myImgs',
            templateUrl:"./directive/myImg.html",
            link: function (scope, elemenet,attrs,myTabsController) {
                myTabsController.addScope(scope);
            }
        }
    })
    //.controller('content', ['$scope', function ($scope) {
    //    $scope.show=false;
    //    $scope.showDetails=function(){
    //        $scope.show=true;
    //    };
    //    $scope.hideDetails=function(){
    //        $scope.show=false;
    //    }
    //}])
    .controller('myCtrl', ['$scope', function ($scope) {
    $scope.data1 = ['全部快餐便当', '米粉面馆', '简餐', '盖浇饭','香锅砂锅', '麻辣烫', '饺子馄饨', '黄焖鸡米饭','包子粥店', '汉堡', '烧腊饭', '咖喱饭'];
    $scope.data2 = ['全部特色菜系', '川湘菜', '其他菜系', '西北菜','火锅烤鱼', '海鲜', '粤菜', '新疆菜','东北菜', '江浙菜', '鲁菜', '云南菜'];
    $scope.data3 = ['全部异国料理', '披萨意面', '日韩料理', '西餐','东南亚菜'];
    $scope.data4 = ['全部小吃夜宵', '地方小吃', '炸鸡炸串', '小龙虾','烧烤', '鸭脖卤味', '零食'];
    $scope.data5 = ['全部甜品饮品', '甜品', '奶茶果汁', '咖啡'];
    $scope.data6 = ['全部果蔬生鲜', '水果', '蔬菜', '生鲜','海鲜水产'];
    $scope.data7 = ['全部鲜花蛋糕', '鲜花', '蛋糕', '面包'];
    $scope.data8 = ['全部商店超市', '超市', '水站', '奶站','粮油','茶', '便利店', '美妆母婴', '零食饮料','名酒坊'];
    $scope.isSelect=0;
    $scope.selectMe = function ($index) {
        $scope.isSelect = $index;
    }}]);