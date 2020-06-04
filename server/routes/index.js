const dayjs = require('dayjs')
const express = require('express')
const router = express.Router()
//const md5 = require('md5')
//const session = require('express-session')
//const cookieParser = require('cookie-parser')
const UrlModel = require('../models/url')

//router.use(cookieParser('lwj'))

router.get('/:urlCode', async (req, res) => {
  let {urlCode} = req.params
  try {
    let urlObj = await UrlModel.findOne({urlCode})
    if(urlObj) {
      // !方式1 直接重定向
      // return res.redirect(urlObj.longUrl)
      // !方式2 用iframe包裹并添加自己的广告
      // 如果只显示了html代码解决方式--可以添加 res.type('html')
      return res.render('index.ejs', {
        longUrl: urlObj.longUrl
      })
    }else {
      // !该短链接不存在
      return res.status(404).json('该短链接不存在')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json('查找失败')
  }
})

module.exports = router