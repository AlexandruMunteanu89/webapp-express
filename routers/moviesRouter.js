// richiamo libreria
const express = require('express')
// estrapoliamo e usiamo la parte di router
const movieRouter = express.Router();
// importo il controller della risorsa movie
const controller = require('../controllers/movieController');
const upload = require('../middlewares/multer');


// definisco le varie rotte relative alla risorsa specifica
// index-troviamo la rotta e ritorniamo tutti i film
movieRouter.get('/', controller.indexMovies);
// show-troviamo la rotta e ritorniamo un film specifico
movieRouter.get('/:id', controller.showMovies);
// store reviews
movieRouter.post('/:id/reviews', controller.storeReview);
// store movies
movieRouter.post('/', upload.single('image'), controller.storeMovie);
// destroy
movieRouter.delete('/:id', controller.destroy);



module.exports = movieRouter;