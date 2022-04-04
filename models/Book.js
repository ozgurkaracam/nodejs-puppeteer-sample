import mongoose from "mongoose";

const BookSchema=mongoose.Schema({
    name:String,
    price:Number,
    img:String,
    order:Number,
    link:String,
    author:{
        type:String,
        trim:true
    },
},{
    timestamps:true
})

export default mongoose.model('Book',BookSchema)