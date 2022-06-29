import express from 'express'
const router = express.Router()
import axios from 'axios'
import xml2js from 'xml2js'
const options = { ignoreComment: true, alwaysChildren: true }
router.get('/genre', async (req, res, next) => {
  try {
    const genre_url = `http://webservice.recruit.co.jp/hotpepper/genre/v1/?key=${process.env.HOT_PEPPER_KEY}`
    // G001 居酒屋
    // G002 ダイニングバー・バル
    // G003 創作料理
    // G004 和食
    // G005 洋食
    // G006 イタリアン・フレンチ
    // G007 中華
    // G008 焼肉・ホルモン
    // G017 韓国料理
    // G009 アジア・エスニック料理
    // G010 各国料理
    // G011 カラオケ・パーティ
    // G012 バー・カクテル
    // G013 ラーメン
    // G016 お好み焼き・もんじゃ
    // G014 カフェ・スイーツ
    // G015 その他グルメ
    const { data } = await axios.get(genre_url)
    console.log(data)
    xml2js.parseString(data, (err, result) => {
      console.log(result)
      res.status(200).json({ data: result.results.genre })
    })
  } catch (err) {
    console.log('error')
    res.status(400).end()
  }
})
router.get('/small-area', async (req, res, next) => {
  try {
    // const area_url = `http://webservice.recruit.co.jp/hotpepper/small_area/v1/?key=${process.env.HOT_PEPPER_KEY}`
    const area_url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.HOT_PEPPER_KEY}&small_area=X609`
    const { data } = await axios.get(area_url)
    res.status(200).json(data)
  } catch (err) {
    res.status(400).end()
  }
})

module.exports = router
