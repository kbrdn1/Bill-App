const express = require('express')
const router = express.Router()

//on charge un middleware externe
//ça permet d'intercepter la requete 
//pour globaliser la logique du traitement d'une requête
// ici ce middleware sert à contrôler qu'on a bien un params :id dans les requêtes
const verifyParams = require('../middlewares/verifyparams.middleware')

// on importe le contrôleur des routes
const ctrl = require('../controlllers/bills.controller')

// récupère la liste des bills
router.get('/', ctrl.getBills)
// récupère une bill en fonction de son id
router.get('/:id', verifyParams, ctrl.getBill)
// créer une nouvelle bill
router.post('/', ctrl.postBill)
// modifie une bill en fonction de son id
router.patch('/:id', verifyParams, ctrl.patchBill)
// supprime une bill en fonction de son id
router.delete('/:id', verifyParams, ctrl.deleteBill)

module.exports = router
