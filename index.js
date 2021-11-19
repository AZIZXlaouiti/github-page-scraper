const axios = require('axios');
const cheerio  = require('cheerio');
require('dotenv').config()
const url = process.env.BASE_URL



const getData = async()=>{
    const form = []
    const { data } =  await axios.get(url);
    const $ = cheerio.load(data)
    const table = $('.js-pinned-items-reorder-list')
    table.find('ol > li').each(async(i, e)=>{
        const $elemet = $(e)
        const state = {}
        state.name = $($elemet.find('span').first()).text()
        const foo = `${url}/${state.name}`
        const { data } =  await axios.get(foo);
        const $row = cheerio.load(data)
        const row = $row('#readme > div > article:contains("Technologies") ')
        if (row.length === 0){
            form.push(state)
            
                }else {

        row.find('ul').first().each((i, e)=>{
            const $elemet = $(e)
            state.technologie  = $elemet.text().trim().split('\n')
                    })        
                
                    form.push(state)
                }
                if (form.length > 5 ){

                    console.log(form, form.length)
                }
        })
        
 
}
getData();
