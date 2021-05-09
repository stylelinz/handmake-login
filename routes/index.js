const express = require('express')

const isUser = require('../member')

const router = express.Router()

// 如果沒有登入取得cookie，會導向login頁面
router.get('/', (req, res) => {
  const { userName } = req.cookies
  if (!userName) {
    return res.redirect('/login')
  }
  return res.render('index', { user: userName })
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.get('/logout', (req, res) => {
  res.clearCookie('userName', { path: '/' })
  return res.redirect('/login')
})

router.post('/', (req, res) => {
  const logInfo = req.body
  const isMember = isUser(logInfo)
  if (isMember.state === 'success') {
    res.cookie('userName', isMember.userName, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
    return res.redirect('/')
  }
  return res.render('login', { logError: isMember.state === 'fail' })
})

module.exports = router
