const User = require('../Model/model');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');
const cors=require('cors')



module.exports.get=async(req,res)=>{
    res.send('hi')
}

//--------------LOGIN-------------------------------------
module.exports.login = async (req, res) => {
    const {UserName,password} = req.body

    const user = await User.findOne({
        userName: req.body.username
    })
    
    if(user!=null){
       const isValid=await bcrypt.compare(req.body.password,user.password)

       if(isValid){
        isAdmin= user.role=='admin'?true:false
        return res.status(200).json({message:'Login succesfully',
            id:user._id,
            isAdmin:isAdmin})
       }else{
        return res.status(404).json({message:'Invalid password'})
       }
    }else{
        return res.status(404).json({message:'User data not found'})
    }
    
}
//--------------SIGNUP-----------------------------------   
module.exports.signup = async (req, res) => {
    const user = await User.findOne({ mailID: req.body.email  }); 

    if (user != null) {
        return res.status(500).json({message:'Mail ID already exist'})
    } else {
       
        const hashPassword= await bcrypt.hash(req.body.password,10)

        const user = new User({
            userName: req.body.username,
            mailID: req.body.email,
            num:req.body.number,
            password: hashPassword,
            role:req.body.role
        })
         
        await user.save()
        return res.status(200).json({message:'Signup succesfully', data:user._id })
    }
}
//------------------Data---------------------------------------
module.exports.data=async(req,res)=>{
    const allData= await User.find({})
    return res.status(200).send({data:allData})
}
//-------------------user----------------------------------------
module.exports.user=async(req,res)=>{
    const userData=await User.findOne({_id:req.params._id})
    return res.status(200).send({data:userData})
}
//----------------------------------------------------------------
module.exports.update = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return res.status(404).send('No users found with this ID');
    }
    res.status(200).send(user)
}