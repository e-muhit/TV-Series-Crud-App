const db = require("../database/connection");

const Network = {};

Network.all = () => {
    return db.any('Select * From networks')
}

Network.find = (id) => {
    return db.one('Select * From networks Where network_id = $1', [id]);
}

Network.create = (network) => {
    return db.one('INSERT INTO networks (network_name, logo_url) VALUES ($1, $2) RETURNING *', [network.network_name, network.logo_url])
}

Network.update = (update) => {
    return db.none('UPDATE networks SET name = $1, logo = $2, WHERE network_id = $3', [update.network_name, update.logo, update.network_id]);
}

Network.delete = (id) => {
    return db.result('Delete FROM networks WHERE network_id = $1', [id])
}

module.exports = Network;