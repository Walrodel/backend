var mongoose = require('mongoose');

var PuntajeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    nivel: {
        type: String,
        required: true,
    },
    puntos: {
        type: Number,
        required: true,
    },
    updated_date: { 
        type: Date, 
        default: Date.now },
  });

  var puntaje = mongoose.model('Puntaje', PuntajeSchema);
  module.exports = puntaje;