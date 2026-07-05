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
        console.log(results);
        
        res.json(results);
    });
}


const showMovies = (req, res) => {
    console.log(req.params);
    const postId = Number(req.params.id);
    console.log(postId);

    // Prepariamo la query
    const sql = 'SELECT * FROM movies WHERE id = ?';

    // eseguire la query
    connection.query(sql, [postId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }

        //console.log(results);
        
        if (results.length === 0) {
            return res.status(404).json({ error: true, message: '404 Post non trovato'});
        }
        const post = results[0];
        connection.query(sql, [postId], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: true, message: 'Internal Server Error'});
            }
            // aggiungi gli posts all'oggetto tag
            console.log(results);
        res.json(post);
        });
});
}



module.exports = {indexMovies, showMovies};