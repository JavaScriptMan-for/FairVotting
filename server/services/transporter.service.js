const {createTransport} = require('nodemailer')
const config = require('config')


const my_email = config.get('my_email');
const pass = config.get('pass'); 

const transporter = createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: my_email,
    pass: pass,
  },
});
module.exports = transporter