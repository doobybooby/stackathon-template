const Sequelize = require('sequelize')
const db = require('../db')

const Reply = db.define('reply', {
  refId: {
    type: Sequelize.INTEGER,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

const addRefId = reply => {
  console.log(reply)
  if( reply.blogId ) 
    reply.refId = reply.blogId  
  else if( reply.replyId )
    reply.refId = reply.replyId
  else reply.refId = reply.commentId
}

Reply.beforeCreate(addRefId)
Reply.beforeUpdate(addRefId)
module.exports = Reply
