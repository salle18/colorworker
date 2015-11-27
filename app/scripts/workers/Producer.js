/*global self, importScripts, Runnable, Math */

importScripts('Runnable.js');

var Producer = (function () {
    'use strict';
    var id = 1, colors = {}, items = [];

    function randomColor() {
        var keys = Object.keys(colors), color;
        if (!keys.length) {
            return null;
        }
        color = colors[keys[keys.length * Math.random() << 0]];
        return color[color.length * Math.random() << 0];
    }

    Producer.prototype = Object.create(Runnable.prototype);
    Producer.prototype.constructor = Producer;
    function Producer() {
        Runnable.call(this, this.produce);
    }

    Producer.prototype.produce = function () {
        var item, color;
        if (items.length) {
            item = items.shift();
        } else {
            color = randomColor();
            if (!color) {
                this.wait();
                self.postMessage(null);
                return;
            }
            item = {
                id: "#" + id++,
                color: color
            };
        }
        self.postMessage(item);
    };


    Producer.prototype.colors = function (data) {
        var newColors = {}, key;
        for (key in data.colors) {
            if (data.colors[key].on) {
                newColors[key] = data.colors[key].values;
            }
        }
        colors = newColors;
    };

    Producer.prototype.stop = function (data) {
        this.wait();
        items.push(data.item);
    };

    return Producer;
}());

new Producer();