var express = require('express');
var router = express.Router();
var puntaje = require('../controller/puntaje');

router.get('/', puntaje.listar);

/**
 * To create the New puntaje
 */
router.post('/', puntaje.create);

/**
 * TO get the single puntaje by their puntajename eg.email
 */
//router.get('/:id', puntaje.find);

/**
 * To update puntaje data(fields) by puntaje ID
 */
//router.put('/:id', puntaje.updateById);

/**
 * To delete the puntaje by condition
 */
//router.delete('/:id', puntaje.delete);

module.exports = router;