const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const { string } = require("joi");

const listingSchema=new Schema({
    Type: String,
    price:Number,
    description: String,
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
})


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;