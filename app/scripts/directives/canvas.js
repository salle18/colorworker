/*global angular */

(function (angular) {
    'use strict';

    /**
     * @ngdoc directive
     * @name colorWorkerApp.directive:logo
     * @description
     * # logo
     */
    angular.module('colorWorkerApp')
        .directive('cwCanvas', function () {
            return {
                replace: true,
                template: '<canvas class="md-whiteframe-z2" width="600" height="600"></canvas>',
                restrict: 'E',
                controller: function (Canvas, $element, $scope) {
                    Canvas.setCanvas($element);
                }
            };
        });
}(angular));
