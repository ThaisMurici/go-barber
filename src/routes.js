const express = require('express')

const routes = express.Router()

const UserController = require('./app/controllers/UserController')

routes.get('/signup', UserController.create)

module.exports = routes
