/*global angular, Math */

(function (angular, Math) {

    'use strict';

    /**
     * @ngdoc service
     * @name colorWorkerApp.Storage
     * @description
     * # Color
     * Factory in the colorWorkerApp.
     */
    angular.module('colorWorkerApp')


        .factory('Storage', function ($rootScope) {
            var SIZE = 100, empty = [], filled = [];
            var items = new Array(SIZE);
            for (var i = 0; i < SIZE; i++) {
                empty.push(i);
            }
            return {
                /**
                 * Adds item to storage to the random empty space.
                 *
                 * @param {object} item
                 * @return {integer}
                 */
                add: function (item) {
                    var arrindex = Math.floor(Math.random() * empty.length);
                    var index = empty.splice(arrindex, 1);
                    filled.push(index);
                    items.push(item);
                    $rootScope.$emit('storageAdd', {
                        filled: this.filled()
                    });
                    return index;
                },
                /**
                 * Returns random item from storage.
                 *
                 * @return {object}
                 */
                get: function () {
                    var arrindex = Math.floor(Math.random() * filled.length);
                    var index = filled.splice(arrindex, 1);
                    var item = items.splice(arrindex, 1);
                    empty.push(index);
                    $rootScope.$emit('storageGet', {
                        filled: this.filled()
                    });
                    return {item: item, index: index};
                },
                /**
                 * Checks if storage is full.
                 *
                 * @return {boolean}
                 */
                isFull: function () {
                    var isFull = filled.length === SIZE;
                    if (isFull) {
                        $rootScope.$emit('storageFull', {
                            filled: SIZE
                        });
                    }
                    return isFull;
                },
                /**
                 *  Checks if storage is empty.
                 *
                 *  @return {boolean}
                 */
                isEmpty: function () {
                    var isEmpty = filled.length === 0;
                    if (isEmpty) {
                        $rootScope.$emit('storageEmpty', {
                            filled: 0
                        });
                    }
                    return isEmpty;
                },
                /**
                 * Returns percent of filled space in storage.
                 *
                 * @return {float}
                 */
                filled: function () {
                    return filled.length / SIZE * 100;
                }
            };
        });

}(angular, Math));