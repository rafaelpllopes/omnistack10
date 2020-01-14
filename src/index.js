const express = require('express')
const  mongoose = require('mongoose')
const fs = require('fs')
const routes = require('./routes')

const app = express()

const { user, password, db } = JSON.parse(fs.readFileSync('config.json', 'utf8'))

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0-6uyc1.mongodb.net/${db}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('Servidor rodando na porta 3333'))