const express = require('express')
const userServices = require('./../services/userServices')
const router = express.Router()
const service = new userServices()

router.get('/', (request, response) => {
  const users = service.printAllUsers()
  response.json(users)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = service.findUser(id)
  res.json(user)
})

router.post('/', (req, res) => {
  const body = req.body
  const bodyResponse = service.createUser(body)
  res.status(201).json(bodyResponse)
})

router.patch('/:id', (req, res) => {
  const body = req.body
  const { id } = req.params
  const newUser = service.update(id, body)
  return newUser
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const messageDelete = service.deleteUser(id)
  res.json(messageDelete)
})

module.exports = router
