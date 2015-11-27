/*global self, importScripts, Runnable */

importScripts('Runnable.js');

var Consumer = (function () {
    'use strict';

    var consumed = [], SIZE = 10;

    Consumer.prototype = Object.create(Runnable.prototype);
    Consumer.prototype.constructor = Consumer;
    function Consumer() {
        Runnable.call(this, this.onConsume);
    }

    Consumer.prototype.onConsume = function () {
        self.postMessage({command: 'consume'});
    };

    Consumer.prototype.consume = function (data) {
        consumed.push(data);
        if (consumed.length > SIZE) {
            consumed.shift();
        }
    };



    return Consumer;
}());

/*jshint nonew: true */
new Consumer();