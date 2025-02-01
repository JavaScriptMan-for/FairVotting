const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const config = require('config');
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const transporter = require('../services/transporter.service')
const MailOptions = require('../services/send-mail.service')
const createCode = require('../services/createCodeFn.service')

let newUser;
let token;

const my_email = config.get('my_email')
const code = createCode();



class dataController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      //Валидация
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ message: "Некорректно введённые данные" })

      //Проверка
      const user = await User.findOne({ email });
      if (!user) res.status(400).json({ message: "Неверный логин или пароль" })

      //Проверка данных
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ message: "Неверный логин или пароль" })

      //Отправка токена
      token = jwt.sign(
        { userId: user.id },
        config.get('jwt'),
        { expiresIn: '1h' }
      )

      config.get('ENV') !== 'production'
      ?
      res.cookie( 'token', token, { maxAge: 1000 * 60 * 60 * 3,  })
      : 
      res.cookie('token', token, {  maxAge: 1000 * 60 * 60 * 3,secure: true,httpOnly: true,})

     config.get('ENV') !== 'production'
      ?
     res.cookie( 'username', email, { maxAge: 1000 * 60 * 60 * 3,  })
      : 
     res.cookie('username', email, {  maxAge: 1000 * 60 * 60 * 3,secure: true,httpOnly: true,})

      res.json({ token, email })

    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async register(req, res) {
    try {
      const { email, password } = req.body;
      //Валидация
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ message: "Некорректно введённые данные" })

      //Проверка
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Пользователь с таким email уже существует' });

      //Отправка письма 
      const mailOptions = new MailOptions(
        `${my_email} Честные выборы`,
        email,
        "Верификация почты",
        `
              <h1>Подтвердить почту:</h1>
              <h2>Вам нужно ввести данный код в специальном поле на нашем сайте</h2>
              <p style="font-size: 20px; color: blue; font-family: Verdana ">${code}</p>
              `
      )
      try { await transporter.sendMail(mailOptions) }
      catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Возможно такой почты не существует. Попробуйте снова..." })
      }

      //Хеширование пароля     
      const hashedPassword = await bcrypt.hash(password, 8);
      newUser = new User({ email, password: hashedPassword });

      res.status(200).json({ message: "Письмо отправлено на почту" })
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async verify(req, res) {
    try {
      const { codeClient } = req.body;
      //Валидация
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ message: "Некорректный код" })

      //Проверка данных
      if (Number(code) !== Number(codeClient)) return res.status(400).json('Неверный код')

      await newUser.save();
      res.status(201).json({ message: 'Пользователь успешно создан', user: newUser });
    } catch (error) {
      console.error('Ошибка при верификации:', error)
      res.status(500).json({ message: "Ошибка сервера" })
    }
  }
  async getUsername(req, res) {
    try {
   const email_cookie = await req.cookies.username;
   if(!email_cookie) return res.json({message: "Пользователь не найден"})

    const user = await User.findOne({ email: email_cookie })
    if(!user) return res.status(400).json({message: "Пользователь не найден в базе данных"})
    
      const user_email = user.email

      res.status(200).json({ message: "Пользователь найден", user_email })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" })
    }

  }
}
module.exports = new dataController
 