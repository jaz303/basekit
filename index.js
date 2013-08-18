var Class   = require('classkit').Class,
    signal  = require('signalkit').signal;

var Base = Class.extend(function(sc, sm) {

    return [
        function() {
            this._teardown = [];
        },
        'methods', {
            teardown: function() {
                this._teardown.forEach(function(td) { td(); });
            },

            _addSignal: function(name) {
                var sig = signal(name);
                this[name] = sig;
                this._teardown.push(function() {
                    sig.clear();
                });
                return sig;
            },

            _bind: function(el, event, handler) {
                el.addEventListener(event, handler);
                this._teardown.push(function() {
                    el.removeEventListener(event, handler);
                });
            }
        }
    ];

});

exports.Base = Base;