const Sequelize = require('sequelize')
const db = require('../db')

const Blog = db.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
})

module.exports = Blog
