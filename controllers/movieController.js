// Importiamo il file di connessione al database
const connection = require('../database/connection');
const { error } = require('node:console');


// elenco funzioni relative alle rotte della risorsa movie
const indexMovies = (req, res) => {
    

    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, results) => {
        console.log(err);
        
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
            const movies = results.map((movie) => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        
        console.log(results);
        
        res.json(movies);
        
    });
    
}


function showMovies (req, res) {
    // recuperiamo l'id dall' URL
    const id = req.params.id

    /// query da eseguire con ?segnaposto per prepared statement per movie
    const sql = 'SELECT * FROM movies WHERE id = ?';

    // query da eseguire con ?segnaposto per le reviews del movie
    const reviewsSql = `select * from reviews where movie_id = ?`;

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // Recuperiamo il post
        const movie = results[0];

        movie.image = req.imagePath + movie.image;

        // Se è andata bene, eseguiamo la seconda query per i reviews
        connection.query(reviewsSql, [id], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query failed'});

            // Aggiungiamo i reviews del movi
            movie.tags = results;
            // Returniamo il movie con la nuova prop reviews
            res.json(movie);
        })
});
};



module.exports = {indexMovies, showMovies};