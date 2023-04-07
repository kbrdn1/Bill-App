require('dotenv').config()
const mongoose = require('mongoose')

const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASS
const cluster = process.env.MONGO_CLUSTER
const db = process.env.MONGO_DB

//connection à notre cluster avec les infos qui proviennent du .env
// https://mongoosejs.com/
mongoose.connect(`mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('MongoDB connect successfully at ' + new Date().toLocaleString('fr-FR')))
  .catch(() => console.log('MongoDB connection failed at ' + new Date().toLocaleString('fr-FR')))