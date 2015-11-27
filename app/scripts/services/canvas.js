/*global angular, Math */

(function (angular, Math) {

    'use strict';

    /**
     * @ngdoc service
     * @name colorWorkerApp.Canvas
     * @description
     * # Color
     * Factory in the colorWorkerApp.
     */
    angular.module('colorWorkerApp')
        .factory('Canvas', function () {
            var canvas = null, SIZE = 10, RECTANGLE_SIZE = 60;
            return {
                /**
                 * Sets canvas context.
                 *
                 * @param {jQuery} $element
                 */
                setCanvas: function ($element) {
                    canvas = $element[0].getContext("2d");
                },
                /**
                 * Draws rectangle for the given index using item color.
                 *
                 * @param {object} item
                 * @param {integer} index
                 */
                draw: function (item, index) {
                    var x = Math.floor(index / SIZE) * RECTANGLE_SIZE,
                        y = (index % SIZE) * RECTANGLE_SIZE;
                    canvas.fillStyle = item.color;
                    canvas.fillRect(x, y, RECTANGLE_SIZE, RECTANGLE_SIZE);
                    canvas.fillStyle = '#fff';
                    canvas.fillText(item.color, x + 10, y + 30, RECTANGLE_SIZE);
                },
                /**
                 * Clears rectangle for the given index.
                 *
                 * @param {integer} index
                 */
                clear: function (index) {
                    var x = Math.floor(index / SIZE) * RECTANGLE_SIZE,
                        y = (index % SIZE) * RECTANGLE_SIZE;
                    canvas.clearRect(x, y, RECTANGLE_SIZE, RECTANGLE_SIZE);
                }
            };
        });

}(angular, Math));
