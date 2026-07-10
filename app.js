const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
// import cors middleware
const cors = require("cors");


// importo middleware per path images
const imagePath = require('./middlewares/imagePath');

// Importo router
const movieRouter = require('./routers/moviesRouter');

// abilitiamo dominio FE
app.use(cors({origin: process.env.FE_APP}));

// importo middleware di gestione errore interni server 500
const errorsHandler = require('./middlewares/errorsHandler');

// importo middleware di gestione errore di chiamata su rotta inesistente 404
const notFound = require('./middlewares/notFound');


// middleware per path images
app.use(imagePath);

// registrare la cartella delle risorse statiche
app.use(express.static("public"));

// Attivazione body parser per formato json per le rotte
app.use(express.json());

// rotta di home
app.get("/", (req, res) => {
    res.send("Ciao")
});

// rotte di CRUD
app.use("/api/movies", movieRouter);

// registra globalmente il middleware di gestione errore interno server 500
app.use(errorsHandler);

// registra globalmente il middleware di gestione chiamata su rotta inesistente 404
app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});