# basekit

## Installation

    $ npm install basekit

## Usage

    var Base = require('basekit').Base;

    // create subclass
    var SomeView = Base.extend(function(superConstructor, superMethods) {
        return [
            function(rootElement) {
                superConstructor.call(this);

                var onCreate = this._addSignal('onCreate');
                this._bind(rootElement, 'click', function() {
                    var newObject = {some: "thing"};
                    onCreate.emit(newObject);
                });
            }
        ];
    });

    // create a view instance
    var myView = new SomeView(document.getElementById('create-item'));
    myView.onCreate.connect(function(item) {
        console.log("object created:", item);
    });

    // later on, we can destroy the view explicitly;
    // this will unbind all event listeners and remove any signal connections
    myView.teardown();