const { connection } = require('../config/dataBase');

// Obtener todos los estudiantes
const mostrarEstudiantes = (req, res) => {
    connection.query('SELECT * FROM Estudiantes', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los estudiantes' });
        }
        res.json(results);
    });
};

// Obtener un estudiante por ID
const mostrarEstudiante = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Estudiantes WHERE id_estudiante = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el estudiante' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo estudiante
const crearEstudiante = (req, res) => {
    const { nombre, email } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    connection.query(
        'INSERT INTO Estudiantes (nombre, email) VALUES (?, ?)',
        [nombre, email],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al crear el estudiante', detalle: error.message });
            }
            res.json({ message: 'Estudiante creado correctamente' });
        }
    );
};

// Editar un estudiante existente
const editarEstudiante = (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    connection.query(
        'UPDATE Estudiantes SET nombre = ?, email = ? WHERE id_estudiante = ?',
        [nombre, email, id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al editar el estudiante' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Estudiante no encontrado' });
            }
            res.json({ id, nombre, email });
        }
    );
};

// Eliminar un estudiante
const eliminarEstudiante = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Estudiantes WHERE id_estudiante = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el estudiante' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarEstudiantes,
    mostrarEstudiante,
    crearEstudiante,
    editarEstudiante,
    eliminarEstudiante
};