const User = require('../models/user')

const dummy = (blogs) => {
    return 1
  }
  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(element => {
        likes += element.likes
    });
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
        let high = {
            title: blogs[0].title,
            author: blogs[0].author,
            likes: blogs[0].likes
        }
        blogs.forEach(el => {
            if (high.likes < el.likes) {
                high.title = el.title
                high.author = el.author
                high.likes = el.likes
            }
        })
        return high
    } else {
        return {
            title: "",
            author: "",
            likes: 0
        }
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length > 0) {
        let high = {
            author: blogs[0].author,
            blogs: 1
        }
        blogs.forEach(el => {
            const amount = blogs.filter(obj => obj.author === el.author).length
            if (amount > high.blogs) {
                high.author = el.author
                high.blogs = amount
            }
        })
        return high
    } else {
        return {
            author: "none",
            blogs: 0
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length > 0) {
        let high = {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
        blogs.forEach(el => {
            const filtered = blogs.filter(obj => obj.author === el.author)
            let amount = 0
            filtered.forEach(obj => {
                amount += obj.likes
            })
            if (amount > high.likes) {
                high.author = el.author
                high.likes = amount
            }
        })
        return high
    } else {
        return {
            author: "none",
            likes: 0
        }
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    usersInDb,
    mostLikes
  }