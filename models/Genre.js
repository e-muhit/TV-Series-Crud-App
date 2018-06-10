const db = require("../database/connection");

const Genre = {};

Genre.all = () => {
    return db.any('Select * From genres')
}

Genre.find = (id) => {
    return db.one('Select * From genres Where genre_id = $1', [id]);
}

Genre.create = (genre) => {
    return db.one('INSERT INTO genres (genre_name) VALUES ($1) RETURNING *', [genre.genre_name])
}

Genre.update = (update) => {
    return db.none('UPDATE genres SET genre_name = $1, WHERE genre_id = $2', [update.genre_name, update.genre_id]);
}

Genre.delete = (id) => {
    return db.result('Delete FROM genres WHERE genre_id = $1', [id])
}

module.exports = Genre;