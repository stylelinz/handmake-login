const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')

const routes = require('./routes')

const app = express()

app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// 載入中介軟體
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(routes)

app.listen(3000, () => console.log('Express is listening on http://localhost:3000'))
