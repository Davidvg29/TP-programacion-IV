const express = require ("express")
const mysql = require ("mysql2")
const {connection} = require('./config/dataBase')
const inscripciones = require ("./router/inscripciones")
const cursos = require ("./router/cursos")
const estudiantes = require('./router/estudiantes')

//instancio express
const app = express()

//utilizo libreria
app.use(express.json())

app.use('/inscripciones', inscripciones)
app.use('/cursos', cursos)
app.use('/estudiantes', estudiantes)


// app.use('/', (req, res)=>{
//    return res.status(200).json('Peticion de prueba jaja jeje jiji jojo juju')
// })


app.listen(8000, () => {
    console.log("Servidor corriendo en el puerto 8000")
})