const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
require('dotenv').config()

const pageRouter = require('./routes/page')
const blogRouter = require('./routes/blog')
const { sequelize } = require('./models')

const app = express()
const { PORT: port = 4000 } = process.env
sequelize.sync()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  }
}))

app.use('/', pageRouter)
app.use('/blog', blogRouter)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.status(err.status || 500).send()
})

app.listen(port, () => {
  console.log(port, '번 포트에서 대기중')
})