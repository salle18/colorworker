/*global angular, Worker */

(function (angular, Worker) {
    'use strict';

    /**
     * @ngdoc function
     * @name colorWorkerApp.controller:ProducerCtrl
     * @description
     * # ProducerCtrl
     * Controller of the colorWorkerApp
     */
    angular.module('colorWorkerApp')
        .controller('ProducerCtrl', function ($scope, $rootScope, Color, Storage, Canvas, Toast) {

            var colors = Color.getPalletes(), SPEED = 10;

            $scope.producer = {
                worker: new Worker('scripts/workers/Producer.js'),
                isRunning: false,
                speed: SPEED,
                auto: true
            };

            $scope.colors = {};

            for (var key in colors) {
                if (colors.hasOwnProperty(key)) {
                    $scope.colors[key] = {
                        values: colors[key],
                        on: false
                    };
                }
            }
            $scope.colors[Color.getRandomKey()].on = true;

            $scope.toggleColor = function (key) {
                $scope.colors[key].on = !$scope.colors[key].on;
                $scope.producer.worker.postMessage({command: 'colors', colors: $scope.colors});
            };

            $scope.producer.worker.postMessage({command: 'colors', colors: $scope.colors});

            $scope.$watch('producer.speed', function () {
                $scope.producer.worker.postMessage({command: 'settimeout', timeout: 1000 / $scope.producer.speed});
            });

            $rootScope.$on('storageEmpty', function () {
                if (!$scope.producer.isRunning && $scope.producer.auto) {
                    $scope.startProducer();
                }
            });

            $scope.producer.worker.onmessage = function (event) {
                var item = event.data, index;
                if (Storage.isFull()) {
                    $scope.producer.isRunning = false;
                    Toast.show('Storage is full...');
                    $scope.$digest();
                    $scope.producer.worker.postMessage({command: 'stop', item: item});
                } else {
                    if (item) {
                        index = Storage.add(item);
                        Canvas.draw(item, index);
                    } else {
                        $scope.producer.isRunning = false;
                        Toast.show('Producer can not make colors...');
                    }
                }
            };
            $scope.toggleProducer = function () {
                $scope.producer.isRunning ? $scope.pauseProducer() : $scope.startProducer();
            };

            $scope.startProducer = function () {
                $scope.producer.isRunning = true;
                $scope.producer.worker.postMessage({command: 'run'});
            };

            $scope.pauseProducer = function () {
                $scope.producer.isRunning = false;
                $scope.producer.worker.postMessage({command: 'wait'});
            };
        });

}(angular, Worker));