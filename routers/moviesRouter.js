// richiamo libreria
const express = require('express')
// estrapoliamo e usiamo la parte di router
const movieRouter = express.Router();
// importo il controller della risorsa movie
const controller = require('../controllers/movieController');


// troviamo la rotta e ritorniamo tutti i film
movieRouter.get('/', controller.indexMovies);
// troviamo la rotta e ritorniamo un film specifico
movieRouter.get('/:id', controller.showMovies);



module.exports = movieRouter;