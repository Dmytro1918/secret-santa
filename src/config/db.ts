import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI!)
        console.log('DB connected: ', connect.connection.host)
    }catch (error){
        if(error  instanceof Error){
            console.log('Error', error.message)
        }else {
            console.log('Unknown issue arised: ', error)
        }
        process.exit(1)
    }
}

export default dbConnect;