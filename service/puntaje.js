(function () {
    var mongoose = require('mongoose');
    var puntaje = mongoose.model('Puntaje');

    exports.createPuntaje = function (data, callback) {
        puntaje.create(data).then((response) => {
            callback(null, response);
        }, (error) => {
            callback(error, null);
        });
    };

    exports.findPuntaje = function (query, callback) {
        puntaje.findOne(query, callback);
    }

    exports.cinco = function (query, callback) {
        puntaje.find(query, callback).sort({_id:-1}).limit(5);
    }
    
})()