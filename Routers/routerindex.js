const express=require('express');
const route=express.Router();
const controller=require('../controller/controller');
const cors=require('cors')

route.get('/',controller.get)
route.post('/login',controller.login)
route.post('/signup',controller.signup)
route.get('/data',controller.data)
route.get('/user/:_id',controller.user)
route.put('/edit/:_id',controller.update)


module.exports=route;
