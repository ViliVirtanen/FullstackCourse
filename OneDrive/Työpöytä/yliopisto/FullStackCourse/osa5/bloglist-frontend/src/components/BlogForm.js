import { useState } from 'react'


const BlogForm = ({ handleSubmit }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleSubmit({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h4>Add new blog</h4>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            type="text"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create blog</button>
      </form>
    </div>
  )}

export default BlogForm