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


// middleware per path images
app.use(imagePath);

// registrare la cartella delle risorse statiche
app.use(express.static("public"));

// 2. registram rutele INAINTE de listen
app.use('/movies', movieRouter);

// rotta di home
app.get("/", (req, res) => {
    res.send("Ciao")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






// rotte di CRUD
app.use("/api/movies", movieRouter);