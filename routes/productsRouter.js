const express = require('express');
const ProductService = require('./../services/productServices')
const validatorHandler = require('./../middlewares/validatorHandler')
const { createProduuctSchema, getProductSchema, updateProductSchema } = require('./../schemas/productSchema');
const { valid } = require('joi');

const router = express.Router()
const service = new ProductService()

router.get('/', async (request, response, next) => {
  try {
    const products = await service.find()
    response.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/filter', (request, response) => {
  response.send('Yo soy un filter')
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
  try {
    const { id } = request.params
    const product = await service.findOne(id)
    response.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(createProduuctSchema, 'body'),
  async (request, response, next) => {
  try {
    const body = request.body
    const bodyResponse = await service.create(body)
    response.status(201).json(bodyResponse)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (request, response, next) => {
  try {
    const { id } = request.params
    const body = request.body
    const product = await service.update(id, body)
    response.json({
      product
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
  try {
    const { id } = request.params
    const mensaje = await service.delete(id)
    response.json(mensaje)
  } catch (error) {
    next(error)
  }
})

module.exports = router
