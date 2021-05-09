// import modules
const express = require('express')

// import local resources
const isUser = require('../member')

const router = express.Router()

// 瀏覽器若沒有cookie，會導向login頁面
// 若瀏覽器有userName的cookie，會進入index頁面，並顯示儲存在cookie內的用戶名字
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

// 執行登出，清除瀏覽器的cookie，導向回登入頁面
router.get('/logout', (req, res) => {
  res.clearCookie('userName', { path: '/' })
  return res.redirect('/login')
})

// 成功登入後，在瀏覽器內產生cookie
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
