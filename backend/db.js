const users=[]
const rooms=[]
const userMapping=[]

const addUser=({name,username,email,password})=>{
   const existingUser=users.find((user)=>user.email===email)
   const existingUserName=users.find((user)=>user.username===username)

   if(existingUser) return {status:'ALREADY REGISTERED'}

   if(existingUserName) return {status:'USERNAME IS ALREADY TAKEN'}

   const user={name,username,email,password}

   users.push(user)

   let arr=new Object
   arr[0]=name
   arr[1]=username

   userMapping.push(arr)

   return {status:200}

}

const loginUser=({username,password})=>{
    const authenticate=users.find((user)=>user.username===username && user.password===password)
    if(authenticate)
       return {status:200}

    return {status:404}   
}

const receiveMessage=({sender,receiver,message})=>{
    const index1=rooms.findIndex((room)=>room.firstName===sender && room.secondName==receiver)
    const index2=roooms.findIndex((room)=>room.firstName===receiver && room.secondName===sender)
    let messageChat=[]


    if(index1==-1 && index2===-1){
        const index3=rooms.length
        let firstName=sender
        let secondName=receiver
        let messageRoom=[]
        let room={firstName,message}
        messageRoom.push(room)
        
        const chat={firstName,secondName,messageRoom}
        rooms.push(chat)
        messageChat.push(messageRoom)
        return {messageChat,index3}

    }
    else{

        const index3=index > -1 ? index1 : index2
        let firstName=sender
        let room={firstName,message}
        room[index3]['messageRoom'].push(room)
        messageChat=rooms[index3]['messageRoom']
        return {messageChat,index3}

    }
}

const checkRoom=({sender,receiver})=>
{
    const index1=rooms.findIndex((room)=>room.firstName===sender && room.secondName===receiver)
    const index2=rooms.findIndex((room)=>room.firstName===receiver && room.secondName===sender)

    const val;
    if(index===-1)
       return {val:index1}
    return {val:index2}
}


module.exports={addUser,loginUser,receiveMessage,checkRoom,users}
