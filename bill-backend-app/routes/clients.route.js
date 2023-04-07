const express = require('express')
const router = express.Router()

// on importe le contrôleur des routes
const ctrl = require('../controlllers/clients.controller')

// récupère la liste des clients
router.get('/', ctrl.getClients)
// récupère un client en fonction de son id
router.get('/:id', ctrl.getClient)
// créer un nouveau client
router.post('/', ctrl.postClient)
// modifie un client en fonction de son id
router.patch('/:id', ctrl.patchClient)
// supprime un client en fonction de son id
router.delete('/:id', ctrl.deleteClient)

module.exports = router