const axios = require('axios')
const url = "https://github.com/AZIZXlaouiti"
const foo = "https://api.github.com/users/AZIZXlaouiti"
const getData = async()=>{
  const { data } =  await axios.get(url);
  const {data:{id}}  = await axios.get(foo)
  console.log("id",id)
  const table = $(`#user-${id}-pinned-items-reorder-form > ol`)
}
getData();