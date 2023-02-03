import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbconnect from './config/db.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './router/router.js'
import cors from 'cors'


const app = express()

const port = process.env.PORT || 3000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())
app.use(cookieParser())
app.use("/api",router)

dbconnect()
app.listen(port,()=>{
  console.log(`server is running on ${port}`)
})