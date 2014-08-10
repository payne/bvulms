var bvulmsApp = angular.module('bvulmsApp', []);

bvulmsApp.controller('CourseListCtrl', function($scope, $http) {
/*
    $scope.courses = [ { 'id': 1, 'prefix': '0BVU-350', 'title': 'Empowerment' },
                       { 'id': 2, 'prefix': '0BVU-450', 'title': 'Capstone' },
                       { 'id': 3, 'prefix': '0BVU-200', 'title': 'Retention' },
                       { 'id': 4, 'prefix': '0BVU-400', 'title': 'Summer Camp' } ];
*/
    $http.get('/courses/listJson').
        success(function(data, status, headers, config) {
            $scope.courses = data;
        });
    $scope.orderProp = 'prefix';
});
