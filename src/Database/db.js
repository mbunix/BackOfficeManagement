// connect to the mongoDB
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/BackOfficeManager";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
//using cached global 
let cached = global.mongoose
if (!cached) {
  cached  = global.moongose ={conn:null,promise:null}
}
async function dbConnect() { 
  if(!cached.conn){
    const opts = {
       useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    cached.promise = mongoose.connect(MONGODB_URI,opts).then((mongoose)=>{
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
export default dbConnect