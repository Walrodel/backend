const puntajeService = require('../service/puntaje');

exports.create = function (req, res, next) {
    var body = new Puntaje(req.body);
    console.log(req.body)
    if (!body.username) {
        res.status(400).send('username es requerido');
        return;
    }
    puntajeService.createPuntaje(body, function (error, response) {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });

}

exports.listar = function (req, res) {
    const filter = {};
    puntajeService.cinco(filter, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
}

class Puntaje {
    constructor(puntajeData) {
        this.username = puntajeData.username || '';
        this.nivel = puntajeData.nivel || '';
        this.puntos = puntajeData.puntos || '';
    }
}
