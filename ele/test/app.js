var myApp = angular.module("myApp", ["ui.router"]);
myApp.controller("myctrl",function($scope){
   $scope.classrooms=[{id:1,name:'haha'},{id:2,name:'hihi'}]
});
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/pageTab");
    $stateProvider
        .state("pageTab", {
            url: "/pageTab",
            templateUrl: "pageTab.html"
        })
        .state("pageTab.page1", {
            url: "/page1",
            templateUrl: "page1.html"
        })
        .state("pageTab.page2", {
            url: "/page2",
            templateUrl: "page2.html"
        })
        .state("pageTab.page3", {
            url: "/page3",
            templateUrl: "page3.html"
        });
});