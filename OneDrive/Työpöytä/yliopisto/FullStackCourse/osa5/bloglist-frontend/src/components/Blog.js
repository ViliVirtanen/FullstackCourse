import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLikes = () => {
    blog.likes += 1
    blogService.setToken(user.token)
    blogService.addLike(blog).then(resp => setLikes(resp.likes))
  }

  const deleteBlog = () => {
    blogService.setToken(user.token)
    console.log(blog)
    blogService.deletePost(blog, user)
  }
  return (
    <div className='blog'>
      <div style={hideWhenVisible} className='inner'>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></p>

      </div>
      <div style={showWhenVisible} className='inner'>
        <p>{blog.title}
          <button onClick={toggleVisibility}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>{likes}<button onClick={addLikes}>like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={deleteBlog}>delete</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog