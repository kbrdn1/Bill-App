const Client = require('../models/clients.model.js');

// récupérer la liste, correspond à la route GET /clients
const getClients = (req, res) => {
    Client.find().then((clients) => {
        res.status(200).json(clients)
    }).catch(error => res.status(400).json({ error }))
}

// récupérer un élément unique, correspond à la route GET /clients/:id
const getClient = (req, res) => {
    const id = req.params.id
    Client.findOne({
        _id: id
    }).then((client) => {
        res.status(200).json(client)
    }).catch(error => res.status(400).json({ error }))}

// modifie un élément unique, correspond à la route PATCH /clients/:id
const patchClient = (req, res) => {
    const id = req.params.id
    const updatedClient = req.body
    Client.updateOne({
        _id: id
    }, {
        ...updatedClient
    }).then((client) => {
        res.status(201).json(client)
    }).catch(error => res.status(400).json({ error }))
}

// Crée un élément, correspond à la route POST /clients/
const postClient = (req, res) => {
    const newClient = req.body
    if (!newClient.firstName || !newClient.lastName) {
        return res.status(400).json({ error: 'Les paramètres firstName et lastName sont requis' })
    }
    const client = new Client({
        ...newClient
    })
    client.save().then(() => {
        res.status(201).json(client)
    }).catch(error => res.status(400).json({ error }))
}

// supprime un élément unique, correspond à la route DELETE /clients/:id
const deleteClient = (req, res) => {
    const id = req.params.id
    Client.deleteOne({
        _id: id
    }).then((client) => {
        res.status(200).json(client)
    }).catch(error => res.status(400).json({ error }))
}

module.exports = {
    getClients,
    getClient,
    patchClient,
    postClient,
    deleteClient
};