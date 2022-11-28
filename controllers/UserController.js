const User = require('../models/User')

const nodemailer = require('nodemailer')

module.exports = class UserController {
  static async cadastro(req, res) {
    const { nome, email, genero, idade, altura,nivel } = req.body


    // validations

    if (!nome) {
      res.status(422).json({ message: 'O nome é obrigatório' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório' })
      return
    }
    if (!genero) {
      res.status(422).json({ message: 'O genero é obrigatório' })
      return
    }
    if (!idade) {
      res.status(422).json({ message: 'A idade é obrigatória' })
      return
    }
    if (!altura) {
      res.status(422).json({ message: 'A altura é obrigatória' })
      return
    }

    // Check if user exists

    const userExists = await User.findOne({ email: email })

    if (userExists) {
      res.status(422).json({ message: 'Usuário já cadastrado no sistema' })
      return
    }

    // Create User

    const user = new User({
      nome: nome,
      email: email,
      genero:genero,
      idade: idade,
      altura: altura,
      nivel:nivel
    })

    try {
      const newUser = await user.save()
      res.status(201).json({ message: 'Usuário cadastrado com sucesso', newUser })
    } catch (error) {
      res.status(500).json({ message: error })
    }

    var transport = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      auth: {
        user: "contato@calculadora.gustavo2em1.com.br",
        pass: "Gu10192410*"
      }
    });

    var message = {
      from: "contato@calculadora.gustavo2em1.com.br",
      to: email,
      subject: "Message title",
      text: "Plaintext version of the message",
      html: "<p>HTML version of the message</p>"
    };

    transport.sendMail(message)


  }

  static async getAll(req, res) {
    const users = await User.find().sort('-createdAt')

    res.status(200).json({ users })
  }
}
