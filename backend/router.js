require('dotenv').config()

const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')


const {userMapping,addUser,loginUser,receiveMessage,checkRoom,users}=require('./db')




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


router.post('/_login',async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    console.log(username+ " "+password)

    const response=loginUser({username,password})
    
   const user={name:username}

   if(response['status']===200){
       const generateToken=jwt.sign(user,process.env.SECRET_KEY)
        res.json({generateToken:generateToken})
    
   }
   else{
       res.send(response)
   }
})


router.post('/_message',async(req,res)=>{
   const sender=req.body.sender
   const receiver=req.body.receiver
   const message=req.body.message

   const response=receiveMessage({sender,receiver,message})

   res.send(response)
})


router.post('/_checkroom',async(req,res)=>{
    const sender=req.body.sender
    const receiver=req.body.receiver
     
    const response=checkRoom({sender,receiver})

    res.send(response)
})

router.get('/_getall',async(req,res)=>{
    res.send(userMapping)
})

router.post('/_authenticate',authenticateValue,(req,res)=>{
    jwt.verify(req.token,process.env.SECRET_KEY,(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                message:'Post created',
                authData
            })
        }
    })
})



function authenticateValue(req,res,next){
    const bearerHeader=req.headers['authorization']
    if(typeof bearerHeader!=='undefined'){
          const bearer=bearerHeader.split(' ');
          const bearerToken=bearer[1]
          req.token=bearerToken
           next()
    }
    else{
        res.sendStatus(403)
   }
}



module.exports=router;


