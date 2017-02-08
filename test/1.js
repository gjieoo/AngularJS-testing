<!--定义UserMgt Ajs模块，模块依赖ngRoute-->
var umService = angular.module('UserMgt', ['ngRoute']);

<!--路由定义-->
umService.config(
    function ($routeProvider) {
        $routeProvider
        //<!--项目打开默认调到list.html页面，绑定ListController进行相应的控制-->
        .when('/', {
            controller: ListController,
            templateUrl: '../tml/list.html'
        });
        //<!--定义访问url-->
        //.when('/get/:id', {
        //    <!--定义绑定的控制器-->
        //    controller: GetController,
        //    <!--定义跳转的页面-->
        //    templateUrl: "../tml/detail.html"
        //})
        //    .otherwise({
        //        <!--其他情况，指定url跳转-->
        //        redirectTo: '/'
        //    });
    });

//<!--ListController定义-->
function ListController($scope, $http) {
    <!--获取本地json资源文件-->
    $http.get('../data.json').success(function (data) {
        <!--浏览器console端口打印读取的数据-->
        console.log(data);
        $scope.users = data;
    });
}

<!--GetController控制器定义-->
//function GetController($scope, $http, $routeParams) {
//    var id = $routeParams.id;
//    <!--获取本地json资源文件-->
//    $http.get('../conf/data.json').success(function (data) {
//        console.log(data);
//        $scope.item = data[id];
//    });
//}