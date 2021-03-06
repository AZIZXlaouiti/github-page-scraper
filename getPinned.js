const axios = require('axios');
const cheerio  = require('cheerio');
async function getPinned (username) { return  axios.get(`https://github.com/${username}`)
  .then(async({data})=>{
    
    $ = cheerio.load(data)
    const pinned = $('.pinned-item-list-item.public')
    if (!pinned || pinned.length === 0)return []
    const result = []
    for(const [index , item] of Object.entries(pinned)){
        if (!isNaN(index)){
          const repo = getRepo($ , item)
          const {technologie , web , description , img}= await getTech(repo , result , index)
          const language = getLanguage($, item)
          
            result[index] = {
                
                repo : repo ,
                link:`https://github.com/${username}/${repo}`,
                language: language , 
                technologie : technologie,
                web: web,
                description: description,
                img: img
                
            }
        }
    }
    return result
  }
  )
  function getRepo($, item) {
    try {
      return $(item).find('.repo').text()
    } catch (error) {
      return undefined
    }
  }
  function getTech(repo){
    return axios.get(`https://github.com/${username}/${repo}`)
    .then(({data})=>{
       $ = cheerio.load(data)
       const row = $('#user-content-technologies')
     
       if (!row.html()){
                return {web:getWebsite($) , description:getDescription($) , img:getImg($)}
                
              }else {
        return {  description:getDescription($), technologie:row.parent().next().text().trim().split('\n') , web: getWebsite($) , img:getImg($)}
       }
    })
  
  }
  function getLanguage($, item) {
    try {
      return $(item).find('[itemprop="programmingLanguage"]').text()
    } catch (error) {
      return undefined
    }
  }
  function getDescription($){
    try {
      return $(".BorderGrid-cell > p").text().trim()
    }
    catch (error){
      return undefined
    }
  }
  function getWebsite($) {
      try {
         
        return getRef($)
      } catch (error) {
        return undefined
      }
    
  }
  function getImg($){
    try {
       return $("#readme img").attr('src').trim()
       
    }
    catch (error){
      return undefined
    }
  }
  function getRef ($){

    try {
      const about  = $('.BorderGrid-cell a').attr('href').trim()
      return about !== '#readme'?about:undefined
    } catch (error) {
      return undefined
    }
  } 
  
}
module.exports = getPinned