const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

let app = express()
// app.get('/',function(req,res){
//   res.send('hello express')
// })
// app.listen(3000,function(){
//   console.log('listen on port 3000!')
// })

let result = []
// for(let i = 0; i < 100; i+=25){
  
// }

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
  console.log(resultList)
  return resultList
}
fetchDoubanList(50)
// let matchPlaces = []
// let reg = /钱江新城/g
// function getResult(resultList){
//   result = resultList
//   for(let i = 0; i< result.length; i++){
//     if(reg.test(result[i].title)){
//       console.log(result[i])
//       // matchPlaces.push(result[i])
//     }
//   }
  // console.log(result)
  // console.log(result.length)  


// fetchDoubanList(25,(resultList)=>{
//   console.log(resultList)
// })
