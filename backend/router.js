const express=require('express')
const router=express.Router()



const {users,addUser,loginUser,receiveMessage,checkRoom}=require('./db')




router.get('/',async(req,res)=>{
        res.send(users);

})



router.post('/_register',async(req,res)=>{
    const name=req.body.name
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password

    const response=addUser({name,username,email,password})

    res.send(response)
})


router.post('_/login',async(req,res)=>{
    const username=req.body.name
    const password=req.body.password

    const response=loginUser({username,password})

    res.send(response)
})


router.post('_/message',async(req,res)=>{
   const sender=req.body.sender
   const receiver=req.body.receiver
   const message=req.body.message

   const response=receiveMessage({sender,receiver,message})

   res.send(response)
})


router.post('_/checkroom',async(req,res)=>{
    const sender=req.body.sender
    const receiver=req.body.receiver
     
    const response=checkRoom({sender,receiver})

    res.send(response)
})


module.exports=router;


