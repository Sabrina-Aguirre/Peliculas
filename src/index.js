/*API de Películas Favoritas
Objetivo: API CRUD básica para una lista de películas favoritas.
Pasando un json
*/

const express = require("express");
const misPelis = require("./peliculas.json");
const PORT=3001;
const _= require("lodash");


const app = express();

app.use(express.json());

//me trae todos las peliculas del json
app.get("/peliculas", (req, res)=>{
    res.status(200).json(misPelis);
})

//me trae peliculas por id
app.get('/peliculas/:peliculaId', (req, res)=>{
    const idPelicula =req.params.peliculaId;
    const pelicula = misPelis.find((p)=> p.id==idPelicula);
    res.status(200).json(pelicula);
    if(!pelicula)
    {
        res.status(404).json({message:`La pelicula ${idPelicula} no se ha encontrado`})
    }
});

app.post('/peliculas', (req,res) =>{
    const datosPelicula = res.body;
    const ids=misPelis.map((p)=>p.id);
    const idMax=_.max(ids) + 1;
    const peliculaNueva = {id: idMax, ...datosPelicula};
    misPelis.push(peliculaNueva);
    res.status(200).json(peliculaNueva);

});

app.put('/peliculas/:peliculaId', (req, res) => {
    const idPelicula = parseInt(req.params.peliculaId);
    const index = misPelis.findIndex((p) => p.id == idPelicula);

    if (index === -1) {
        return res.status(404).json({ mensaje: `Película con ID ${idPelicula} no encontrada.` });
    }

    const { titulo, director, anio } = req.body;

    if (!titulo || !director || !anio) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios." });
    }

    misPelis[index] = { id: idPelicula, titulo, director, anio };

    res.status(200).json({ mensaje: "Película actualizada correctamente.", pelicula: misPelis[index] });
});


app.delete('/peliculas/:peliculaId',(req, res)=>{
    const idPelicula =parseInt(req.params.peliculaId);
    const idexPeli = misPelis.findIndex((p)=> p.id==idPelicula);
    if(idexPeli >=0){
        misPelis.splice(idexPeli,1);
        res.status(200).json({mensaje: `La película ${idPelicula} se ha borrado.` });
    }else{
        res.status(404).json({ mensaje: `No se ha encontrado la pelicula ${idPelicula}.` });
    }

});
app.listen(PORT, ()=>{
    console.log(`La app inicicio en el puerto ${PORT}`)
});

