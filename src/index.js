const axios = require('axios')
const cheerio = require('cheerio')

function fetchDoubanList(successFn) {
  let htmlText
  axios.get('https://www.douban.com/group/HZhome/discussion?start=0')
  .then(function (response) {
    htmlText = response.data
    const $ = cheerio.load(htmlText)
    const rs = $('a[title]')
    const resultList = []
    for(let i = 0; i < rs.length; i++){
      resultList.push({
        title: rs.eq(i).attr('title'),
        url: rs.eq(i).attr('href')
      })
    }

    successFn(resultList);
  })
  .catch(function (error) {
    console.log(error);
  });

}
fetchDoubanList((resultList)=>{
  console.log(resultList)
})
