var RunnableController = (function () {
    'use strict';

    function RunnableController(runnable) {
        self.onmessage = function (event) {
            var data = event.data;
            var command = data.command;
            if (typeof runnable[command] === 'function') {
                runnable[command](data);
            } else {
                console.error('Unknown command:', command);
            }
        };
    }

    return RunnableController;
}());
