const express=require('express')
const http=require('http')
const socketio=require('socket.io')
const app=express()
const cors=require('cors')

const bodyParser=require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


const port=process.env.port || 8080


const server=http.createServer(app)


const io=socketio(server)

const router=require('./router')
app.use('/db',router)



io.on('connection',(socket)=>{
   console.log('CONNECTION ESTABLISHED')

   




   socket.on('disconnect',()=>{
       console.log('CONNECTION DISCONNECTED')
   })
})



server.listen(port,()=>console.log('SERVER IS RUNNING'))
