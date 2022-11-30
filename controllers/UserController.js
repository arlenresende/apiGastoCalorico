const User = require('../models/User')

const nodemailer = require('nodemailer')

module.exports = class UserController {
  static async cadastro(req, res) {
    const { nome, email, genero, idade, altura,indicieFA } = req.body


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
      nivel: indicieFA
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
        user: process.env.USERHOST,
        pass: process.env.USERPASS
      }
    });

    var message = {
      from: "contato@calculadora.gustavo2em1.com.br",
      to: 'wendell238@hotmail.com',
      subject: "Calculador de gasto calórico",
      text: "Registro de novo usuário",
      html: `
        <h2> Olá Gustavo!</h2>
        <p> ${nome} acabou de se cadastrar na calculadora online. <br> Veja os dados abaixo: </p>
      <ul>
          <li>
              <strong> Nome:</strong> ${nome}
          </li>
          <li>
              <strong> Email: </strong> ${email}
          </li>
          <li>
              <strong> Gênero : </strong> ${genero}
          </li>
          <li>
              <strong> Idade : </strong> ${idade}
          </li>
          <li>
              <strong> Altura : </strong> ${altura}
          </li>
          <li>
              <strong> Fator de atividade : </strong> ${ indicieFA }
          </li>
      </ul>`
    };

    transport.sendMail(message)


  }

  static async getAll(req, res) {
    const users = await User.find().sort('-createdAt')

    res.status(200).json({ users })
  }
}
