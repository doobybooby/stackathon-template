//this is the access point for all things database related!

const db = require('./db')
const User = require('./models/User')
const Blog = require('./models/Blog')
const Reply = require('./models/Reply')

//associations could go here!

Reply.belongsTo(User)
Reply.belongsTo(Blog)
Blog.hasMany(Reply)
Blog.belongsTo(User)
User.hasMany(Blog)

module.exports = {
  db,
  models: {
    User,
    Blog,
    Reply,
  },
}
