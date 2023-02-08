const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.title,
      url: body.url,
      likes: body.likes || 0,
    })

    try {
      const resp = await blog.save()
      response.status(201).json(resp)
    } catch(exception) {
      return response.status(400).json({ error: exception.message })
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    try {
     await Blog.findByIdAndDelete(id)
     response.status(204).end()
    } catch(ex) {
      return response.status(404).json({ error: ex.message })
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