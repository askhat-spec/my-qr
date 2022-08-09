require('dotenv').config();
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMidddleware = require('./middlewares/errorMidddleware');

const PORT = process.env.PORT || 5000
const app = express()

const router = require('./routes/index');

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use('/static', express.static('static'))
app.use(express.static('files'))
app.use('/api', router);
app.use(errorMidddleware);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server has started at port: ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()