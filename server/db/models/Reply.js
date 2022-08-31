const Sequelize = require('sequelize')
const db = require('../db')

const Reply = db.define('reply', {
  refId: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = Reply
