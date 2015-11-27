/*global angular, Worker */

(function (angular, Worker) {
    'use strict';

    /**
     * @ngdoc function
     * @name colorWorkerApp.controller:ConsumerCtrl
     * @description
     * # ConsumerCtrl
     * Controller of the colorWorkerApp
     */
    angular.module('colorWorkerApp')
        .controller('ConsumerCtrl', function ($scope, $rootScope, Storage, Canvas, Toast) {

            var counter = 1, MAX_CONSUMERS = 4, SPEED = 5;

            $scope.consumers = [];
            
            $rootScope.$on('storageFull', function () {
                for (var i = 0; i < $scope.consumers.length; i++) {
                    var consumer = $scope.consumers[i];
                    if (!consumer.isRunning && consumer.auto) {
                        $scope.startConsumer(consumer);
                    }
                }
            });

            $scope.addConsumer = function () {
                if ($scope.consumers.length === MAX_CONSUMERS) {
                    Toast.show('Max number of consumers reached!');
                } else {
                    var consumer = {
                        name: 'Consumer #' + counter++,
                        worker: new Worker('scripts/workers/Consumer.js'),
                        isRunning: false,
                        speed: SPEED,
                        auto: true
                    };

                    $scope.$watch(function () {
                        return consumer.speed;
                    }, function () {
                        consumer.worker.postMessage({command: 'settimeout', timeout: 1000 / consumer.speed});
                    });

                    consumer.worker.onmessage = function () {
                        if (Storage.isEmpty()) {
                            consumer.isRunning = false;
                            Toast.show('Storage is empty...');
                            $scope.$digest();
                            consumer.worker.postMessage({command: 'wait'});
                        } else {
                            var data = Storage.get();
                            Canvas.clear(data.index);
                            consumer.worker.postMessage({command: 'consume', item: data.item});
                        }
                    };
                    $scope.consumers.push(consumer);
                }
            };

            $scope.addConsumer();
            $scope.addConsumer();

            $scope.removeConsumer = function (index) {
                var consumer = $scope.consumers.splice(index, 1)[0];
                consumer.worker.terminate();
            };

            $scope.toggleConsumer = function (index) {
                var consumer = $scope.consumers[index];

                consumer.isRunning ? $scope.pauseConsumer(consumer) : $scope.startConsumer(consumer);
            };

            $scope.startConsumer = function (consumer) {
                consumer.isRunning = true;
                consumer.worker.postMessage({command: 'run'});
            };

            $scope.pauseConsumer = function (consumer) {
                consumer.isRunning = false;
                consumer.worker.postMessage({command: 'wait'});
            };

        });

}(angular, Worker));