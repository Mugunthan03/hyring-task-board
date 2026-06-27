import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:200
    },
    status:{
        type:String,
        enum:['todo','in_progress','done'],
        required:true
    },
    position:{
        type:Number,
        required:true,
        default:0
    },
    version:{
        type:Number,
        default:1
    },
},{timestamps:true})

cardSchema.index({status:1,position:1});

export const Card = mongoose.model('Card',cardSchema)
