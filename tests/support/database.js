const dotenv = require('dotenv')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

dotenv.config()

module.exports = {
  async init () {
    // Initialize Mongoose ORM
    await mongoose.connect(process.env.MONGODB_URI, {
      useMongoClient: true
    })

    return mongoose.connection.db.dropDatabase()
  }
}
