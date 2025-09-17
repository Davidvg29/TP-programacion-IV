const { connection } = require('../config/dataBase');

// Obtener todos los cursos
const mostrarCursos = (req, res) => {
    connection.query('SELECT * FROM cursos', (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los cursos' });
        }
        res.json(result);
    });
};
// Obtener un curso por ID
const mostrarCurso = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM cursos WHERE id_curso  = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el curso' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo curso
const crearCurso = (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    connection.query(
        'INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion],
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Error al crear el curso' });
            }
            res.status(201).json({ mensaje: 'Curso creado correctamente', id: result.insertId });
        }
    );
};

// Actualizar un curso existente
const actualizarCurso = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    connection.query(
        'UPDATE cursos SET nombre = ?, descripcion = ? WHERE id_curso = ?',
        [nombre, descripcion, id],
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Error al actualizar el curso' });
            }
            res.json({ mensaje: 'Curso actualizado correctamente' });
        }
    );
};

// Eliminar un curso
const eliminarCurso = (req, res) => {
    const { id } = req.params;
    connection.query(
        'DELETE FROM cursos WHERE id_curso = ?',
        [id],
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Error al eliminar el curso' });
            }
            res.json({ mensaje: 'Curso eliminado correctamente' });
        }
    );
};

module.exports = {
    mostrarCursos,
    mostrarCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}