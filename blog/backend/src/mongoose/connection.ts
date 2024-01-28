import mongoose from "mongoose";
const connection =(url:string)=>{
    mongoose.connect(url)
    .then(()=>console.log("mongoose is connected"))
    .catch((error:any)=>console.log(error))
}
export default connection