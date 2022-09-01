const Sequelize = require('sequelize')
const db = require('../db')

const Blog = db.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isNewsPost: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Blog
