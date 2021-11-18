const axios = require('axios');
const cheerio  = require('cheerio');
const url = "https://github.com/AZIZXlaouiti"


// $('#user-79036942-pinned-items-reorder-form > ol')
// const foo = "https://api.github.com/users/AZIZXlaouiti"
const getData = async()=>{
    const form = []
    const lan = []
    const { data } =  await axios.get(url);
    const $ = cheerio.load(data)
    //   const {data:{id}}  = await axios.get(foo)
    const table = $('.js-pinned-items-reorder-list')
    table.find('ol > li').each((i, e)=>{
        const $elemet = $(e)
        const state = {}
        state.name = $($elemet.find('span').first()).text()
        form.push(state)
        //getting pined repos
    })
    form.forEach(async(e)=>{
        const baz = `${url}/${e.name}`
        const { data } =  await axios.get(baz);
        const $ = cheerio.load(data)
        const table = $('#readme > div > article:contains("Technologies") ')
        if (table.length === 0){
            return
        }
        table.find('ul').first().each((i, e)=>{
            const $elemet = $(e)
            const bar = {}
            bar.technologie  = $elemet.text().trim().split('\n')
            form.push(bar)
            // console.log(bar)
            //getting pined repos
        })
    })  
    console.log(form)
}
getData();