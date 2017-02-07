var app = angular.module('myapp', []);
app.directive("myTab",function(){
   return {
       restrict:'E',
       replace:true,
       scope:{
           myId:'@',
           myData:'='
       },
       controller:['$scope',function($scope){
           $scope.name='hihi';
       }],
       templateUrl:'temp.html',
       link:function(scope,element,attr){
           element.delegate('input','click',function(){
               //$(this).attr('class','active')
               $(this).attr('class','active').siblings('input').attr('class','');
               $(this).siblings('div').eq($(this).index()).css('display','block').siblings('div').css('display','none');
           });
       }
   }
});
app.controller('myCtrl', ['$scope', function ($scope) {
    $scope.data1=[
        {title:'haha',content:'12121212121'},
        {title:'hehe',content:'34343434343'},
        {title:'huhu',content:'56565656565'}];
    $scope.data2=[
        {title:'wawa',content:'111111111111'},
        {title:'wewe',content:'222222222222'},
        {title:'wuwu',content:'333333333333'}]
}]);
