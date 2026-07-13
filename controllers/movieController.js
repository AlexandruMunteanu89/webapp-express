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

// dettaglio del film con reviews associate
function showMovies (req, res) {
    // recuperiamo l'id dall' URL
    const id = req.params.id

    // query da eseguire con ?segnaposto per prepared statement per movie
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

            // Aggiungiamo i reviews del film
            movie.tags = results;
            // Returniamo il movie con la nuova prop reviews
            res.json(movie);
        })
});
};

// funzione di stode del film
function storeMovie (req, res) {
    const { title, director, genre, release_year, abstract } = req.body;

    const imageName = `${req.file.filename}`;
    // prepariamo la query
    const sql = "INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)";
    // eseguiamo la query
    connection.query(
        sql,
        [title, director, genre, release_year, abstract, imageName],
        (err, results) => {
            if (err) {
                console.log(err)
                return (new Error("Errore interno del server"));
            }
            res.status(201).json({ id: results.insertId }); // restituiamo l'id assegnato dal DB
        });
};

// inserimento di review specifica legata ad un movie
function storeReview(req, res) {
    // recuperiamo l'id dall' URL
    const id = req.params.id;

    // recuperiamo info nel body
    const { text, name, vote } = req.body;

    // prepariamo la query
    const sql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?,?,?,?)';

    // chiamata per esecuzione query aggiunta review
    connection.query(sql, [text, name, vote, id], (err, reviewResult) => {
        if (err) return res.status(500).json({ error: 'La query del database non è riuscita'});
        // restituiamo codice rest corretto
        res.status(201);
        res.json({ message: 'Review aggiunta con successo', id: reviewResult.insertId })
    })
};

// funzione Delete per cancellare un film
function destroy (req, res) {
    // recuperiamo l'id dall'URL
    const { id } = req.params;
    // eliminiamo il film
    connection.query('DELETE FROM movies WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete movie' });
        res.sendStatus(204)
    });
}






module.exports = {indexMovies, showMovies, storeReview, storeMovie, destroy};