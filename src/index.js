const crawler = require('./crawler');
const express = require('express');
const app = express();

async function doubanCreeper(index,target){
  let pageIndex = index !== 1 ? (index-1)*25 : index-1;
  let pageData = [];
  let results = await crawler.fetchDoubanList(pageIndex);
  for(let j = 0; j < results.length; j++){
    let item = results[j];
    if(isNear(item.title,target)){
      let targetPlaces = await crawler.fetchDoubanTopic(item.url,item.title);
      pageData.push(targetPlaces);
    }
  }
  return pageData; 
}

function isNear(places,target){
  if(!target){
    return true;
  }
  return places.indexOf(target) > -1
}
app.use(express.static('../App'));
app.get('/getPage',function(req,res){
  let index = req.query.index;
  let target = req.query.target;
  if(!target){
    doubanCreeper(index).then((data)=>{
      res.send(data);
    });
  }else{
    doubanCreeper(index,target).then((data)=>{
      res.send(data);
    });
  }
})
app.listen(3000,function(){
  console.log('app is running at port 3000!');
})

