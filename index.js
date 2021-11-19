const axios = require('axios');
const cheerio  = require('cheerio');
require('dotenv').config()
const url = process.env.BASE_URL



const getData = async()=>{
    const form = []
    const { data } =  await axios.get(url);
    const $ = cheerio.load(data)
    const table = $('ol')
    // getting pinned repos
    table.find('ol > li').each(async(i, e)=>{
        const $elemet = $(e)
        const state = {}
        state.name = $($elemet.find('span').first()).text()
        const foo = `${url}/${state.name}`
        const { data } =  await axios.get(foo);
        const $row = cheerio.load(data)
        // const $about = cheerio.load(data)
        // const about = $about('.Layout-sidebar')
        const row = $row('#readme > div > article:contains("Technologies") ')
        // row.find('p').each((e)=>{
        //     const $elemet = $(e)
        //     console.log($elemet.text())
        // })
        if (row.length === 0){
            form.push(state)
            
                }else {
        // scraping readme 
        row.find('ul').each((i, e)=>{
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
