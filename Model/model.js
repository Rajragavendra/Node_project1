const mongoose=require('mongoose')
const user_url=require('../db/connection')

const userSchema = new mongoose.Schema({
    userName:String,
    mailID:String,
    num:Number,
    password:String,
    role:String,
    active:{
        type:Boolean,
        default:true
    }
})

const User=user_url.model('user',userSchema)

 module.exports=User
