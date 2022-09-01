//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Blog = require('./models/Blog')
const Reply = require('./models/Reply')
const Thread = require('./models/Thread')

//associations could go here!
Reply.belongsTo(User)
Reply.belongsTo(Blog)
Blog.hasMany(Reply)
Thread.belongsTo(Reply)
Reply.hasMany(Thread)
Blog.hasMany(Thread)

module.exports = {
  db,
  models: {
    User,
    Blog,
    Reply,
    Thread
  },
}
