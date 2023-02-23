const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })

  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    let decodedToken = null;
    try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch (ex) {
      return response.status(400).json({ error: ex.message })
    }
    if (!decodedToken || !decodedToken.id) {
     return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.title,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })

    try {
      const resp = await blog.save()
      user.blogs = user.blogs.concat(resp._id)
      await user.save()
      response.status(201).json(resp)
    } catch(exception) {
      return response.status(400).json({ error: exception.message })
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    let decodedToken = null;
    try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch (ex) {
      return response.status(400).json({ error: ex.message })
    }
    if (!decodedToken || !decodedToken.id) {
     return response.status(401).json({ error: 'token invalid' })
    }

    const userid = decodedToken.id
    
    try {
     const blog = await Blog.findById(id)
     if (blog.user.toString() === userid.toString()) {
      await Blog.findByIdAndDelete(id)
     response.status(204).end()
     } else {
      return response.status(401).json({ error: 'Wrong access rights' })
     }
    } catch(ex) {
      return response.status(404).json({ error: ex.message + "asd" })
    }
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.title,
      url: body.url,
      likes: body.likes || 0,
    }

    try {
    const resp = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(resp)
    } catch(ex) {
      response.status(404).json({error: ex.message})
    }
  })


module.exports = blogsRouter