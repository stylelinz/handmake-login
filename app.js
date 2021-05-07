const express = require('express')
const exphbs = require('express-handlebars')

const isUser = require('./member')

const app = express()

app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const user = req.query.user
  if (!user) {
    return res.redirect('/login')
  }
  return res.render('index', { user })
})

app.get('/login', (req, res) => {
  return res.render('login')
})

app.post('/', (req, res) => {
  const logInfo = req.body
  const isMember = isUser(logInfo)
  if (isMember.state === 'success') {
    return res.redirect(`/?user=${isMember.user}`)
  }
  return res.render('login', { logError: isMember.state === 'fail' })
})

app.listen(3000, () => console.log('Express is listening on http://localhost:3000'))
