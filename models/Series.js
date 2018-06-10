const db = require("../database/connection");

const Series = {};

Series.all = () => {
    return db.any('Select * From series')
}

Series.find = (id) => {
    return db.one('Select * From series Where show_id = $1', [id]);
}

Series.create = (show) => {
    return db.one('INSERT INTO series (show_name, number_of_seasons, number_of_episodes, image_url, network_id, genre_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [show.show_name, show.number_of_seasons, show.number_of_episodes, show.image_url, show.network_id, show.genre_id])
}

Series.update = (update) => {
    return db.none('UPDATE series SET show_name = $1, number_of_seasons = $2, number_of_episodes = $3, image_url = $4, network_id = $5, genre_id = $6 WHERE show_id = $7', [update.show_name, update.number_of_seasons, update.number_of_episodes, update.image_url, update.network_id, update.genre_id, update.show_id]);
}

Series.delete = (id) => {
    return db.result('Delete FROM series WHERE show_id = $1', [id])
}

Series.findGenre= (id) => {
    return db.any('Select * From series Where genre_id = $1', [id]);
}

Series.findNetwork = (id) => {
    return db.any('Select * From series Where network_id = $1', [id]);
}
module.exports = Series;