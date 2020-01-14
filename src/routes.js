const { Router } = require('express')
const DevController = require('./controllers/DevController')
const routes = Router()

routes.post('/devs', DevController.store)

// routes.get('/devs', (req, res) => {
//     const devs = await Dev.find()
//     res.json(devs)
// })

module.exports = routes