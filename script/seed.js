'use strict'

const {db, models: {User, Blog, Reply, Thread} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])
  
  // Creating Blogs
  const blogs = await Promise.all([
    Blog.create({ title: 'Alternative Effective way to deal with student loan forgiveness ', description: 'Proposal: The government will buy the private student loans and the student has to pay the government back, but if they work for the government, they get no interest and discount based on the years of service. ' }),
    Blog.create({ title: 'Broken Tax System', description:'why do we file our own taxes if the govenment already has all the information using our SSN' }),
  ])
  
  // Creating Reply
  const replies = await Promise.all([
    Reply.create({
      userId:1,
      blogId:1,
      message:'FIRST COMMENT'
    }),
    Reply.create({
      userId:2,
      blogId:1,
      message:'Second COMMENT'
    }),
  ])
  
  // Creating Thread
  const threads = await Promise.all([
    Thread.create({
      replyId: 1,
      message:'Replying to the very 1st comment'
    }),
    Thread.create({
      replyId: 1,
      message:'Keeping the thread going'
    }),
    Thread.create({
      replyId: 1,
      message:'Chocolate Moose'
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${blogs.length} blogs`)
  console.log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
