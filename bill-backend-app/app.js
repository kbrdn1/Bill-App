require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
require('./config/db')

const hostname = process.env.HOST
const port = process.env.PORT

// import des routes depuis ./routes/
const billsRoutes = require('./routes/bills')

const app = express()

// permet de transformer le body de la requête en json automatiquement
app.use(express.json())

// attention, l'ordre est important
// d'abord on vérifie la sécurité avec cors
app.use(cors({
  origin: process.env.CORS
}))

// configure les routes
app.use('/bills', billsRoutes)

// route principale
app.get('/', (req, res) => {
  res.json({
    api: 'bills app api',
    version: process.env.VERSION
  })
})

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})