
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  urlCode: { // !
    type: String,
    require: false
  },
  longUrl: { // !
    type: String,
    // unique: true,
    require: false
  },
  shortUrl: {
    type: String,
    require: false
  },
  date: {
    type: String,
    require: false,
    default: Date.now()
  }
})

module.exports = mongoose.model('Url', urlSchema) // !url model
