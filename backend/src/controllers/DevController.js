const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

// index, show, store, update, destroy

module.exports = {
    async index(req, resp) {
        const devs = await Dev.find()

        return resp.json(devs)
    },

    async store(req, resp) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(
                `https://api.github.com/users/${github_username}`
            )

            const { avatar_url, bio } = apiResponse.data
            const name = apiResponse.data.nome || apiResponse.data.login

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }

        return resp.json(dev)
    },
}
