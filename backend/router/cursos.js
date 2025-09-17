const express = require('express');
const { mostrarCursos, mostrarCurso, crearCurso, actualizarCurso, eliminarCurso} = require('../controller/cursos');
const router = express.Router();

router.get('/',mostrarCursos);
router.get('/:id',mostrarCurso);
router.post('/',crearCurso);
router.put('/:id',actualizarCurso);
router.delete('/:id',eliminarCurso);

module.exports=router;

