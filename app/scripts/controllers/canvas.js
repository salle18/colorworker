/*global angular */

(function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name colorWorkerApp.controller:CanvasCtrl
     * @description
     * # CanvasCtrl
     * Controller of the colorWorkerApp
     */
    angular.module('colorWorkerApp')
        .controller('CanvasCtrl', function ($scope, $rootScope) {
            $scope.filled = 0;
            $rootScope.$on('storageAdd', function (event, data) {
                $scope.filled = data.filled;
                $scope.$digest();
            });
            $rootScope.$on('storageGet', function (event, data) {
                $scope.filled = data.filled;
                $scope.$digest();
            });
        });
}(angular));