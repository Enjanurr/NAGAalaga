import express,{ Request, Response } from "express";
import { connectDB } from "../database/database";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser"

dotenv.config();

const port = process.env.PORT ;
const app = express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods: ['GET','POST','PATCH'],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json());
app.use(cookieParser());


app.get("/",(req:Request , res:Response)=>{
    res.send("Express + Ts server");
})

app.listen(port,()=>{
    try{
     console.log(`Server running at http://localhost:${port}`);
     connectDB();
    }catch(error){
        console.log("Failed to run the server", error);
    }
})
