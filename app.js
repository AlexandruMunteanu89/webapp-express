const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 


// registrare la cartella delle risorse statiche
app.use(express.static("public"));


app.listen(port, () => {
    console.log('Server is running on port ${port}');
});

// Importo router
//const router = require('./routers/router');
const movieRouter = require('./routers/moviesRouter');


// rotta di home
app.get("/", (req, res) => {
    res.send("Ciao")
});

// rotte di CRUD
app.use('/api/movies', movieRouter);