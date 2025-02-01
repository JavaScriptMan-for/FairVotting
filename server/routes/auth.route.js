const { Router } = require('express')
const router = new Router();
const {check} = require('express-validator')

const {register, login, verify, getUsername} = require('../controllers/auth.controller');

router.post('/users/login', [
    check('email', "Email некорректно введён").isEmail().isLength({min: 6, max: 254}),
    check('password', "Пароль введён некорректно").isLength({min: 6, max: 20})
], login);
router.post('/users/register', [
    check('email', "Email некорректно введён").isEmail().isLength({min: 6, max: 254}),
    check('password', "Пароль введён некорректно").isLength({min: 6, max: 20})
], register)
router.post('/users/verify', [
    check('codeClient', "Некорректный код").isLength({min: 6, max: 6})
], verify)
router.get('/users/get-username', getUsername)


module.exports = router