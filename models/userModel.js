const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.findOneByName = function (name) {
  return this.findOne({
    name,
  }).exec()
}

userSchema.methods.assignAdmin = function () {
  this.admin = true
  return this.save()
}

userSchema.statics.create = function (name, password) {
  const encrypted = crypto
    .createHmac('sha1', process.env.SECRET)
    .update(password)
    .digest('base64')
  const user = new this({
    name,
    password: encrypted,
  })

  return user.save()
}

userSchema.methods.verify = function (password) {
  const encrypted = crypto
    .createHmac('sha1', process.env.SECRET)
    .update(password)
    .digest('base64')
  return this.password === encrypted
}

module.exports = mongoose.model('User', userSchema)
