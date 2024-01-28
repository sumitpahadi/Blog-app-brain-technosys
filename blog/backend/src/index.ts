import express,{ Express } from "express";
import cors from 'cors';

import routes from "./route/routes";
import connection from "./mongoose/connection";
const app:Express =express()
app.use(cors(
    {
        origin:"*"
    }
))
app.use(express.json())
app.use("/",routes)
const port:number=4000;

const connect=async():Promise<void>=>{
    await connection("mongodb://localhost:27017/crud")
    app.listen(port,()=>{
        console.log("server is running on port number"+port)
    })
}
connect()




