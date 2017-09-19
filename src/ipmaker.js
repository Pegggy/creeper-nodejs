function r(min,max){  
    return Math.floor(min+Math.random()*(max-min));  
}  
function getRandomIp(){  
    return r(1,255) + "." + r(1,255) + "." + r(1,255)+ "." + r(1,255);  
}  

module.exports = {
  getRandomIp
}