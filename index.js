require('dotenv').config()
const { json } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.js')


const connectDB = async () =>{
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mearn-learnit.2kufnnb.mongodb.net/mearn-learnit?retryWrites=true&w=majority`,
            {            
            useNewUrlParser: true,
            useUnifiedTopology: true            
            //serverApi: ServerApiVersion.v1 
            })
        console.log('mongoDB conncected')
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

// const checkAuth = async ()=>{
//     try{        
//         await app.use('/api/auth',authRouter)
//         console.log("Auth connected")
//     }catch(error){
//         console.log("Auth is fucked up")
//         process.exit(1)
//     }
// }

connectDB()
const app = express()
console.log(json)
app.use(express.json())
app.use('/api/auth',authRouter)
// checkAuth()

const PORT = 5000

app.listen(PORT,()=> console.log(`server started on PORT ${PORT}`))

