const crawler = require('./crawler');



(async ()=>{
  let results = await crawler.fetchDoubanList(50);
  console.log(results)
})()
.then(result =>{
  console.log('done')
  process.exit(0)
})
.catch(e =>{
  console.log(e)
  process.exit(1)
})
// console.log(crawler.fetchDoubanList(50))