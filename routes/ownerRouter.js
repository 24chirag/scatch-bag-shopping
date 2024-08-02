const express = require("express");
const router = express.Router();
const ownerModel = require('../models/owner')


router.get("/",function(req,res){
    res.send("hey")
})
if(process.env.NODE_ENV === "developement"){
    router.post("/create", async function(req,res){
       let owners = await ownerModel.find();
       if(owners.length > 0){
        return res.status(503).send("you dont have permission to create a new owner");
       }
       else{
        let {fullname,email,password} = req.body 
       let createdowner= await ownerModel.create({
            fullname,
            email,
            password 
        })
        res.status(201).send(createdowner)
       }
    })
}

router.get("/admin",(req,res)=>{
    let success =[]
    res.render('createproducts',{success})
})

module.exports=router