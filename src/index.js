const crawler = require('./crawler');


async function doubanCreeper(index,target){
  let pageIndex = index !== 1 ? (index-1)*25 : 0;
  let pageData = [];
  let results = await crawler.fetchDoubanList(pageIndex);
  for(let j = 0; j < results.length; j++){
    let item = results[j];
    if(isNear(item.title,target)){
      let targetPlaces = await crawler.fetchDoubanTopic(item.url,item.title);
      pageData.push(targetPlaces);
    }
  }
  console.log(pageData);
  return pageData; 
}

function isNear(places,target){
  if(!target){
    return true;
  }
  return places.indexOf(target) > -1
}
doubanCreeper(4,'西湖')