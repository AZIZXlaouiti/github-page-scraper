const express = require('express')
const app  = express()
const getPined = require('../getPined')
const qr = require('querystring')
const url = require('url')
app.get('/api/pined/github/' , async(req , res)=>{
  const { query } = url.parse(req.url)
  const { username} = qr.parse(query)
  const result =  await getPined(`${username}`)
  res.json( result)
});


const port  = process.env.PORT || 4242
app.listen(port , ()=>{
    console.log(`listening at :*${port}`)
})