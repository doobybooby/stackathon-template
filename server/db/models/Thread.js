const Sequelize = require('sequelize')
const db = require('../db')

const Thread = db.define('thread', {
  message: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Thread
