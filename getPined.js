const axios = require('axios');
const cheerio  = require('cheerio');
require('dotenv').config()
const url = process.env.BASE_URL
class getPined {
  
  constructor(){
    this.form = []
  }
  async get_pined(){
      this.table.find('ol > li').each(async(i,e)=>{
        const $elemet = this.$(e)
        const state = {}
        state.name = this.$($elemet.find('span').first()).text()
        const foo = `${url}/${state.name}`
        const { data } =  await axios.get(foo);
        const $row = cheerio.load(data)
        const row = $row('#user-content-technologies')
        if (!row.html()){
            this.form.push(state)
        }else {
            state.technologie = row.parent().next().text().trim().split('\n')
            this.form.push(state)
        }
      })
  }
  async get_data(){
    const { data } =  await axios.get(url);
    this.$ = cheerio.load(data)
    this.table = this.$('ol')
    this.get_pined()
  }

  speak(){
     console.log(this.form)
  }
 
}
module.exports = getPined
