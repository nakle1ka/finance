const express = require("express")
const mongoose = require("mongoose")
const bodyParser= require("body-parser")
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config();

const app = express()
const router = require("./router/router")

const PORT = process.env.PORT;
const URL = process.env.DB_URL;

app.use(cors({
    origin: 'http://localhost:3000', // Разрешаем доступ только с этого домена
    methods: 'GET, POST, PUT, DELETE', // Разрешаем HTTP-методы
    allowedHeaders: 'Content-Type, Authorization', // Разрешаем заголовки запроса
    credentials: true
}));
app.use(bodyParser.json({limit: '7mb'}));
app.use(bodyParser.urlencoded({limit: '7mb'}));
app.use(express.json())
app.use(cookieParser())
app.use(router)

mongoose // Подключение к БД
    .connect(URL)
    .then(console.log('DB connected!'))
    .catch(err => { console.log("DB connection failed: " + err) })

app.listen(PORT, () => { // Слушаем порт
    console.log(`Server listening on ${PORT}`);
});
