const Client = require('../models/clients.model.js');

// récupérer la liste, correspond à la route GET /clients
const getClients = (req, res) => {
    res.json('getClients')
}

// récupérer un élément unique, correspond à la route GET /clients/:id
const getClient = (req, res) => {
    res.json('getClient')
}

// modifie un élément unique, correspond à la route PATCH /clients/:id
const patchClient = (req, res) => {
    res.json('patchClient')
}

// Crée un élément, correspond à la route POST /clients/
const postClient = (req, res) => {
    res.json('postClient')
}

// supprime un élément unique, correspond à la route DELETE /clients/:id
const deleteClient = (req, res) => {
    res.json('deleteClient')
}

module.exports = {
    getClients,
    getClient,
    patchClient,
    postClient,
    deleteClient
};