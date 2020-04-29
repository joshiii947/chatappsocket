const express=require('express')
const http=require('http')
const socketio=require('socket.io')
const app=express()
const cors=require('cors')

const bodyParser=require('body-parser')

const json=require('jsonwebtoken')
app.use(express.json())


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

const ENDPOINT='0.0.0.0'
const port=process.env.port || 3000


const server=http.createServer(app)


const io=socketio(server)

const router=require('./router')
app.use('/db',router)

app.use(express.static('public'))

// app.get('/',(res,req)=>{
//     res.send('An alligator appraoched')
// })

const online=[]

const {receiveMessage}=require('./db')

io.on('connection',(socket)=>{
   console.log(socket.id)


//    socket.on('user',(data)=>{
//        let arr=new Object
//    })

//   socket.on('user',(data)=>{
//       let arr=new Object
//       arr['username']=data.sender
//       arr['id']=data.id

      
//       online.push(arr)
//       console.log(online)
//       io.to(online[0]['id']).emit('event','PRIVATE MESSAGE')
//   })


//   socket.on('message',(data)=>{
//       console.log(online)
//       console.log(data)
//       const response=receiveMessage({sender:data.sender,receiver:data.receiver,message:data.message})
//       let index=online.findIndex((user)=>user.username===data.receiver)
//       if(index=!-1)
//          io.to(online[index][1]).emit('event',data.message)

//   })
socket.on('logout',(data)=>{
    console.log(data.sender)
    console.log(data.id)
    const index=online.findIndex((onl)=>onl.id==data.id)
    online.splice(index,1)

})


socket.on('message',(data)=>{
    const response=receiveMessage({sender:data.sender,receiver:data.receiver,message:data.message})
    let index=online.findIndex((user)=>user.username==data.receiver)
    if(index!=-1)
       {
            io.emit(online[index]['id']).emit('event',data.message)
       }
})




socket.on('addSocket',(data)=>
{
    let index=online.findIndex((user)=>user.id==data.id )
    let index1=online.findIndex((user)=>user.sender==data.sender)
    if(index==-1 && index1==-1)
    {
        let arr=new Object
        arr['id']=data.id
        arr['username']=data.sender
        online.push(arr)
        console.log(online)
    }
})
  


//    socket.on('disconnect',(socket)=>{
//        const index=online.findIndex((onl)=>onl.id===socket.id)
//        online.splice(index,1)
//        console.log('disconnect')
//    })
})



server.listen(port,()=>console.log('SERVER IS RUNNING'))
