const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {

  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create({ name, price, image }) {
    if (name || price || image) {
      const newProduct = {
        id: faker.datatype.uuid(),
        name,
        price,
        image
      }
      this.products.push(newProduct)
      return newProduct
    } else {
      throw boom.notFound('The product dont have name, price or image')
    }
  }

  async find() {
    return this.products
  }

  async findOne(id) {
    const product = this.products.find(element => element.id === id)
    if (!product) {
      throw boom.notFound('product not found')
    }
    if (product.isBlock) {
      throw boom.conflict('product is blocked')
    }
    return product
  }

  async update(id, changes) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id) {
    const newProducts = this.products.filter(element => element.id !== id)
    this.products = newProducts
    return {
      id
    }
  }

}

module.exports = ProductService
