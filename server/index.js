const express = require('express')
const app  = express()
const getPined = require('../getPined')
const url = process.env.BASE_URL
app.get('/api/pined/github' , async(req , res)=>{
  const result =  await getPined('AZIZXlaouiti')
  res.json( result)
});


const port  = process.env.PORT || 4242
app.listen(port , ()=>{
    console.log(`listening at :*${port}`)
})