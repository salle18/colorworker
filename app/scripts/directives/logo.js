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
        .directive('cwLogo', function () {
            return {
                restrict: 'E',
                template: '<span data-cw-colorize="ColorWorker"></span>'
            };
        });
}(angular));

