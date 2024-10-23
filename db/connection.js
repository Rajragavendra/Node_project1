const mongoose=require('mongoose')
require('dotenv').config()



const db_url= mongoose.createConnection(process.env.DB_URL)

module.exports=db_url;
