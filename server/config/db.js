import mongoose from 'mongoose'
mongoose.set("strictQuery", true)

const dbconnect = async()=>{
   const conn = mongoose.connect(process.env.dburl).then(()=>{
      console.log(`db is connected`)
   }).catch(()=>{
      console.log(`somthing is wrong in db connection`)
   })
}

export default dbconnect;