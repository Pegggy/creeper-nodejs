const axios = require('axios');
const cheerio = require('cheerio');
const ipmaker = require('./ipmaker');

// 58同城杭州租房信息列表
async function fetchHouseList (page) {
  let res = await axios({
    method: 'get',
    url:`http://hz.58.com/zufang/pn${page}/`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3213.3 Safari/537.36'}
  });
  let htmlText = res.data;
  const $ = cheerio.load(htmlText);
  const rs = $('.des>h2>a:first-child');
  const resultList = [];
  for(let i = 0; i < rs.length; i++){
    resultList.push({
      title: rs.eq(i).text().replace(/\s+/g,''),
      url: rs.eq(i).attr('href')
    })
  }
  return resultList;
}

// 58同城获取租房帖子的详细信息
async function fetchHouseInfo(url){
  let response = await axios.get(url);
  let htmlText = response.data;
  const $ = cheerio.load(htmlText);
  let details = [];
  let imgs = [];
  const contextText = $('.introduce-item>li>.a2');
  const contextImgs = $('#housePicList>li>img');
  for(let i = 0; i < contextText.length; i++){
    details.push(contextText.eq(i).text());
  }
  for(let j = 0; j < contextImgs.length; j++){
    imgs.push(contextImgs.eq(j).attr('lazy_src'));
  }
  let detail = details.slice(-1).toString().replace(/\s+/g,'');
  return {
    url,detail,imgs
  }
}

// (async ()=>{
//   // let pageData = [];
//   for(let i = 1; i < 10; i++){
//     let results = await fetchHouseList(i);
//     for(let j = 0; j < results.length; j++){
//       let item = results[j];
//       if(isNear(item.title)){
//         let data = await fetchHouseInfo(item.url);
//         console.log(data);
//       }
//     }
//   }
// })()
// .then(result =>{
//   console.log('done');
//   process.exit(0);
// })
// .catch(e =>{
//   console.log(e);
//   process.exit(1);
// })  

// function isNear(places){
//   return places.indexOf('地铁') > -1;
// }



// 获取豆瓣杭州租房小组列表
async function fetchDoubanList(start) {
  let res = await axios({
    method: 'get',
    url:`https://www.douban.com/group/HZhome/discussion?start=${start}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3213.3 Safari/537.36'}
  });
  let htmlText = res.data;
  const $ = cheerio.load(htmlText);
  const rs = $('a[title]');
  const resultList = [];
  for(let i = 0; i < rs.length; i++){
    resultList.push({
      title: rs.eq(i).attr('title'),
      url: rs.eq(i).attr('href')
    })
  }
  return resultList;
}

// 获取豆瓣租房帖子详细信息
async function fetchDoubanTopic(url,title){
  let response = await axios.get(url);
  let htmlText = response.data;
  const $ = cheerio.load(htmlText);
  let details = [];
  let imgs = [];
  const contextText = $('.topic-content > p:first-child');
  const contextImgs = $('.topic-figure>img');
  for(let i = 0; i < contextText.length; i++){
    details.push(contextText.eq(i).text());
  }
  for(let j = 0; j < contextImgs.length; j++){
    imgs.push(contextImgs.eq(j).attr('src'));
  }
  return {
    url,title,details,imgs
  }
  // return details
}
module.exports = {
  fetchDoubanList,
  fetchDoubanTopic
}