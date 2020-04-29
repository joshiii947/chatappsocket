var jwt=require('jsonwebtoken')



const generateToken=({user})=>{
   const accessToken= jwt.sign(user,process.env.SECRET_KEY)

   req.json({accessToken:accessToken})
}

module.exports={generateToken}

