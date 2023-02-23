const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('../utils/list_helper')
const User = require('../models/user')


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails without password', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'mluukkai',
          name: 'Matti Luukkainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      })

      test('creation fails with too short password', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'mluukkai',
          name: 'Matti Luukkainen',
          password: 'a1',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      })

      test('creation fails with too short username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'as',
          name: 'Matti Luukkainen',
          password: 'a1aaa',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      })

      test('creation fails without username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          name: 'Matti Luukkainen',
          password: 'a1aaa',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      })
  })



afterAll(async () => {
  await mongoose.connection.close()
})