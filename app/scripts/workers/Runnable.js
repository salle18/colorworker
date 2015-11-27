importScripts('RunnableController.js');

var Runnable = (function () {
    'use strict';
    var _interval, _fn, _timeout = 1000;

    function Runnable(fn) {
        _fn = fn;
        _interval = null;
        new RunnableController(this);
    }

    Runnable.prototype.run = function () {
        clearInterval(_interval);
        _interval = setInterval(_fn.bind(this), _timeout);
    };

    Runnable.prototype.wait = function () {
        clearInterval(_interval);
        _interval = null;
    };

    Runnable.prototype.settimeout = function (data) {
        _timeout = data.timeout;
        if (_interval) {
            this.run();
        }
    };

    return Runnable;
}());




