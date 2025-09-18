const express = require('express')
const { mostrarInscripciones, crearInscripcion, editarInscripcion, borrarInscripcion } = require('../controller/inscripciones')
const router = express.Router()

router.get('/', mostrarInscripciones)
router.post('/', crearInscripcion)
router.put('/:id', editarInscripcion)
router.delete('/:id', borrarInscripcion)

module.exports = router