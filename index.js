const axios = require('axios');
const cheerio  = require('cheerio');
const url = "https://github.com/AZIZXlaouiti"
// $('#user-79036942-pinned-items-reorder-form > ol')
// const foo = "https://api.github.com/users/AZIZXlaouiti"
const getData = async()=>{
  const { data } =  await axios.get(url);
  const $ = cheerio.load(data)
//   const {data:{id}}  = await axios.get(foo)
  const table = $('.js-pinned-items-reorder-list')
   table.find('ol li').each((i, e)=>{
       const $elemet = $(e)
       console.log($elemet.text())
   })
}
getData();