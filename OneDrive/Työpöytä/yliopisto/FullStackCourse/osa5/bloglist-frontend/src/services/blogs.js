import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deletePost = async (blog, user) => {
  const config = {
    headers: { Authorization: token },
  }
  if (blog.user.username === user.username && window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    await axios.delete(`${baseUrl}/${blog.id}`, config)
  }

}

const addLike = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const obj = {
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, obj ,config)
  return response.data
}

export default { getAll, create, setToken, addLike, deletePost }