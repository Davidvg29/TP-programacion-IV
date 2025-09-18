const { connection } = require("../config/dataBase")

const mostrarInscripciones = (req, res)=>{
    connection.query('SELECT *  FROM inscripciones', (error, result)=>{
        if(error){
            return res.status(500).json('Ocurrio un error al obtener todos las isncripciones.')
        }
        return res.status(200).json(result)
    })
}

const crearInscripcion = (req,res)=>{
    const {fecha_inscripcion, id_estudiante, id_curso} = req.body;
    const queryInsertInscripcion = `INSERT INTO inscripciones(fecha_inscripcion, id_estudiante, id_curso)
            VALUES(?, ?, ?);`
    connection.query(queryInsertInscripcion, [fecha_inscripcion, id_estudiante, id_curso], (error, result)=>{
        if(error){
            console.log(error);
            return res.status(500).json('Ocurrio un error al crear la inscripcion.')
        }
        return res.status(200).json(result)
    }) 
}

const editarInscripcion = (req, res)=>{
    const {id} = req.params
    const {fecha_inscripcion, id_estudiante, id_curso} = req.body

    if(!id || !fecha_inscripcion || !id_estudiante || !id_curso){
        return res.status(500).json('Por favor, ingresa todos los campos correspondiente.')
    }

    const queryBuscarIdInscripcion = `SELECT * FROM inscripciones where id_inscripcion = ?`
    connection.query(queryBuscarIdInscripcion, [id], (error, result)=>{
        if(error){
            return res.status(500).json('Ocurrio un error al buscar inscripcion por id.')
        }
        if(result.length === 0){
            return res.status(404).json('Inscripcion no encontrada.')
        }
        const queryBuscarIdEstudiante = `SELECT * FROM estudiantes where id_estudiante = ?`
        connection.query(queryBuscarIdEstudiante, [id_estudiante], (error, result)=>{
            if(error){
                return res.status(500).json('Ocurrio un error al buscar estudiante por id.')
            }
            if(result.length === 0){
                return res.status(404).json('Estudiante no encontrado.')
            }
            const queryBuscarIdCurso = `SELECT * FROM cursos where id_curso = ?`
            connection.query(queryBuscarIdCurso, [id_curso], (error, result)=>{
                if(error){
                    return res.status(500).json('Ocurrio un error al buscar curso por id.')
                }
                if(result.length === 0){
                    return res.status(404).json('Curso no encontrado.')
                }
                const queryUpdateInscripcion = `update inscripciones set fecha_inscripcion = ?, id_estudiante = ?, id_curso = ? where id_inscripcion = ?`
                connection.query(queryUpdateInscripcion, [fecha_inscripcion, id_estudiante, id_curso, id], (error, result)=>{
                    if(error){
                        return res.status(500).json('Ocurrio un error al actualizar inscripcion.')
                    }
                    if(result.affectedRows > 0){
                        return res.status(200).json('Inscripcion actualizada correctamente.')
                    }
                })
            })   
        }) 
    })    
}

const borrarInscripcion = (req, res)=>{
    const {id} = req.params
    const queryBorrarInscripcionId = `DELETE FROM inscripciones where id_inscripcion = ?`
    connection.query(queryBorrarInscripcionId, [id], (error, result)=>{
        if(error){
            return res.status(500).json('Ocurrio un error al eliminar inscripcion.')
        }
        if(result.affectedRows === 0){
        return res.status(404).json('Inscripcion no encontrada.')

        }
        return res.status(200).json('Inscripcion eliminada correctamente.')
    })
}

module.exports = {
    mostrarInscripciones,
    crearInscripcion,
    editarInscripcion,
    borrarInscripcion
}