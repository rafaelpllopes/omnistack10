const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router()

routes.route('/devs')
    .post(DevController.store)
    .get(DevController.index)

routes.route('/search')
    .get(SearchController.index)

// routes.get('/devs', (req, res) => {
//     const devs = await Dev.find()
//     res.json(devs)
// })

module.exports = routes