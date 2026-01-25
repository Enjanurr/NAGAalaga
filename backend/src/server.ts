import express,{ Request , Response} from "express"
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from "../database/database";
import routes from "../routes";
import cookieParser = require("cookie-parser");

dotenv.config();

const port = process.env.PORT || "Failed to connect to the port";
const app = express();

app.use(
  cors({
    origin: "*", // RN has no domain
    credentials: true,
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())
app.use(cookieParser());
app.use("/api", routes);

// testing
app.get('/',(req:Request, res:Response)=>{
    res.send("Express + Typescript server")
})

app.listen(port, () => {
    try{
     console.log(`Server running at http://localhost:${port}`);
        connectDB();
    }catch(error){
        console.log("Failed to run the server" , error);
    }
})


