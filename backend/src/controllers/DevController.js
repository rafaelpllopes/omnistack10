const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {

    // Lista todos os devs
    async index(request, response) {
        const devs = await Dev.find()
        return response.json(devs)
    },

    // Lista um unico dev
    async show(request, response) {
        const { id } = request.params
        const dev = await Dev.findById(id)
        return response.json(dev)
    },

    // Deleta um dev
    async destroy(request, response) {
        const { id } = request.params
        const dev = await Dev.deleteOne({
            _id: id
        })
        return response.json(dev)
    },

    // Atualiza um dev
    async update(request, response) {
        const { id } = request.params
        const { avatar_url, latitude, longitude, techs } = request.body

        const techsArray = parseStringAsArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const dev = await Dev.updateOne({ _id: id }, {
            avatar_url,
            location,
            techs: techsArray
        })

        return response.json(dev)
    },

    // Cadastra um dev
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = apiResponse.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)

            return response.json(dev)
        }

        return response.json({ message: 'Dev ja cadastrado!' })
    }
}