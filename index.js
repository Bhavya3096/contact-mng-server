import express from 'express'
import dotenv from 'dotenv'
import './config/db.js'
import cors from 'cors'
import {Router} from './routes/routes.js'

const app=express()
app.use(express.json())
app.use(cors({
    origin:["https://contact-client-lioq4vqqs-m-bhavya-s-projects.vercel.app/"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.options('*',cors());

dotenv.config({path:"./config/.env"})

app.use('/contactmng',Router)
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("App is Running on port ${PORT}")
})