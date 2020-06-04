const dayjs = require('dayjs')
const express = require('express')
const router = express.Router()
//const md5 = require('md5')
//const session = require('express-session')
//const cookieParser = require('cookie-parser')
const UrlModel = require('../models/url')
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('../config/index')

//router.use(cookieParser('lwj'))

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    },time)
  });
}

router.post('/shorten', async (req, res) => {
  // 1.获取长链接
  const {longUrl} = req.body
  // 2.验证
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json('无效的url')
  }
  await delay(1000)
  // !检测该长链接在数据库是否存在
  let urlObj
  try {
    urlObj = await UrlModel.findOne({longUrl})
  } catch (error) {
    console.log(error)
    return res.status(500).json('查找失败')
  }
  if (urlObj) {
    let {longUrl,urlCode,shortUrl,date} = urlObj
    return res.json({longUrl,urlCode,shortUrl,date})
  }
  // 3.生成urlCode // !唯一标识
  const urlCode = shortid.generate()
  // 4.生成短链接
  const shortUrl = config.baseUrl + urlCode
  // 5.存入数据库
  urlObj = {
    longUrl,
    urlCode,
    shortUrl,
    date: new Date()
  }
  try {
    await UrlModel.create(urlObj)
    return res.json(urlObj)
  } catch (error) {
    console.log(error)
    return res.status(500).json('创建失败')
  }
})

module.exports = router