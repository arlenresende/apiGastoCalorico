const mongoose = require('../db/conection')
const { Schema } = mongoose

const User = mongoose.model(
  'User',
  new Schema(
    {
      nome: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      genero: {
        type: String,
        required: true,
      },
      idade: {
        type: Number,
        required: true,
      },
      altura: {
        type: Number,
        required: true,
      },
      nivel: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  )
)

module.exports = User
