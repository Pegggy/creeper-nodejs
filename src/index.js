const crawler = require('./crawler');


(async ()=>{
  for(let i = 50; i < 150; i+=25){
    let results = await crawler.fetchDoubanList(i);
    for(let j = 0; j < results.length; j++){
      let item = results[j];
      if(isNear(item.title)){
        let targetPlaces = await crawler.fetchDoubanTopic(item.url);
        console.log(targetPlaces);
        // pageData.push(targetPlaces);
      }
    }
  } 
})()
.then(result =>{
  console.log('done');
  process.exit(0);
})
.catch(e =>{
  console.log(e);
  process.exit(1);
})
function isNear(places){
  return places.indexOf('滨江') > -1
}