const express = require('express')
const app  = express()
const getPined = require('../getPined')
const qr = require('querystring')
const url = require('url')
const { send } = require('micro')
const  path = require('path');
app.get('/api/github/' , async(req , res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    return send(res, 200)
  }
  const { query } = url.parse(req.url)
  const { username} = qr.parse(query)
  const result =  await getPined(`${username}`)
  res.json( result)
});
// console.log(__dirname)
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/' , (req , res)=>{
  res.send(

    `
<head>
  <meta charset="utf-8" />
  <title>GitHub pinned repos API</title>
</head>
<style>body {font-family: Helvetica, serif;margin: 30px;}</style>
<p>welcome to github-api-scraper</p>
<p>
  <form action="/api/pined/github/">
    <input type="text" name="username" placeholder="username" />
    <button type="submit">Go!</button>
  </form>
</p>
<p>made by <a href="https://github.com/AZIZXlaouiti">@Mohamed Aziz Laouiti</a> · <a href="https://github.com/AZIZXlaouiti/github-page-scraper">source code</a></p>
`,
  )
})

const port  = process.env.PORT || 4242
app.listen(port , ()=>{
    console.log(`listening at :*${port}`)
})