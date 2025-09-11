const express = require ("express")
const mysql = require ("mysql2")
const cursos = require ("./router/cursos")
const estudiantes = require ("./router/estudiantes")
const inscripciones = require ("./router/inscripciones")


//instancio express
const app = express()

//utilizo libreria
app.use(express.json())

app.use("/cursos",cursos)
app.use("/estudiantes", estudiantes)
app.use("/inscripciones", inscripciones)




app.get("/cursos", (req,res) => {
    res.send("API de cursos")
})

app.get("/estudiantes", (req,res) => {
    res.send("API de estudiantes")
})

app.get("/inscripciones", (req,res) => {
    res.send("API de inscripciones")
})

app.listen(8000, () => {
    console.log("Servidor corriendo en el puerto 8000")
})