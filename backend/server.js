import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import cors from 'cors'
import { Server } from 'socket.io'
import { cardsRouter } from './routes/cards.js'
import { initSocket } from './socket/index.js'
import { error } from 'console'

dotenv.config()

const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL ||'http://localhost:3000'

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:CLIENT_URL,
        methods:['GET','POST','PATCH','DELETE']
    }
})

app.use((req,_res,next)=>{
    req.io = io;
    next()
})

app.use(cors({
    origin:CLIENT_URL,
    allowedHeaders:['Content-Type','x-client-id']
}))

app.use(express.json())
app.use('/api/cards',cardsRouter)

const startServer = async()=>{
    await connectDb()
    initSocket(io)

    server.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`)
    })
}

startServer().catch((error)=>{
    console.error('failed to start server',error.message)
    process.exit(1)
})
