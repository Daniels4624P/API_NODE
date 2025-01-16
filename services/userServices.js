const faker = require('faker');

class UserServices {
  constructor() {
    this.users = []
    this.generator()
  }

  generator() {
    const users = 100
    for (let i = 0; i < users; i++) {
      const user = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        password: faker.internet.password()
      }
      this.users.push(user)
    }
  }

  printAllUsers() {
    return this.users
  }

  findUser(id) {
    return this.users.find(element => element.id === id)
  }

  createUser({ name, password }) {
    const body = {
      id: faker.datatype.uuid(),
      name,
      password
    }
    this.users.push(body)
    return body
  }

  update(id, changes) {
    const index = this.users.findIndex(user => user.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  deleteUser(id) {
    const newUsers = this.users.filter(user => user.id !== id)
    this.users = newUsers
    return {
      id
    }
  }
}

module.exports = UserServices
