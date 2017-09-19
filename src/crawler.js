const axios = require('axios')
const cheerio = require('cheerio')

async function fetchDoubanList(start) {
  let res = await axios.get(`https://www.douban.com/group/HZhome/discussion?start=${start}`)
  let htmlText = res.data
  const $ = cheerio.load(htmlText)
  const rs = $('a[title]')
  const resultList = []
  for(let i = 0; i < rs.length; i++){
    resultList.push({
      title: rs.eq(i).attr('title'),
      url: rs.eq(i).attr('href')
    })
  }
  return resultList
}
async function fetchDoubanTopic(url){
  let response = await axios.get(url)
  let htmlText = response.data
  const $ = cheerio.load(htmlText)
  const context = $('.topic-content > p')
  for(let i = 0; i < context.length; i++){
    console.log(context.eq(i).text())
  }
}
module.exports = {
  fetchDoubanList,
  fetchDoubanTopic
}