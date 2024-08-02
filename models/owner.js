const mongoose = require('mongoose')
const product = require('./product')

const ownerSchema = mongoose.Schema({
    fullname :String,
    products:{
        type:Array,
        default:[]
    },
email:String,
password:String,
gstin: String,
picture :String
})


module.exports=mongoose.model("owner",ownerSchema)