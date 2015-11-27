/*global angular */

(function (angular) {
    'use strict';

    /**
     * @ngdoc directive
     * @name colorWorkerApp.directive:colorize
     * @description
     * # colorize
     */
    angular.module('colorWorkerApp')
        .directive('cwColorize', function (Color) {
            return {
                restrict: 'A',
                scope: {
                    cwColorize: '@'
                },
                link: function (scope, element) {
                    var colorized = scope.cwColorize.split('').map(function (item) {
                        return '<span style="color:' + Color.getNextValue() + ';">' + item + '</span>';
                    }).join('');
                    element.html(colorized);
                }
            };
        });
}(angular));