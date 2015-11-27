/*global angular */

(function (angular) {

    'use strict';

    /**
     * @ngdoc service
     * @name colorWorkerApp.Toast
     * @description
     * # Toast
     * Factory in the colorWorkerApp.
     */
    angular.module('colorWorkerApp')
        .factory('Toast', function ($mdToast) {
            return {
                /**
                 * Shows toast message using toast material service.
                 * 
                 * @param {string} msg
                 * @return {object}
                 */
                show: function (msg) {
                    return $mdToast.show($mdToast.simple().position('top right').content(msg));
                }
            };
        });

}(angular));