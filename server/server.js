const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('config')
const multer = require('multer');
const path = require('path')
const cookieParser = require('cookie-parser')

const get_users = require('./routes/auth.route')
const candidates = require("./routes/candidates.route")
const vote = require('./routes/vote.route')


const href = config.get('ENV') === 'production' ? config.get('prod-href') : config.get('dev-href') || 'http://localhost:3000';


const upload = multer();
app.use(express.json());
app.use(cookieParser())
app.use(upload.none())
app.use(cors({
    origin: href,
}));

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))


app.use('/api', get_users)
app.use('/api', candidates)
app.use('/api', vote)

app.use((req,res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})


const StartServer = async () => {
    try {
        console.log("Подключение к серверу и базе данных...")
        await mongoose.connect(config.get('base_url'))
            .then(() =>  console.log('Успешное подключение базе данных'))
            .catch((e) => console.log("Ошибка при подключении к базе данных", e))
        app.listen(config.get('port'), ()=> {
                console.log("Server has been started to", config.get('port'), config.get('ENV'));
        })
    } catch (error) {
        console.log("Ошибка при запуске сервера", error.message)
    }
}
try {
    StartServer();
} catch (error) {
    console.log(error);
}
