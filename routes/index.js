const express = require('express')
const router = express.Router();


router.get("/",(req,res)=>{
    res.render("index")
})







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

module.exports = router