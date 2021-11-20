const axios = require('axios')
const cheerio  = require('cheerio');

async function getPinned () { await axios.get("https://github.com/AZIZXlaouiti")
  .then((resp)=>{
    
    $ = cheerio.load(resp.data)
    const pinned = $('.pinned-item-list-item.public')
    // if (!pinned || pinned.length === 0)return []
    const result = []
    for(const [index , item] of Object.entries(pinned)){
        if (!isNaN(index)){
            const repo = getRepo($ , item)
            
            
            
            result[index] = {
                repo : repo
            }
        }
    }
    console.log(result)
    return result
  }
  )
}
getPinned()
function getRepo($ , item){
  try {
    return $(item).find('.owner').text()
  }catch{
     return undefined
  }
}






