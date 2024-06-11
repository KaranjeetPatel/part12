const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /\d{1}-\d{1}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! The valid number has structure: DDD...-DDD... like 123-3456`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
