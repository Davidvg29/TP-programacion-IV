const express = require('express');
const router = express.Router();
const {
    mostrarEstudiantes,
    mostrarEstudiante,
    crearEstudiante,
    editarEstudiante,
    eliminarEstudiante
} = require('../controller/estudiantes');

// Rutas para estudiantes
router.get('/', mostrarEstudiantes);
router.get('/:id', mostrarEstudiante);
router.post('/', crearEstudiante);
router.put('/:id', editarEstudiante);
router.delete('/:id', eliminarEstudiante);

module.exports = router;