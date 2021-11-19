const express = require('express')
const app  = express()
const getPined = require('../getPined')

app.get('/api/pined/github' , async(req , res)=>{
  const pined =  await new getPined()
  res.json(pined)
});


const port  = process.env.PORT || 4242
app.listen(port , ()=>{
    console.log(`listening at :*${port}`)
})