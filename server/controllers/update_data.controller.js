const User = require('../models/User.model')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const transporter = require('../services/transporter.service')
const MailOptions = require('../services/send-mail.service')
const config = require('config')
const createCode = require('../services/createCodeFn.service')

const my_email = config.get('my_email')
let email_;
const code = createCode();

class UpdateData {
    async sendMail (req,res) {
        try {
     const {email} = req.body;
     
     const errors = validationResult(req);
     if(!errors.isEmpty()) return res.status(400).json({message: "Некорректный email"})

        const mailOptions = new MailOptions(
            `${my_email} Честные выборы`,
            email,
            "Подтверждение смены пароля",
            ` 
            <h1>Подтвердите смену пароля от вашего аккаунта</h1>
            <h2>Для верификации введите этот код на странице</h2>
            <p style="font-size: 20px; color: blue; font-family: Verdana ">${code}</p>
            `
        )
        const mail_result = await transporter.sendMail(mailOptions);
        if(!mail_result) return res.status(400).json({message: "Не удалось отправить письмо"})
         email_ = email;
        res.status(200).json({message: "Письмо успешно отправлено"}) 
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Ошибка сервера"})
        }
    }
    async update(req, res) {
        try {
            const { newPassword, verify_password_code } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ message: "Некорректные данные" });

            if(!email_) return res.status(400).json({message: "Ошибка при получении email"})

            const findAccount = await User.findOne({ email: email_ })
            if (!findAccount) return res.status(400).json({ message: "Вы не зарегистрированы" })
            
            if(Number(verify_password_code) !== Number(code)) return res.status(400).json({message: "Неверный код"})

            const hashedNewPassword = await bcrypt.hash(newPassword, 8)
            const redactData = await User.updateOne({ email: email_ }, { password: hashedNewPassword });

            if (!redactData) return res.status(400).json({ message: "Ошибка при редактировании пароля" })

            res.status(200).json({ message: "Пароль успешно изменен" })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Ошибка сервера" })
        }

    }
    async deleteData(req, res) {
        try {
            const cookie_email = req.cookies.username;
            if (!cookie_email) return res.status(400).json({ message: "Отсутствуют файлы cookie" })

            const findAccount = await User.findOne({ email: cookie_email });
            if (!findAccount) return res.status(400).json({ message: "Такого аккаунта не существует" })

            const resultDelete = await User.deleteOne({ email: cookie_email });
            if (!resultDelete) return res.status(400).json({ message: "Не удалось удалить аккаунт" })

            res.status(200).json({ message: "Успешное удаление аккаунта" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ошибка сервера" })
        }
    }
}
module.exports = new UpdateData;