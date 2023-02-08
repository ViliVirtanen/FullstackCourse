const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })

test('correct key id is returned in json', async () => {
    const response = await api.get('/api/blogs')

    const obj = response.body[0].id 

    expect(obj).toBeDefined()
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      } 
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
      'Type wars'
    )
  })

  test('blog with no likes defined adds 0 to like value', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        __v: 0
      } 
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const contents = response.body.filter(a => a.likes === 0)

    expect(contents).toHaveLength(1)
  })

  test('adding blog with no title returns 400', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        __v: 0
      } 
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('adding blog with no url returns 400', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "asd",
        author: "Robert C. Martin",
        __v: 0
      } 
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('deleting blog with id returns 204 and deletes the blog', async () => {
  
    await api
      .delete('/api/blogs/5a422b3a1b54a676234d17f9')
      .expect(204)
    
      const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length -1)
  })

  test('blog likes can be updated', async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 1200,
    }
  
     await api
            .put('/api/blogs/5a422b3a1b54a676234d17f9')
            .send(newBlog)
            .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const contents = response.body.filter(a => a.likes === 1200)
        
    expect(contents).toHaveLength(1)
  })

afterAll(async () => {
  await mongoose.connection.close()
})