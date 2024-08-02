const express = require("express");
const router = express.Router();
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const productModel= require('../models/product')


router.get("/",function(req,res){
    res.send("hey working")
})

router.post("/register",  async function(req,res){
   try{
    let {email,fullname,password} = req.body;
    let user = await userModel.findOne({email})
    if(user){
        return res.status(400).send({message:"user already exist"})
        }
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, async (err,hash)=>{
            if(err){
                res.status(500).send({message:"Error in hashing password"})
                }else{
                   
                    let user = await userModel({
                        email,
                        fullname,
                        password:hash
                        });
                        await user.save()
                       let token = jwt.sign({email,
                        id:user._id},"secret");
                        res.cookie("token",token)
                        res.send(user)
                        
                    }
                    })

    })
    
     

   }catch(err){
    console.log(err.message)
   }
})


router.post("/login",async (req,res)=>{
    let {email,password}=req.body;
   let user = await userModel.findOne({email:email})
   if(!user) return res.send("email or password incorrect");

   bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
        let token = jwt.sign({email,
            id:user._id},"secret");
            res.cookie("token",token)
            res.redirect("/shop")

    }
    else{
        return res.send("email or password incorrect");

    }
   })
})
router.get("/shop", isLoggedin, async (req,res)=>{
    let products = await productModel.find();
    res.render("shop",{products})
})


//middelwareeee
async  function isLoggedin(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/");
    }
    try{
        let decoded = jwt.verify(req.cookies.token,"secret");
        let user = await userModel.findOne({email:decoded.email}).select("-password")
        req.user = user;
        next();
    }catch(err){
        req.flash("error","something went wrong");
        res.redirect("/")
    }
}


module.exports=router