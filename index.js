const axios = require('axios');
const cheerio  = require('cheerio');
require('dotenv').config()
const url = process.env.BASE_URL


// $('#user-79036942-pinned-items-reorder-form > ol')
// const foo = "https://api.github.com/users/AZIZXlaouiti"
const getData = async()=>{
    const form = []
    const { data } =  await axios.get(url);
    const $ = cheerio.load(data)
    //   const {data:{id}}  = await axios.get(foo)
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
            // console.log(state)
                    })        
                
                    form.push(state)
                }
                if (form.length > 5 ){

                    console.log(form, form.length)
                }
        })
        
 
}
getData();

// -------------------------------------------------------------------------- //
    // form.forEach(async(e)=>{
    //     const baz = `${url}/${e.name}`
    //     const { data } =  await axios.get(baz);
    //     const $ = cheerio.load(data)
    //     const table = $('#readme > div > article:contains("Technologies") ')
    //     if (table.length === 0){
    //         return
    //     }
    //     table.find('ul').first().each((i, e)=>{
    //         const $elemet = $(e)
    //         const bar = {}
    //         bar.technologie  = $elemet.text().trim().split('\n')
    //         form.push(bar)
    //         // console.log(form)
    //         //getting pined repos
    //     })
    // }) 