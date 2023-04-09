const Bill = require('../models/bills.model')
const Client = require('../models/clients.model')

// récupérer la liste, correspond à la route GET /bills
const getBills = (req, res)=> {
  // on interroge la base de donnée
  Bill.find().then((bills)=>{
    //on renvoie les résultats sous la forme de JSON
    res.status(200).json(bills)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// récupérer un élément unique, correspond à la route GET /bills/:id
const getBill = (req, res)=> {
  const id = req.params.id
  // une variable qui vient du middleware précédent (verifyParams)
  console.log(req.foo)
  // requete la bdd
  Bill.findOne({
    _id: id
  }).then((bill)=>{
    //on renvoie les résultats sous la forme de JSON
    res.status(200).json(bill)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// modifie un élément unique, correspond à la route PATCH /bills/:id
const patchBill = async (req, res)=> {
  const id = req.params.id
  const updatedBill = req.body

  if (req.body.client) {
    const client = await Client.findOne({ _id: req.body.client }).then((client) => {
      return client
    }).catch(error => res.status(400).json({ error }))

    updatedBill.client = client
  }

  // trouve une facture et patch 
  Bill.updateOne({
    _id: id
  }, {
    ...updatedBill
  }).then((bill)=>{
    //on renvoie les résultats sous la forme de JSON
    res.status(201).json(bill)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// Crée un élément, correspond à la route POST /bills/
const postBill = async (req, res)=> {
  // on fait des vérifications sur la donnée passée dans le body
  // console.log(req.body)
  const newBill = req.body

  const clientId = req.query.client_id

  // on check les valeurs requises dans notre modèle
  if(!newBill.billnum || !newBill.date || !clientId) {
    // si il y a une erreur, on interrompt l'opération
    // retour une erreur
    return res.status(400).json({error: 'Les paramètres date, billnum et client sont requis.'})
  }
  //si la valdation est passée
  // on crée une nouvelle instance de Bill avec en paramètre
  // les données qui viennent de la requête req.body
  const client = await Client.findOne({ _id: clientId }).then((client) => {
    return client
  }).catch(error => res.status(400).json({ error }))

  const bill = new Bill({ ...newBill, client: client })

  bill.save().then(()=> {
    // le statut code 201 indique que la ressource a bien été créée
    res.status(201).json(bill)
    // gestion des erreurs, on retourne le status 400 avec le code erreur
  }).catch(error => res.status(400).json({ error }))
}

// delete un élément unique, correspond à la route DELETE /bills/:id
const deleteBill = (req, res)=> {
  const id = req.params.id
  Bill.deleteOne({
    _id: id
  }).then(()=>{
    //on renvoie les résultats sous la forme de JSON
    res.sendStatus(204)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

module.exports = { 
  getBills,
  getBill,
  patchBill,
  postBill,
  deleteBill
}