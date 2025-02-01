const Router = require('express');
const router = new Router();
const {check} = require('express-validator')
const {update, deleteData, sendMail} = require('../controllers/update_data.controller')

router.post('/send-mail',
   [
      check('email', "Email некорректно введён").isEmail().isLength({min: 6, max: 254}),
   ],
    sendMail)
router.put('/update-password',
 [
    check('newPassword', "Пароль должен содержать от 6 до 20 символов").isLength({min: 6, max: 20}),
    check('verify_password_code', "Некорректный код").isLength({min: 6, max: 6}),
 ],
 update
)
router.delete('/delete-account', deleteData)

module.exports = router;